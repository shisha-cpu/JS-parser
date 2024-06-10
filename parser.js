const axios = require('axios');
const cheerio = require('cheerio');

async function parseURL(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const title = $('head title').text();
        const links = [];
        $('a').each((index, element) => {
            links.push($(element).attr('href'));
        });

        return {
            title,
            links
        };
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

const url = 'https://www.youtube.com/results?search_query=js+пасрер'; 
parseURL(url).then(result => {
    if (result) {
        console.log('Title:', result.title);
        console.log('Links:', result.links);
    }
});
