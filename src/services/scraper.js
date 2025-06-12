const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeData(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // Extrair o título da notícia
        const title = $('h1').text().trim();

        // Extrair o texto principal (ajustado para a estrutura observada)
        const paragraphs = [];
        $('.my-5.break-words').each((i, elem) => {
            paragraphs.push($(elem).text().trim());
        });
        const text = paragraphs.join('\n');

        return { success: true, title, text };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

module.exports = { scrapeData };