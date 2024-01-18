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
};
