"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
exports.newLineRegex = /\r?\n/;
function readFile(path) {
    try {
        console.log("Reading file " + path + ".");
        var data = fs.readFileSync(path);
        return data.toString();
    }
    catch (e) {
        console.error("Reading file " + path + " failed:");
        console.error(e.stack);
        process.abort();
        return "";
    }
}
exports.readFile = readFile;
function readFilesFromDirectory(path) {
    var data = "";
    try {
        fs.readdirSync(path).forEach(function (file) { return (data += "\n" + readFile(path + "/" + file)); });
        return data;
    }
    catch (e) {
        console.error("Reading file " + path + " failed:");
        console.error(e.stack);
        process.abort();
        return "";
    }
}
exports.readFilesFromDirectory = readFilesFromDirectory;
function listOfFilesInDirectory(path) {
    var result = [];
    fs.readdirSync(path).forEach(function (item) {
        if (item !== ".") {
            var itemPath = path + "/" + item;
            if (isDirectory(itemPath)) {
                result.push.apply(result, listOfFilesInDirectory(itemPath));
            }
            else if (isFile(itemPath)) {
                result.push(itemPath);
                console.log(itemPath);
            }
        }
    });
    console.info;
    return result;
}
exports.listOfFilesInDirectory = listOfFilesInDirectory;
function save(content, path) {
    try {
        console.info("Updating file " + path);
        fs.writeFileSync(path, content, { flag: "w" });
    }
    catch (e) {
        console.error("Updating file " + path + " failed:");
        console.error(e.stack);
        process.abort();
    }
}
exports.save = save;
function textToId(text) {
    return text.toLowerCase().replace(/[ ]/g, "-");
}
exports.textToId = textToId;
function isDirectory(path) {
    return fs.lstatSync(path).isDirectory();
}
exports.isDirectory = isDirectory;
function isFile(path) {
    return fs.lstatSync(path).isFile();
}
exports.isFile = isFile;
//# sourceMappingURL=common.js.map