import * as b from "bobril";

class Timer extends b.Component {
  private _time: number = 0;
  private _intervalId: number = 0;

  init(): void {
    this._intervalId = window.setInterval(() => this.tick(), 1000);
  }

  render(): b.IBobrilChildren {
    return (
      <>
        <p>Time: {this._time} [s]</p>
        <button onClick={() => this.reset()}>RESET</button>
      </>
    );
  }

  destroy(): void {
    window.clearInterval(this._intervalId);
  }

  private tick(): void {
    this._time++;
    b.invalidate(this);
  }

  private reset(): boolean {
    this._time = 0;
    b.invalidate(this);
    return true;
  }
}

b.init(() => <Timer />);
