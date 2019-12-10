import * as b from "bobril";
import { IStyledComponentData } from "./interfaces";

export const wrapperStyle = b.styleDef({ border: "1px solid blue", padding: "15px", display: "inline-block", margin: "20px" });
export const titleStyle = b.styleDef({ color: "blue", fontWeight: "bold", fontSize: "1.2em" });
export const bodyStyle = b.styleDef({ paddingTop: "8px", fontStyle: "italic" });

export class CssBaseStyling extends b.Component<IStyledComponentData> {
    render(): b.IBobrilChildren {
        return <div style={wrapperStyle}>
            <div style={titleStyle}>{this.data.label}</div>
            <div style={bodyStyle}>{this.data.children}</div>
        </div>;
    }
}