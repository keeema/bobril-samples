import { observable } from "bobx";
import { IItem } from "./components/list";

export class TodoStore {
  @observable
  private _todos: IItem[] = [];

  get list(): IItem[] {
    return this._todos;
  }

  add(text: string): void {
    this._todos.push({ id: Date.now(), text, done: false });
  }

  edit(index: number, value: boolean): void {
    this._todos[index].done = value;
  }
}
