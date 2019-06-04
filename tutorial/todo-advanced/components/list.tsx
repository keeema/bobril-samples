import * as b from "bobril";
import { ListItem } from "./listItem";

export interface IItem {
  id: number;
  text: string;
  done: boolean;
}

export interface IListData {
  items: IItem[];
  onItemChecked(index: number, value: boolean): void;
}

export function List(data: IListData): b.IBobrilNode {
  return (
    <ul style={noBullets}>
      {data.items.map((item, index) => (
        <ListItem {...item} index={index} onItemChecked={data.onItemChecked} />
      ))}
    </ul>
  );
}

const noBullets = b.styleDef({ listStyleType: "none" });
