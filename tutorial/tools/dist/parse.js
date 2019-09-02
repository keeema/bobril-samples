"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var marked = require("marked");
var common_1 = require("./common");
var fs = require("fs-extra");
var exampleFileRegex = /^(\[Preview example\]\()([\/\w\-. ]+)(\))/gm;
var parseDefs = [
    {
        id: "get-started",
        source: "../../md/get-started.md",
        destination: "../../bobril-page/pages/getStarted/content.tsx"
    },
    {
        id: "more-tutorials",
        source: "../../md/more-tutorials",
        destination: "../../bobril-page/pages/moreTutorials/content.tsx"
    },
    {
        id: "eco-system",
        source: "../../md/eco-system.md",
        destination: "../../bobril-page/pages/ecoSystem/content.tsx"
    }
];
var template = common_1.readFile("../contentTemplate.tsx");
function processFile(definition) {
    var mdContent = common_1.isDirectory(definition.source)
        ? common_1.readFilesFromDirectory(definition.source)
        : common_1.readFile(definition.source);
    var updatedMdContent = updateExamples(mdContent, definition.source);
    var htmlContent = marked(updatedMdContent, {
        renderer: getRenderer(),
        xhtml: true
    }).replace(/(<!--)(.*)(-->)/g, "");
    var newFileContent = template
        .replace("--ID--", definition.id)
        .replace("--CONTENT--", htmlContent);
    common_1.save(newFileContent, definition.destination);
}
parseDefs.forEach(processFile);
function updateExamples(tutorialContent, tutorialPath) {
    var links = [];
    var lines = tutorialContent.split(common_1.newLineRegex);
    for (var i = lines.length - 1; i >= 0; i--) {
        var link = getExampleLink(lines[i]);
        if (link) {
            console.log("Processing link: " + link);
            var resourceProjectName = link.substr(0, link.lastIndexOf("/dist"));
            resourceProjectName = resourceProjectName.substr(resourceProjectName.lastIndexOf("/") + 1);
            var resourceProjectPath = "../../bobril-page/resources/dists/" + resourceProjectName;
            var linkFileName = link.substr(link.lastIndexOf("/") + 1);
            var fullExampleProjectPath = (common_1.isDirectory(tutorialPath)
                ? tutorialPath + "/"
                : tutorialPath.substring(0, tutorialPath.lastIndexOf("/") + 1)) +
                link.substring(0, link.lastIndexOf("/"));
            console.log("Deleting example from bobril-page: " + resourceProjectPath);
            fs.removeSync(resourceProjectPath);
            console.log("Copying from " + fullExampleProjectPath + " to " + resourceProjectPath);
            fs.copySync(fullExampleProjectPath, resourceProjectPath);
            links.push([link, "./" + resourceProjectName + "/" + linkFileName]);
        }
    }
    for (var i = 0; i < links.length; i++) {
        tutorialContent = tutorialContent.replace(links[i][0], links[i][1]);
        console.log("Link " + links[i][0] + " updated to: " + links[i][1]);
    }
    return tutorialContent;
}
exports.updateExamples = updateExamples;
function getExampleLink(line) {
    if (line === undefined)
        return "";
    var match = new RegExp(exampleFileRegex).exec(line.trim());
    return match !== null && match.length >= 3 ? match[2].trim() : "";
}
function getRenderer() {
    var renderer = new marked.Renderer();
    renderer.text = function (text) {
        return "{`" + text + "`}";
    };
    renderer.code = function (code, infostring, escaped) {
        var lang = (infostring || "").match(/\S*/)[0];
        escaped = true;
        if (this.options.highlight) {
            var out = this.options.highlight(code, lang);
            if (out != null && out !== code) {
                escaped = true;
                code = out;
            }
        }
        if (!lang) {
            return ("<pre><code>" +
                "{`" +
                (escaped ? code : escape(code, true)) +
                "`}" +
                "</code></pre>");
        }
        return ('<pre><code class="' +
            this.options.langPrefix +
            escape(lang, true) +
            '">' +
            "{`" +
            (escaped ? code : escape(code, true)) +
            "`}" +
            "</code></pre>\n");
    };
    return renderer;
}
function escape(html, encode) {
    var escapeTest = /[&<>"']/;
    var escapeReplace = /[&<>"']/g;
    var replacements = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    };
    var escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
    var escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
    if (encode) {
        if (escapeTest.test(html)) {
            return html.replace(escapeReplace, function (ch) {
                return replacements[ch];
            });
        }
    }
    else {
        if (escapeTestNoEncode.test(html)) {
            return html.replace(escapeReplaceNoEncode, function (ch) {
                return replacements[ch];
            });
        }
    }
    return html;
}
//# sourceMappingURL=parse.js.map