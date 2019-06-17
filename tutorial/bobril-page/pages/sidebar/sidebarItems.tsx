import * as b from "bobril";
import { SideBarItem, IItemData } from "./sidebarItem";
import { navStyles } from "bobrilstrap";

export interface IItemsData {
  items: IItemData[];
  nextId?: string;
  topTargetId?: string;
}

export class SideBarItems extends b.Component<IItemsData> {
  render(): b.IBobrilChildren {
    return (
      <ul style={navStyles.nav}>
        {this.data.items.map((item, i) => (
          <SideBarItem
            {...item}
            nextId={
              i < this.data.items.length - 1
                ? this.data.items[i + 1].targetId
                : this.data.nextId
            }
          />
        ))}
      </ul>
    );
    /*
    b.style(me, [
      bs.navStyles.nav,
      ctx.data.topTargetId && styles.bsDocsSidenav
    ]);
    me.children = [
      ...ctx.data.items.map((item, i) => {
        const data = b.assign(
          {
            nextId:
              i < ctx.data.items.length - 1
                ? ctx.data.items[i + 1].targetId
                : ctx.data.nextId
          },
          item
        );
        return sideBarItem(data);
      }),
      ctx.data.topTargetId &&
        sideBarItem({ targetId: ctx.data.topTargetId, title: "Back to top" })
    ];
  }
  */
  }
}
