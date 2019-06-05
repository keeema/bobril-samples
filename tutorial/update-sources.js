"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var tutorialPath = "./readme.md";
var newLineRegex = /\r?\n/;
var externalFileRegex = /^(<!-- # from-file:)([\/\w\-. ]+)(\-\-\>)/gm;
var tutorialContent = "";
function run() {
    loadTutorial();
    removeCodeBlocks();
    save();
    console.info("Update successfully finished.");
}
function readFile(path) {
    try {
        var data = fs.readFileSync(path);
        return data.toString();
    }
    catch (e) {
        console.error("Reading file " + tutorialPath + " failed:");
        console.error(e.stack);
        process.abort();
        return "";
    }
}
function loadTutorial() {
    tutorialContent = readFile(tutorialPath);
    console.info("Loading " + tutorialPath);
}
function removeCodeBlocks() {
    var lines = tutorialContent.split(newLineRegex);
    var lastCodeEnd = -1;
    for (var i = lines.length - 1; i >= 0; i--) {
        if (lines[i].startsWith("```")) {
            lastCodeEnd = processCodeLine(lines, i, lastCodeEnd);
        }
    }
    tutorialContent = lines.join("\n");
}
function processCodeLine(lines, i, lastCodeEnd) {
    if (lastCodeEnd === -1) {
        lastCodeEnd = i;
    }
    else {
        var externalFile = getFileFromLine(lines[i - 2]);
        if (externalFile.length > 0) {
            updateFromExternalFile(externalFile, lines, i, lastCodeEnd);
        }
        lastCodeEnd = -1;
    }
    return lastCodeEnd;
}
function updateFromExternalFile(externalFile, lines, i, lastCodeEnd) {
    console.info("Processing external file " + externalFile);
    lines.splice.apply(lines, [i + 1,
        lastCodeEnd - i - 1].concat(readFile(externalFile).split(newLineRegex)));
}
function save() {
    try {
        console.info("Updating file " + tutorialPath);
        fs.writeFileSync(tutorialPath, tutorialContent);
    }
    catch (e) {
        console.error("Updating file " + tutorialPath + " failed:");
        console.error(e.stack);
        process.abort();
    }
}
function getFileFromLine(line) {
    if (line === undefined)
        return "";
    var match = new RegExp(externalFileRegex).exec(line.trim());
    return match !== null && match.length >= 3 ? match[2].trim() : "";
}
run();
//# sourceMappingURL=update-sources.js.map