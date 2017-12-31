import { observable, computed } from "bobx";
import { IItem } from "./item";

export class TodoStore {
  @observable currentValue: string = "";
  @observable private _items: IItem[] = [];

  get items(): IItem[] {
    return this._items;
  }

  @computed
  get isValueEmpty(): boolean {
    return this.currentValue.trim().length === 0;
  }

  add() {
    if (this.isValueEmpty) return;
    this._items.unshift({
      id: "",
      completed: false,
      title: this.currentValue
    });
    this.currentValue = "";
  }

  remove(index: number) {
    this._items.splice(index, 1);
  }

  setCompleted(index: number, completed: boolean) {
    this._items[index].completed = completed;
  }
}

export const todoStore = new TodoStore();
