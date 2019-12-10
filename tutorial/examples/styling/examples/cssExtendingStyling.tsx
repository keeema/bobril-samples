import * as b from "bobril";
import { IStyledComponentData } from "./interfaces";
import { bodyStyle, titleStyle, wrapperStyle } from "./cssBaseStyling";

const extendedWrapperStyle = b.styleDefEx(wrapperStyle, { borderColor: "red" });

export class CssExtendingStyling extends b.Component<IStyledComponentData> {
    render(): b.IBobrilChildren {
        return <div style={[wrapperStyle, extendedWrapperStyle]}>
            <div style={titleStyle}>{this.data.label}</div>
            <div style={bodyStyle}>{this.data.children}</div>
        </div>;
    }
}