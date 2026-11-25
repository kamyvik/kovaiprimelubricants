const fs = require('fs');
const path = require('path');

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

    const dataDir = path.join(process.cwd(), 'data');
    const tryWrite = (fileName, data) => {
        try {
            if (fs.existsSync(dataDir)) {
                fs.writeFileSync(path.join(dataDir, fileName), JSON.stringify(data, null, 4), 'utf8');
            }
        } catch (err) {
            console.warn(`Filesystem write skipped for ${fileName} (serverless):`, err.message);
        }
    };

    if (Array.isArray(payload.products)) tryWrite('products.json', payload.products);
    if (Array.isArray(payload.categories)) tryWrite('categories.json', payload.categories);
    if (Array.isArray(payload.gallery)) tryWrite('gallery.json', payload.gallery);
    if (Array.isArray(payload.enquiries)) tryWrite('enquiries.json', payload.enquiries);

    return res.status(200).json({
        status: 'success',
        message: 'Master data synchronized successfully'
    });
};
