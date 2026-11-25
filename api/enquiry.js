const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ status: 'error', message: 'Method not allowed' });

    let params = req.body || {};
    if (typeof params === 'string') {
        try {
            params = JSON.parse(params);
        } catch (e) {
            params = querystring.parse(params);
        }
    }

    // Anti-spam honeypot
    if (params.website_hp) {
        return res.status(200).json({ status: 'success', message: 'Enquiry received' });
    }

    const name = (params.name || '').trim().slice(0, 80) || 'Direct Buyer';
    const phone = (params.phone || '').trim().slice(0, 30) || '+91 96551 55266';
    const whatsapp = (params.whatsapp || phone).trim().slice(0, 30);
    const email = (params.email || '').trim().slice(0, 100) || 'info@client.in';
    const product = (params.product || params.lubricant || '').trim().slice(0, 120) || 'General Lubricant Enquiry';
    const quantity = (params.quantity || params.volume || '').trim().slice(0, 80) || 'Standard Consignment';
    const company = (params.company || params.company_name || '').trim().slice(0, 100) || 'Direct Client';
    const location = (params.location || '').trim().slice(0, 100) || 'Coimbatore, Tamil Nadu';
    const message = (params.message || params.notes || '').trim().slice(0, 1500) || 'Direct online enquiry from website.';
    const amount = (params.amount || params.quote_value || 'Pending Quote').trim().slice(0, 40);

    const refId = params.id || `ENQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const now = params.date || new Date().toISOString().replace('T', ' ').substring(0, 19);

    const newRecord = {
        id: refId,
        date: now,
        name,
        company,
        company_name: company,
        phone,
        whatsapp,
        email,
        lubricant: product,
        product,
        volume: quantity,
        quantity,
        location,
        amount: amount.startsWith('₹') || amount.includes('Pending') ? amount : `₹ ${amount}`,
        quote_value: amount.startsWith('₹') || amount.includes('Pending') ? amount : `₹ ${amount}`,
        status: params.status || 'new',
        priority: params.priority || 'High',
        assigned_to: params.assigned_to || 'Sales Desk (Immediate)',
        notes: message,
        message
    };

    // Attempt to persist to data/enquiries.json
    try {
        const enqPath = path.join(process.cwd(), 'data', 'enquiries.json');
        let enquiries = [];
        if (fs.existsSync(enqPath)) {
            enquiries = JSON.parse(fs.readFileSync(enqPath, 'utf8'));
        }
        enquiries.unshift(newRecord);
        fs.writeFileSync(enqPath, JSON.stringify(enquiries, null, 2), 'utf8');
    } catch (e) {
        // Ephemeral filesystem fallback on serverless
        console.warn('Enquiry persistence note (serverless ephemeral):', e.message);
    }

    const notifyText = `NEW ONLINE ENQUIRY - KOVAI PRIME LUBRICANTS\n----------------------------------------\nRef ID: ${refId}\nCustomer: ${name}\nCompany: ${company}\nPhone: ${phone}\nEmail: ${email}\nProduct: ${product}\nQuantity: ${quantity}\nLocation: ${location}\nRequirement: ${message}\n----------------------------------------\nTime: ${now}`;
    const encodedMsg = encodeURIComponent(notifyText);

    return res.status(200).json({
        status: 'success',
        message: `Thank you ${name}! Your enquiry has been received. Our sales desk has been notified.`,
        ref_id: refId,
        whatsapp_url: `https://wa.me/919655155266?text=${encodedMsg}`,
        whatsapp_founder_url: `https://wa.me/916380019886?text=${encodedMsg}`,
        record: newRecord
    });
};
