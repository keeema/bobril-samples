import { readFile, save } from "./common";

const tutorialPaths: string[] = [
  "./bobril-page/resources/get-started.md",
  "./bobril-page/resources/more-tutorials.md"
];
const newLineRegex = /\r?\n/;
const externalFileRegex = /^(<!-- # from-file:)([\/\w\-. ]+)(\-\-\>)/gm;
let tutorialContent = "";

function run() {
  tutorialPaths.forEach(runForFile);
}

function runForFile(path: string) {
  loadTutorial(path);
  removeCodeBlocks();
  save(tutorialContent, path);
  console.info(`Update of ${path} successfully finished.`);
}

function loadTutorial(tutorialPath: string) {
  tutorialContent = readFile(tutorialPath);
  console.info(`Loading ${tutorialPath}`);
}

function removeCodeBlocks() {
  const lines = tutorialContent.split(newLineRegex);
  let lastCodeEnd = -1;

  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].startsWith("```")) {
      lastCodeEnd = processCodeLine(lines, i, lastCodeEnd);
    }
  }

  tutorialContent = lines.join("\n");
}

function processCodeLine(lines: string[], i: number, lastCodeEnd: number) {
  if (lastCodeEnd === -1) {
    lastCodeEnd = i;
  } else {
    const externalFile = getFileFromLine(lines[i - 2]);
    if (externalFile.length > 0) {
      updateFromExternalFile(externalFile, lines, i, lastCodeEnd);
    }
    lastCodeEnd = -1;
  }
  return lastCodeEnd;
}

function updateFromExternalFile(
  externalFile: string,
  lines: string[],
  i: number,
  lastCodeEnd: number
) {
  console.info(`Processing external file ${externalFile}`);
  lines.splice(
    i + 1,
    lastCodeEnd - i - 1,
    ...readFile(externalFile).split(newLineRegex)
  );
}

function getFileFromLine(line: string | undefined): string {
  if (line === undefined) return "";
  var match = new RegExp(externalFileRegex).exec(line.trim());
  return match !== null && match.length >= 3 ? match[2].trim() : "";
}

run();
