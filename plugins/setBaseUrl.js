const cheerio = require('cheerio');
const url = require('url');

module.exports = {
  pageLoaded: (req, res, next) => {
    if (!req.prerender.content || req.prerender.renderType !== 'html') {
      return next();
    }

    const reqUrl = url.parse(req.prerender.url);
    const baseUrl = `${reqUrl.protocol}//${reqUrl.hostname}/`;
    const $ = cheerio.load(req.prerender.content, { decodeEntities: false });
    $('head').prepend('<base href="' + baseUrl + '" target="_blank">');
    req.prerender.content = $.html();

    next();
  }
};
