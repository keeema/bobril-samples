import * as marked from "marked";
import { readFile, save } from "./common";

interface IParseDef {
  id: string;
  source: string;
  destination: string;
}

const parseDefs: IParseDef[] = [
  {
    id: "get-started",
    source: "../../get-started.md",
    destination: "../../bobril-page/pages/getStarted/content.tsx"
  },
  {
    id: "more-tutorials",
    source: "../../more-tutorials.md",
    destination: "../../bobril-page/pages/moreTutorials/content.tsx"
  },
  {
    id: "eco-system",
    source: "../../eco-system.md",
    destination: "../../bobril-page/pages/ecoSystem/content.tsx"
  }
];

const template = readFile("../contentTemplate.tsx");

function processFile(definition: IParseDef) {
  const mdContent = readFile(definition.source);
  const htmlContent = marked(mdContent, {
    renderer: getRenderer(),
    xhtml: true
  }).replace(/(<!--)(.*)(-->)/g, "");

  const newFileContent = template
    .replace("--ID--", definition.id)
    .replace("--CONTENT--", htmlContent);
  save(newFileContent, definition.destination);
}

parseDefs.forEach(processFile);

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
