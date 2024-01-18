const { normalizeURL, getURLFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const input = "https://blog.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});
test("normalizeURLstrip trailing slash", () => {
  const input = "https://blog.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});
test("normalizeURL capitals", () => {
  const input = "https://BLOG.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});
test("normalizeURL strip http", () => {
  const input = "http://blog.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});
test("getURLFromHTML absolute", () => {
  const inputhtmlbody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/">
            Boot.dev Blog
            </a>
        </body>
    </html>
    `;
  const inputbaseURL = "https://blog.boot.dev";
  const actual = getURLFromHTML(inputhtmlbody, inputbaseURL);
  const expected = ["https://blog.boot.dev/"];
  expect(actual).toEqual(expected);
});

test("getURLFromHTML relative", () => {
  const inputhtmlbody = `
    <html>
        <body>
            <a href="/path/">
            Boot.dev Blog
            </a>
        </body>
    </html>
    `;
  const inputbaseURL = "https://blog.boot.dev";
  const actual = getURLFromHTML(inputhtmlbody, inputbaseURL);
  const expected = ["https://blog.boot.dev/path/"];
  expect(actual).toEqual(expected);
});

test('getUrlFromHTML both', () => {
    const inputhtmlbody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/">
            Boot.dev Blog path1
            </a>
            <a href="/path2/">
            Boot.dev Blog path2
            </a>
        </body>
    </html>
    `
    const inputbaseURL="https://blog.boot.dev"
    const actual=getURLFromHTML(inputhtmlbody,inputbaseURL)
    const expected=['https://blog.boot.dev/path1/','https://blog.boot.dev/path2/']
    expect(actual).toEqual(expected)
})
test('getURLFromHTML invalidurl', () => {
    const inputhtmlbody = `
    <html>
        <body>
            <a href="invalid">
            Invalid URL
            </a>
        </body>
    </html>
    `
    const inputbaseURL="https://blog.boot.dev"
    const actual=getURLFromHTML(inputhtmlbody,inputbaseURL)
    const expected=[]
    expect(actual).toEqual(expected);
})