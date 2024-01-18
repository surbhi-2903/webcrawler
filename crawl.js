const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currentURL, pages) {
  const baseURLobj = new URL(baseURL);
  const currentURLobj = new URL(currentURL);
  if (baseURLobj.hostname !== currentURLobj.hostname) {
    return pages;
  }

  const normalisedurl = normalizeURL(currentURL);
  if (pages[normalisedurl] > 0) {
    pages[normalisedurl]++;
    return pages;
  }
  pages[normalisedurl] = 1;

  console.log(`actively crawling : ${currentURL}`);
  try {
    const response = await fetch(currentURL);
    //CHECKING THE RESPONSE STATUS OF THE FETCH RESPONSE
    if (response.status > 399) {
      console.log(
        `Error in fetch url with status code :${response.status} on page: ${currentURL}`
      );
      return pages;
    }
    //CHECKING THE DOCUMENT TYPE OF THE RESPONSE
    const getContentType = response.headers.get("content-type"); //npm start http://wagslane.dev/sitemap.xml will trigger this
    if (!getContentType.includes("text/html")) {
      console.log(
        `non html response ,content type: ${getContentType} on : ${currentURL}`
      );
      return pages;
    }
    //GETTING THE RESPONSE BODY FROM THE FETCH
    const htmlbody = await response.text();

    //TAKING OUT THE URLS FROM THE HTML BODY
    const nextUrls = getURLFromHTML(htmlbody, baseURL);

    //CRAWLING THE URLS IN THE HTML BODY
    for (const nexturl of nextUrls) {
      pages = await crawlPage(baseURL, nexturl, pages);
    }
  } catch (err) {
    console.log(`error in fetch: ${err.message} on ${currentURL}`);
  }
  return pages;
}

function getURLFromHTML(htmlbody, baseURL) {
  url = [];
  const dom = new JSDOM(htmlbody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const items of linkElements) {
    if (items.href.slice(0, 1) === "/") {
      //relative
      try {
        const urlobj = new URL(`${baseURL}${items.href}`);
        url.push(urlobj.href);
      } catch (err) {
        console.log(`error with relative url:${err.message}`);
      }
      url.push();
    }
    //absolute
    else {
      try {
        const urlobj = new URL(items.href);
        url.push(urlobj.href);
      } catch (err) {
        console.log(`error with absolute url:${err.message}`);
      }
    }
  }
  return url;
}

function normalizeURL(stringURL) {
  const urlObj = new URL(stringURL);
  const hostpath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostpath.length > 0 && hostpath.slice(-1) === "/") {
    return hostpath.slice(0, -1);
  }
  return hostpath;
}
module.exports = {
  normalizeURL,
  getURLFromHTML,
  crawlPage,
};
