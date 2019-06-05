import * as b from "bobril";
import { observable } from "bobx";

export interface IFormData {
  onSubmit(value: string): void;
}

export class Form extends b.Component<IFormData> {
  @observable
  private _value: string = "";

  render(): b.IBobrilChildren {
    return (
      <>
        <input
          type="text"
          value={this._value}
          onChange={newValue => this.updateValue(newValue)}
          onKeyUp={ev => ev.which === 13 && this.submit()}
          style={spaceOnRight}
        />
        <button onClick={() => this.submit()}>OK</button>
      </>
    );
  }

  private updateValue(newValue: string): void {
    this._value = newValue;
  }

  private submit(): boolean {
    this.data.onSubmit(this._value);
    this._value = "";
    return true;
  }
}

const spaceOnRight = b.styleDef({ marginRight: 5 });
