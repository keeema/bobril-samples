import * as marked from "marked";
import {
  readFile,
  save,
  isDirectory,
  readFilesFromDirectory,
  newLineRegex
} from "./common";
import * as fs from "fs-extra";
const exampleFileRegex = /^(\[Preview example\]\()([\/\w\-. ]+)(\))/gm;

interface IParseDef {
  id: string;
  source: string;
  destination: string;
}

const parseDefs: IParseDef[] = [
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

const template = readFile("../contentTemplate.tsx");

function processFile(definition: IParseDef) {
  const mdContent = isDirectory(definition.source)
    ? readFilesFromDirectory(definition.source)
    : readFile(definition.source);

  const updatedMdContent = updateExamples(mdContent, definition.source);

  const htmlContent = marked(updatedMdContent, {
    renderer: getRenderer(),
    xhtml: true
  }).replace(/(<!--)(.*)(-->)/g, "");

  const newFileContent = template
    .replace("--ID--", definition.id)
    .replace("--CONTENT--", htmlContent);
  save(newFileContent, definition.destination);
}

parseDefs.forEach(processFile);

export function updateExamples(tutorialContent: string, tutorialPath: string) {
  const links: string[][] = [];
  const lines = tutorialContent.split(newLineRegex);
  for (let i = lines.length - 1; i >= 0; i--) {
    const link = getExampleLink(lines[i]);
    if (link) {
      console.log("Processing link: " + link);
      let resourceProjectName = link.substr(0, link.lastIndexOf("/dist"));
      resourceProjectName = resourceProjectName.substr(
        resourceProjectName.lastIndexOf("/") + 1
      );
      const resourceProjectPath =
        "../../bobril-page/resources/dists/" + resourceProjectName;
      const linkFileName = link.substr(link.lastIndexOf("/") + 1);
      const fullExampleProjectPath =
        (isDirectory(tutorialPath)
          ? tutorialPath + "/"
          : tutorialPath.substring(0, tutorialPath.lastIndexOf("/") + 1)) +
        link.substring(0, link.lastIndexOf("/"));
      console.log("Deleting example from bobril-page: " + resourceProjectPath);
      fs.removeSync(resourceProjectPath);
      console.log(
        "Copying from " + fullExampleProjectPath + " to " + resourceProjectPath
      );
      fs.copySync(fullExampleProjectPath, resourceProjectPath);
      links.push([link, `./${resourceProjectName}/${linkFileName}`]);
    }
  }

  for (let i = 0; i < links.length; i++) {
    tutorialContent = tutorialContent.replace(links[i][0], links[i][1]);
    console.log("Link " + links[i][0] + " updated to: " + links[i][1]);
  }

  return tutorialContent;
}

function getExampleLink(line: string): string {
  if (line === undefined) return "";
  var match = new RegExp(exampleFileRegex).exec(line.trim());
  return match !== null && match.length >= 3 ? match[2].trim() : "";
}

function getRenderer(): marked.Renderer {
  const renderer = new marked.Renderer();

  renderer.text = function(text: string) {
    return "{`" + text + "`}";
  };

  renderer.code = function(code: string, infostring: string, escaped: boolean) {
    const lang = (infostring || "").match(/\S*/)![0];
    escaped = true;
    if ((this as any).options.highlight) {
      const out = (this as any).options.highlight(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }

    if (!lang) {
      return (
        "<pre><code>" +
        "{`" +
        (escaped ? code : escape(code, true)) +
        "`}" +
        "</code></pre>"
      );
    }

    return (
      '<pre><code class="' +
      (this as any).options.langPrefix +
      escape(lang, true) +
      '">' +
      "{`" +
      (escaped ? code : escape(code, true)) +
      "`}" +
      "</code></pre>\n"
    );
  };

  return renderer;
}

function escape(html: string, encode: boolean) {
  const escapeTest = /[&<>"']/;
  const escapeReplace = /[&<>"']/g;
  const replacements = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };

  const escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
  const escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;

  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, function(ch) {
        return (replacements as any)[ch];
      });
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, function(ch) {
        return (replacements as any)[ch];
      });
    }
  }

  return html;
}
