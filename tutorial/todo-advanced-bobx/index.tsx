import * as b from "bobril";
import { Layout } from "./components/layout";
import { List } from "./components/list";
import { Form } from "./components/form";
import { TodoStore } from "./store";

class Todo extends b.Component {
  todos = new TodoStore();

  render(): b.IBobrilChildren {
    return (
      <Layout>
        {{
          header: <h1>TODO</h1>,
          body: (
            <List
              items={this.todos.list}
              onItemChecked={(index, value) => this.todos.edit(index, value)}
            />
          ),
          footer: <Form onSubmit={text => this.todos.add(text)} />
        }}
      </Layout>
    );
  }
}

b.init(() => <Todo />);
