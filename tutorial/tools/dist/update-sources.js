"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./common");
var tutorialPaths = common_1.listOfFilesInDirectory("../../md");
var externalFileLinkRegex = /^(<!-- # from-file:)([\/\w\-. ]+)(\-\-\>)/gm;
var tutorialContent = "";
function run() {
    tutorialPaths.forEach(runForFile);
}
function runForFile(path) {
    loadTutorial(path);
    updateCodeBlocks(path);
    common_1.save(tutorialContent, path);
    console.info("Update of " + path + " successfully finished.");
}
function loadTutorial(tutorialPath) {
    tutorialContent = common_1.readFile(tutorialPath);
    console.info("Loading " + tutorialPath);
}
function updateCodeBlocks(tutorialPath) {
    var lines = tutorialContent.split(common_1.newLineRegex);
    var lastCodeEnd = -1;
    for (var i = lines.length - 1; i >= 0; i--) {
        if (lines[i].startsWith("```")) {
            lastCodeEnd = processCodeLine(lines, i, lastCodeEnd, tutorialPath);
        }
    }
    tutorialContent = lines.join("\n");
}
function processCodeLine(lines, i, lastCodeEnd, path) {
    if (lastCodeEnd === -1) {
        lastCodeEnd = i;
    }
    else {
        var externalFile = getFileFromCodeLink(lines[i - 2]);
        if (externalFile.length > 0) {
            var externalFilePath = path.substring(0, path.lastIndexOf("/") + 1) + externalFile;
            updateFromExternalFile(externalFilePath, lines, i, lastCodeEnd);
        }
        lastCodeEnd = -1;
    }
    return lastCodeEnd;
}
function updateFromExternalFile(externalFile, lines, i, lastCodeEnd) {
    console.info("Processing external file " + externalFile);
    lines.splice.apply(lines, [i + 1,
        lastCodeEnd - i - 1].concat(common_1.readFile(externalFile).split(common_1.newLineRegex)));
}
function getFileFromCodeLink(line) {
    if (line === undefined)
        return "";
    var match = new RegExp(externalFileLinkRegex).exec(line.trim());
    return match !== null && match.length >= 3 ? match[2].trim() : "";
}
run();
//# sourceMappingURL=update-sources.js.map