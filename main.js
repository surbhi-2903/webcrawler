const { crawlPage } = require("./crawl.js");

function main() {
  if (process.argv.length < 3) {
    console.log("no website provided");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log("too many arguments");
  }
  const baseUrl = process.argv[2];
  console.log(`starting crawl:${baseUrl}`);
  crawlPage(baseUrl)
}

main();
