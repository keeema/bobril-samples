import * as b from "bobril";
import { observable } from "bobx";
import { Button } from "../components/button";

class MainCtx extends b.BobrilCtx<never> {
  @observable counter: number = 0;
  intervalId: number = 0;

  constructor() {
    super();
    this.start();
  }

  start() {
    this.counter = 0;
    this.intervalId = window.setInterval(() => this.counter++, 1000);
  }

  stop() {
    window.clearInterval(this.intervalId);
  }

  reset() {
    this.counter = 0;
  }
}

export const Main = b.createVirtualComponent({
  id: "main",
  ctxClass: MainCtx,
  render(ctx: MainCtx, me: b.IBobrilNode) {
    me.children = (
      <div>
        <h1>Hello Bobril!</h1>
        <p>Counter: {ctx.counter.toString()}</p>
        <Button title="RESET" onClick={() => ctx.reset()} bold={true} />
      </div>
    );
  },
  destroy(ctx: MainCtx) {
    ctx.stop();
  }
});
