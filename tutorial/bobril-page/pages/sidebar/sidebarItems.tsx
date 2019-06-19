import * as b from "bobril";
import { SideBarItem, IItemData } from "./sidebarItem";
import { navStyles, Ul } from "bobrilstrap";

export interface IItemsData {
  items: IItemData[];
  nextId?: string;
  topTargetId?: string;
}

export class SideBarItems extends b.Component<IItemsData> {
  render(): b.IBobrilChildren {
    return (
      <Ul style={navStyles.nav}>
        {this.data.items.map((item, i) => {
          const data = b.assign(
            {
              nextId:
                i < this.data.items.length - 1
                  ? this.data.items[i + 1].targetId
                  : this.data.nextId
            },
            item
          );
          return <SideBarItem {...data} />;
        })}
        {this.data.topTargetId && (
          <SideBarItem targetId={this.data.topTargetId} title="Back to top" />
        )}
      </Ul>
    );
  }
}
