import * as b from "bobril";
import { IStyledComponentData } from "./interfaces";
import { bodyStyle, titleStyle, wrapperStyle } from "./cssBaseStyling";

const mediaQueryStyle = b.styleDefEx(wrapperStyle, { borderColor: "green" });

// results in "only screen and (max-width: 600px) , only print"
const mediaQueryDef = b.createMediaQuery()
    .rule("only", "screen")
    .and({type: "max-width", value: 600, unit: "px"})
    .or()
    .rule("only", "print")
    .build();

b.mediaQueryDef(mediaQueryDef, {
    [mediaQueryStyle]: {
        opacity: 0.5
    }
});

export class MediaQueriesStyling extends b.Component<IStyledComponentData> {
    render(): b.IBobrilChildren {
        return <div style={[wrapperStyle, mediaQueryStyle ]}>
            <div style={titleStyle}>{this.data.label}</div>
            <div style={bodyStyle}>{this.data.children}</div>
        </div>;
    }
}