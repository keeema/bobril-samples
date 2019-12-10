import * as b from "bobril";
import { IStyledComponentData } from "./interfaces";
import { wrapperStyle, titleStyle, bodyStyle } from "./cssBaseStyling";

const hoveredStyle = b.styleDef( { borderColor: "red", color: "green" });
const wrapperHoveredStyle = b.styleDef(wrapperStyle, { hover: hoveredStyle });

export class CssSelectorsStyling extends b.Component<IStyledComponentData> {
    render(): b.IBobrilChildren {
        return <div style={[wrapperStyle, wrapperHoveredStyle ]}>
            <div style={titleStyle}>{this.data.label}</div>
            <div style={bodyStyle}>{this.data.children}</div>
        </div>;
    }
}