import * as b from "bobril";

interface IHelloData {
  name: string;
  children: b.IBobrilChildren;
}

class Hello extends b.Component<IHelloData> {
  render(): b.IBobrilChildren {
    return (
      <>
        <h1>Hello {this.data.name}</h1>
        {this.data.children}
      </>
    );
  }
}

b.init(() => (
  <Hello name="Developer">
    <p>
      This is your first <strong>bobril</strong> application.
    </p>
  </Hello>
));
