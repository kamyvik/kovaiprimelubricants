const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ status: 'error', message: 'Method not allowed' });

    let payload = req.body || {};
    if (typeof payload === 'string') {
        try { payload = JSON.parse(payload); } catch (e) {}
    }

    const folder = payload.folder || 'products';
    const dataStr = payload.data || '';

    // If base64 provided, attempt to write to assets/images/<folder> if writable
    if (dataStr.includes('base64,')) {
        try {
            const [headerPart, base64Content] = dataStr.split(';base64,');
            let ext = headerPart.split('data:image/') ? headerPart.split('data:image/')[1] : 'jpg';
            if (ext === 'jpeg') ext = 'jpg';
            if (!['jpg', 'png', 'webp', 'gif'].includes(ext)) ext = 'jpg';

            const filename = `up_${Date.now()}_${crypto.randomBytes(3).toString('hex')}.${ext}`;
            const targetDir = path.join(process.cwd(), 'assets', 'images', folder);

            if (fs.existsSync(targetDir)) {
                fs.writeFileSync(path.join(targetDir, filename), Buffer.from(base64Content, 'base64'));
                return res.status(200).json({
                    status: 'success',
                    url: `assets/images/${folder}/${filename}`,
                    message: 'Image uploaded successfully'
                });
            }
        } catch (err) {
            console.warn('Upload file write skipped (serverless fallback to base64):', err.message);
        }

        // Serverless fallback: return data URI directly
        return res.status(200).json({
            status: 'success',
            url: dataStr,
            message: 'Image loaded successfully'
        });
    }

    return res.status(200).json({
        status: 'success',
        url: 'assets/images/products/engine_oil.jpg',
        message: 'Image processed'
    });
};
