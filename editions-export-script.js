const fs = require("fs");
const path = require("path");
const root = path.resolve();
const UglifyJS = require("uglify-es");

const inputLibraryPath = "/dev/freshdesk-api-wrappers.js"; // from project root, lead slash

const outputLibraryFilename = "/freshdesk-api-wrappers.js"; // lead slash

const isTestExampleLibrariesUpdate = true; // Update test-examples libraries?

const outputPath = "/dist/"; // from project root, both slashes
const importDriverPath = "/dev/requests-drivers/"; // from project root, both slashes
const inputLibraryCommentsPath = "/dev/introduction-comments.js"; // from project root, lead slash
const envTemplateFolder = "/env-templates/";
const driverMethodStartPattern = "function makeRequest(method, url, headers, body) {"; // end patter will be last '}' symbol
const driverMethodReplacePattern = "// EDITION SPECIFIC METHOD. OVERWRITE THIS METHOD ON TESTING";

const editions = {
  "freshdesk-frontend-app": {
    dependency: "",
    driver: "freshdesk-frontend-request.js",
    exports: "",
    minify: true,
    envTemplateDestination: "/app/"
  },

  "freshdesk-serverless-app": {
    dependency: "",
    driver: "freshdesk-serverless-request.js",
    exports: "exports = freshdeskApiKit;",
    minify: false,
    envTemplateDestination: "/server/lib/"
  },

  "browser-frontend-app": {
    dependency: "",
    driver: "browser-frontend-xmlhttprequest.js",
    exports: "",
    minify: true,
    envTemplateDestination: "/js/"
  },

  "node-js-app": {
    dependency: 'const axios = require("axios").default;',
    driver: "node-js-axios.js",
    exports: "module.exports = freshdeskApiKit;",
    minify: false,
    envTemplateDestination: "/lib/"
  }
};

exportObj = [];
const read = addr => fs.readFileSync(root + addr, "utf8");
const baseLib = read(inputLibraryPath);

let projectPackage = JSON.parse(read("/package.json"));
let baseLibComments = read(inputLibraryCommentsPath);
baseLibComments = baseLibComments.replace(/@version/, `@version ${projectPackage.version}`); // change version

for (let editionName in editions) {
  const edition = editions[editionName];

  let editionObj = {
    name: editionName,
    content: baseLib,
    minify: edition.minify,
    envTemplateDestination: edition.envTemplateDestination
  };

  editionObj.content = baseLibComments + "\r\n" + editionObj.content;

  if (edition.dependency) {
    editionObj.content = edition.dependency + "\r\n\r\n" + editionObj.content;
  }

  let editionDriver = read(importDriverPath + edition.driver);

  editionDriver = editionDriver
    .slice(editionDriver.indexOf(driverMethodStartPattern), editionDriver.lastIndexOf("}"))
    .replace(driverMethodStartPattern, "")
    .trim();

  editionDriver = editionDriver.replace(/^ /gim, "     "); // add 6 spaces padding

  editionObj.content = editionObj.content.replace(driverMethodReplacePattern, editionDriver);

  if (edition.exports) {
    editionObj.content = editionObj.content + "\r\n" + edition.exports;
  }

  exportObj.push(editionObj);
}

exportObj.forEach(editionObj => {
  //
  // Main output
  fs.writeFileSync(root + outputPath + editionObj.name + outputLibraryFilename, editionObj.content, "utf8");

  console.log(`Export edition: `, outputPath + editionObj.name + outputLibraryFilename);

  // Minified output
  if (editionObj.minify) {
    console.log(`Export minified edition: `, outputPath + editionObj.name + outputLibraryFilename);
    fs.writeFileSync(
      root + outputPath + editionObj.name + outputLibraryFilename.replace(".js", ".min.js"),
      UglifyJS.minify(editionObj.content).code,
      "utf8"
    );
  }

  if (isTestExampleLibrariesUpdate && editionObj.envTemplateDestination) {
    console.log(
      `Update test example version: `,
      envTemplateFolder + editionObj.name + editionObj.envTemplateDestination + outputLibraryFilename
    );

    fs.writeFileSync(
      root + envTemplateFolder + editionObj.name + editionObj.envTemplateDestination + outputLibraryFilename,
      editionObj.content,
      "utf8"
    );
  }
});
