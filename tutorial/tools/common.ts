import * as fs from "fs";
export function readFile(path: string): string {
  try {
    const data = fs.readFileSync(path);
    return data.toString();
  } catch (e) {
    console.error(`Reading file ${path} failed:`);
    console.error(e.stack);
    process.abort();
    return "";
  }
}

export function save(content: string, path: string) {
  try {
    console.info(`Updating file ${path}`);
    fs.writeFileSync(path, content, { flag: "w" });
  } catch (e) {
    console.error(`Updating file ${path} failed:`);
    console.error(e.stack);
    process.abort();
  }
}

export function textToId(text: string): string {
  return text.toLowerCase().replace(/[ ]/g, "-");
}
