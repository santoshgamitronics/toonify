const fs = require('fs');
const path = require('path');
const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML
deepai.setApiKey(process.env.TOONIFY_API_KEY);

const getToonifiedImageByCategory = async (filePath, category) => {
    const result = await deepai.callStandardApi(category, {
        image: fs.createReadStream(filePath.toString())
    });
    return result;
};

module.exports = {
    getToonifiedImageByCategory
};

