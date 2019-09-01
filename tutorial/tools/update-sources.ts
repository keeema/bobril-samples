import { readFile, save, listOfFilesInDirectory, newLineRegex } from "./common";

const tutorialPaths: string[] = listOfFilesInDirectory("../../md");

const externalFileLinkRegex = /^(<!-- # from-file:)([\/\w\-. ]+)(\-\-\>)/gm;
let tutorialContent = "";

function run() {
  tutorialPaths.forEach(runForFile);
}

function runForFile(path: string) {
  loadTutorial(path);
  updateCodeBlocks(path);
  save(tutorialContent, path);
  console.info(`Update of ${path} successfully finished.`);
}

function loadTutorial(tutorialPath: string) {
  tutorialContent = readFile(tutorialPath);
  console.info(`Loading ${tutorialPath}`);
}

function updateCodeBlocks(tutorialPath: string) {
  const lines = tutorialContent.split(newLineRegex);
  let lastCodeEnd = -1;

  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].startsWith("```")) {
      lastCodeEnd = processCodeLine(lines, i, lastCodeEnd, tutorialPath);
    }
  }

  tutorialContent = lines.join("\n");
}

function processCodeLine(
  lines: string[],
  i: number,
  lastCodeEnd: number,
  path: string
) {
  if (lastCodeEnd === -1) {
    lastCodeEnd = i;
  } else {
    const externalFile = getFileFromCodeLink(lines[i - 2]);
    if (externalFile.length > 0) {
      const externalFilePath =
        path.substring(0, path.lastIndexOf("/") + 1) + externalFile;
      updateFromExternalFile(externalFilePath, lines, i, lastCodeEnd);
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

function getFileFromCodeLink(line: string | undefined): string {
  if (line === undefined) return "";
  var match = new RegExp(externalFileLinkRegex).exec(line.trim());
  return match !== null && match.length >= 3 ? match[2].trim() : "";
}

run();
