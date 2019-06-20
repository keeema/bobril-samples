import * as b from "bobril";
import { SideBarItems } from "./sidebarItems";
import { Affix } from "bobrilstrap";

export interface IItem {
  targetId: string;
  title: string;
  subs?: IItem[];
}

export interface IDocsSidebarData {
  children?: b.IBobrilChildren;
  items: IItem[];
  main?: boolean;
  topTargetId: string;
}

export class SideBar extends b.Component<IDocsSidebarData> {
  init(): void {
    const onScrollListener = this.getScrollListener();
    b.addOnScroll(onScrollListener);
    b.addDisposable(this, () => b.removeOnScroll(onScrollListener));
  }
  render(): b.IBobrilChildren {
    return (
      <Affix top={this.data.main ? 0 : 0}>
        <nav>
          <SideBarItems
            items={this.data.items}
            topTargetId={this.data.topTargetId}
          />
        </nav>
      </Affix>
    );
  }
  private getScrollListener(): (
    scrollInfo: b.IBobrilScroll | undefined
  ) => void {
    return (scrollInfo: b.IBobrilScroll | undefined) => {
      if (!scrollInfo || scrollInfo.node) {
        return;
      }

      b.invalidate(this);
    };
  }
}
