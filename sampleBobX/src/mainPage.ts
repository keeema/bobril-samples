import * as b from "bobril";
import { button } from "./components/button";
import { textbox } from "./components/textbox";
import { p } from "./components/paragraph";
import { h1 } from "./components/header";
import { todoStore } from "./store";

export const mainPage = b.createComponent({
  render(_ctx: b.IBobrilCtx, me: b.IBobrilNode): void {
    me.children = [
      h1({}, "TODO"),
      p({}, [
        textbox({
          value: todoStore.todoName,
          onChange: newValue => (todoStore.todoName = newValue)
        }),
        button({ title: "ADD", onClick: () => todoStore.addTodo() })
      ]),
      todoStore.todos.map(item => p({}, item)),
      p({}, `Count: ${todoStore.todos.length}`)
    ];
  }
});

export default mainPage;
