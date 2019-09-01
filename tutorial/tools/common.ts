import * as fs from "fs";

export const newLineRegex = /\r?\n/;
export function readFile(path: string): string {
  try {
    console.log(`Reading file ${path}.`);
    const data = fs.readFileSync(path);
    return data.toString();
  } catch (e) {
    console.error(`Reading file ${path} failed:`);
    console.error(e.stack);
    process.abort();
    return "";
  }
}

export function readFilesFromDirectory(path: string): string {
  let data: string = "";
  try {
    fs.readdirSync(path).forEach(
      file => (data += `\n${readFile(`${path}/${file}`)}`)
    );
    return data;
  } catch (e) {
    console.error(`Reading file ${path} failed:`);
    console.error(e.stack);
    process.abort();
    return "";
  }
}

export function listOfFilesInDirectory(path: string): string[] {
  const result: string[] = [];
  fs.readdirSync(path).forEach(item => {
    if (item !== ".") {
      const itemPath = `${path}/${item}`;
      if (isDirectory(itemPath)) {
        result.push(...listOfFilesInDirectory(itemPath));
      } else if (isFile(itemPath)) {
        result.push(itemPath);
        console.log(itemPath);
      }
    }
  });
  console.info;
  return result;
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

export function isDirectory(path: string): boolean {
  return fs.lstatSync(path).isDirectory();
}

export function isFile(path: string): boolean {
  return fs.lstatSync(path).isFile();
}
