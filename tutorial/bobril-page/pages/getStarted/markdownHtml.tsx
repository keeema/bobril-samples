import * as b from "bobril";
import * as marked from "marked";
import { observable, computed } from "bobx";
export class MarkdownHtml extends b.Component<{
  path: string;
}> {
  @observable
  private _mdContent: string = "";
  @computed
  private get htmlContent(): string {
    if (this._mdContent.length === 0) {
      return "";
    }
    const content = marked(this._mdContent);
    b.invalidate();
    return content;
  }
  init(): void {
    this.load();
  }
  render(): b.IBobrilChildren {
    return <div />;
  }
  postInitDom(): void {
    const node: HTMLDivElement = b.getDomNode(this.me) as HTMLDivElement;
    node.innerHTML = this.htmlContent;
  }
  postUpdateDom(): void {
    const node: HTMLDivElement = b.getDomNode(this.me) as HTMLDivElement;
    node.innerHTML = this.htmlContent;
  }
  private load(): void {
    const request = new XMLHttpRequest();
    request.open("GET", this.data.path, true);
    request.onreadystatechange = () => {
      if (
        request.readyState === 4 &&
        (request.status === 200 || request.status === 0)
      ) {
        this._mdContent = request.responseText;
      }
    };
    request.send(null);
  }
}
