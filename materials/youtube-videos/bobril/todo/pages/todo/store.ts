import { observable, computed } from "bobx";

export class TodoStore {
  @observable currentValue: string = "";
  @observable.shallow private _items: string[] = [];

  get items(): string[] {
    return this._items;
  }

  @computed
  get isValueEmpty(): boolean {
    return this.currentValue.trim().length === 0;
  }

  add() {
    if (this.isValueEmpty) return;
    this._items.unshift(this.currentValue);
    this.currentValue = "";
  }

  remove(index: number) {
    this._items.splice(index, 1);
  }
}

export const todoStore = new TodoStore();
