import * as b from "bobril";
import { Layout } from "./components/layout";
import { List, IItem } from "./components/list";
import { Form } from "./components/form";

class Todo extends b.Component {
  private _todos: IItem[] = [];

  render(): b.IBobrilChildren {
    return (
      <Layout>
        {{
          header: <h1>TODO</h1>,
          body: <List items={this._todos} />,
          footer: <Form onSubmit={text => this.add(text)} />
        }}
      </Layout>
    );
  }

  private add(text: string): void {
    this._todos.push({ id: Date.now(), text });
    b.invalidate(this);
  }
}

b.init(() => <Todo />);
