import * as b from "bobril";
import Button from "../components/button";

interface IMainCtx extends b.IBobrilCtx {
  counter: 0;
  intervalId: number;
}

export const Main = b.createVirtualComponent({
  id: "main",
  init(ctx: IMainCtx) {
    start(ctx);
  },
  render(ctx: IMainCtx, me: b.IBobrilNode) {
    me.children = (
      <div>
        <h1>Bobril</h1>
        <p>Counter: {ctx.counter.toString()}</p>
        <Button title="RESET" onClick={() => reset(ctx)} />
      </div>
    );
  },
  destroy(ctx: IMainCtx) {
    stop(ctx);
  }
});

export default Main;

function start(ctx: IMainCtx) {
  ctx.counter = 0;
  ctx.intervalId = window.setInterval(() => {
    ctx.counter++;
    b.invalidate(ctx);
  }, 1000);
}

function stop(ctx: IMainCtx) {
  window.clearInterval(ctx.intervalId);
}

function reset(ctx: IMainCtx) {
  ctx.counter = 0;
  b.invalidate(ctx);
}
