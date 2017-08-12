import { observable } from 'bobx';

class TodoStore {
    @observable todoName: string = '';
    @observable private _todos: string[] = [];

    get todos(): string[] {
        return this._todos;
    }

    addTodo(): void {
        if (this.todoName.trim().length === 0)
            return;
        this._todos.push(this.todoName.trim());
        this.todoName = '';
    }
}

export const todoStore = new TodoStore();