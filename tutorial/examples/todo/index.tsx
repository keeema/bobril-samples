import * as b from "bobril";
import { List, IItem } from "./components/list";
import { Form } from "./components/form";

class Todo extends b.Component {
  private _todos: IItem[] = [];

  render(): b.IBobrilChildren {
    return (
      <>
        <h1>TODO</h1>
        <List items={this._todos} />
        <Form onSubmit={text => this.add(text)} />
      </>
    );
  }

  private add(text: string): void {
    this._todos.push({ id: Date.now(), text });
    b.invalidate(this);
  }
}

b.init(() => <Todo />);
