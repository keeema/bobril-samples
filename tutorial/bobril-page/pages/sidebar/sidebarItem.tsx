import * as b from "bobril";
import { Li } from "bobrilstrap";
import { SideBarItems } from "./sidebarItems";

export interface IItemData {
  targetId: string;
  nextId?: string;
  title: string;
  subs?: IItemData[];
}

export interface IItemsData {
  items?: IItemData[];
  nextId?: string;
  isTop?: boolean;
}

export class SideBarItem extends b.Component<IItemData> {
  private active: boolean = false;

  init(): void {
    const onScrollListener = this.getScrollListener();
    b.addOnScroll(onScrollListener);
    b.addDisposable(this, () => b.removeOnScroll(onScrollListener));
  }
  render(): b.IBobrilChildren {
    return (
      <>
        <Li active={!this.endsWith(this.data.targetId, "-top") && this.active}>
          <a
            href={b.urlOfRoute(this.data.targetId)}
            onClick={() => {
              if (this.endsWith(this.data.targetId, "-top")) {
                window.scrollTo(0, 0);
                return true;
              }
              b.ignoreShouldChange();
              return false;
            }}
          >
            {this.data.title}
          </a>
        </Li>
        {!!this.data.subs && (
          <SideBarItems items={this.data.subs} nextId={this.data.nextId} />
        )}
      </>
    );
  }
  postInitDom(): void {
    this.handlePosition();
  }

  private getScrollListener(): (
    scrollInfo: b.IBobrilScroll | undefined
  ) => void {
    return (scrollInfo: b.IBobrilScroll | undefined) => {
      if (!scrollInfo || scrollInfo.node) {
        return;
      }

      this.handlePosition();
    };
  }

  private handlePosition(): void {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const topElement = document.getElementById(this.data.targetId);
    const top = topElement ? topElement.offsetTop : 0;
    let bottom = 0;
    if (this.data.nextId) {
      const nextElement = document.getElementById(this.data.nextId);
      const nextOffsetTop = nextElement
        ? nextElement.offsetTop + nextElement.clientHeight
        : document.body.scrollHeight;
      bottom = nextOffsetTop;
    } else {
      bottom = document.body.scrollHeight;
    }

    const active = scrollTop >= top && scrollTop < bottom;
    const changeState = active !== this.active;
    this.active = active;

    if (changeState) {
      b.invalidate(this);
    }
  }

  private endsWith(
    value: string,
    searchString: string,
    position?: number
  ): boolean {
    const subjectString = value.toString();
    if (
      typeof position !== "number" ||
      !isFinite(position) ||
      Math.floor(position) !== position ||
      position > subjectString.length
    ) {
      position = subjectString.length;
    }
    position -= searchString.length;
    const lastIndex = subjectString.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  }
}
