import * as b from "bobril";
import {IStyledComponentData} from "./interfaces";

export class InlineStyling extends b.Component<IStyledComponentData> {
    render(): b.IBobrilChildren {
        const wrapperStyle = { border: "1px solid blue", padding: "15px", display: "inline-block", margin: "20px" };

        return <div style={wrapperStyle}>
            <div style={{ color: "blue", fontWeight: "bold", fontSize: "1.2em" }}>{this.data.label}</div>
            <div style={{ paddingTop: "8px", fontStyle: "italic" }}>{this.data.children}</div>
        </div>;
    }
}