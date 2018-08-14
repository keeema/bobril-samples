import * as flux from "bobflux";

export interface ITodoAppState extends flux.IState {
  todos: string[];
  todoName: string;
}

export const todoAppCursor: flux.ICursor<ITodoAppState> = {
  key: ""
};

export const todoNameCursor: flux.ICursor<string> = {
  key: "todoName"
};

export function createDefaultTodoAppState(): ITodoAppState {
  return {
    todos: [],
    todoName: ""
  };
}
