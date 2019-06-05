import * as b from "bobril";

interface IHelloData {
  name: string;
}

class Hello extends b.Component<IHelloData> {
  render(): b.IBobrilChildren {
    return (
      <>
        <h1>Hello {this.data.name}</h1>
        <p>
          This is your first <strong>bobril</strong> application.
        </p>
      </>
    );
  }
}

b.init(() => <Hello name="Developer" />);
