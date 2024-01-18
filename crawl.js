const { JSDOM } = require("jsdom");

async function crawlPage(currentURL) {
  console.log(`actively crawling : ${currentURL}`);
  try {
    const response = await fetch(currentURL);
    if (response.status > 399) {
      console.log(
        `Error in fetch url with status code :${response.status} on page: ${currentURL}`
      );
      return;
    }

    const getContentType = response.headers.get("content-type"); //npm start http://wagslane.dev/sitemap.xml will trigger this
    if (!getContentType.includes("text/html")) {
      console.log(
        `non html response ,content type: ${getContentType} on : ${currentURL}`
      );
      return;
    }

    console.log(await response.text());
  } catch (err) {
    console.log(`error in fetch: ${err.message} on ${currentURL}`);
  }
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
