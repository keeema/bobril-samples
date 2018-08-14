import * as flux from "bobflux";
import { todoAppCursor } from "../state";

export const addTodo = flux.createParamLessAction(todoAppCursor, state => {
  if (!state.todoName || state.todoName.trim().length === 0) return state;

  return flux.shallowCopy(state, copy => {
    copy.todos = [...state.todos, state.todoName];
    copy.todoName = "";
  });
});

export default addTodo;
