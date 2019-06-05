import * as b from "bobril";

export interface IItem {
  id: number;
  text: string;
}

export interface IListData {
  items: IItem[];
}

export function List(data: IListData): b.IBobrilNode {
  return (
    <ul>
      {data.items.map(item => (
        <ListItem {...item} />
      ))}
    </ul>
  );
}

function ListItem(data: IItem): b.IBobrilNode {
  return <li key={data.id}>{data.text}</li>;
}
