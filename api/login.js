const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function verifyPassword(storedHash, inputPassword) {
    if (!storedHash || !inputPassword) return false;
    try {
        if (storedHash.startsWith('pbkdf2_sha256$')) {
            const parts = storedHash.split('$');
            if (parts.length === 4) {
                const iterations = parseInt(parts[1], 10);
                const salt = parts[2];
                const expected = parts[3];
                const calc = crypto.pbkdf2Sync(inputPassword, salt, iterations, 32, 'sha256').toString('hex');
                return crypto.timingSafeEqual(Buffer.from(calc), Buffer.from(expected));
            }
        }
        const calc = crypto.createHash('sha256').update(inputPassword).digest('hex');
        return crypto.timingSafeEqual(Buffer.from(calc), Buffer.from(storedHash));
    } catch (e) {
        return false;
    }
}

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ status: 'error', message: 'Method not allowed' });

    let body = req.body || {};
    if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) {}
    }

    const username = (body.username || '').trim().toLowerCase();
    const password = body.password || '';
    const remember = Boolean(body.remember);

    const usersPath = path.join(process.cwd(), 'data', 'users.json');
    let users = [];
    try {
        if (fs.existsSync(usersPath)) {
            users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
        }
    } catch (err) {}

    const matched = users.find(u => (u.username || '').toLowerCase() === username && verifyPassword(u.password_hash, password));

    if (matched) {
        const token = crypto.randomBytes(24).toString('hex');
        const maxAge = remember ? 604800 : 86400;

        res.setHeader('Set-Cookie', `kpl_session=${token}; Path=/; Max-Age=${maxAge}; SameSite=Lax`);
        return res.status(200).json({
            status: 'success',
            token,
            user: {
                id: matched.id,
                username: matched.username,
                name: matched.name,
                role: matched.role
            }
        });
    } else {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid username or password.'
        });
    }
};
