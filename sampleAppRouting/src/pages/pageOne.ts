import * as b from "bobril";
import { textbox } from "../components/textbox";
import { button } from "../components/button";

let value = "";

export const pageOne = b.createComponent({
  render(ctx: b.IBobrilCtx, me: b.IBobrilNode): void {
    me.children = [
      textbox({
        value,
        onChange: newVal => {
          value = newVal;
          b.invalidate(ctx);
        }
      }),
      button({
        title: "Confirm",
        onClick: () => {
          b.runTransition(b.createRedirectPush("two", { text: value }));
          return true;
        }
      })
    ];
  },
  canDeactivate() {
    return !!value.trim() || confirm("The textbox is empty. Are you sure?");
  }
});
