import * as b from "bobril";
import * as flux from "bobflux";
import { todoAppCursor } from "./state";
import { changeTodoName } from "./actions/changeTodoName";
import { addTodo } from "./actions/addTodo";
import { button } from "./components/button";
import { textbox } from "./components/textbox";
import { p } from "./components/paragraph";
import { h1 } from "./components/header";

export const mainPage = b.createComponent({
  render(_ctx: b.IBobrilCtx, me: b.IBobrilNode): void {
    const state = flux.getState(todoAppCursor);
    me.children = [
      h1({}, "TODO"),
      p({}, [
        textbox({
          value: state.todoName,
          onChange: newValue => changeTodoName(newValue)
        }),
        button({ title: "ADD", onClick: () => addTodo() })
      ]),
      state.todos.map(item => p({}, item)),
      p({}, `Count: ${state.todos.length}`)
    ];
  }
});

export default mainPage;
