require('dotenv').config();

const { scrapeData } = require('./services/scraper');
const { sendEmail } = require('./services/emailService');

(async () => {
    const url = process.env.SCRAP_URL || 'https://www.cnnbrasil.com.br/politica/moraes-determina-prisao-definitiva-de-carla-zambelli/';
    const scrapeResult = await scrapeData(url);

    if (scrapeResult.success) {
        console.log(scrapeResult.title);
        console.log('Texto scraped (primeiras 200 caracteres):', scrapeResult.text.slice());
        const emailResult = await sendEmail(
            'renan.lixeiralxii@gmail.com',
            `Notícia: ${scrapeResult.title}`,
            `Título: ${scrapeResult.title}\n\nTexto: ${scrapeResult.text}`
        );

        if (emailResult.success) {
            console.log('E-mail enviado com sucesso!');
        } else {
            console.log('Erro ao enviar e-mail:', emailResult.error);
        }
    } else {
        console.log('Erro no scraping:', scrapeResult.error);
    }
})();