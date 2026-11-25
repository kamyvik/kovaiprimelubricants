const fs = require('fs');
const path = require('path');

function readJsonFile(fileName, fallback = []) {
    try {
        const filePath = path.join(process.cwd(), 'data', fileName);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(content);
        }
    } catch (err) {
        console.error(`Error reading ${fileName}:`, err);
    }
    return fallback;
}

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const products = readJsonFile('products.json');
    const categories = readJsonFile('categories.json');
    const gallery = readJsonFile('gallery.json');
    const enquiries = readJsonFile('enquiries.json');

    return res.status(200).json({
        status: 'success',
        products,
        categories,
        gallery,
        enquiries
    });
};
