## Styling
Bobril has two ways of defining styles, **inline styles** and **styles definitions**

### Inline styles
 - Basic way of defining component style, just write css style as js object into style property of an element.
 - CSS properties must be camelCased (*padding-top* -> *paddingTop* ).
 - Disadvantage of inline style is a bigger and less readable HTML and no advance CSS options - see style definitions.

<!-- # from-file: ../../examples/styling/examples/inlineStyling.tsx -->
```tsx
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
```

### Style definition
- CSS style can be defined by `b.styleDef`
- Bobril build will generate CSS class from style definitions and use CSS classes in components.

<!-- # from-file: ../../examples/styling/examples/cssBaseStyling.tsx -->
```tsx
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
```

- To create CSS subclass use `b.styleDefEx`. First parameter is original class and the second is subclass style.
- Please notice several styles can be combined as array in the style property.

<!-- # from-file: ../../examples/styling/examples/cssExtendingStyling.tsx -->

```tsx
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
```

- CSS selectors can be used in Bobril as well. Just use second optional parameter in `b.styleDef`.
<!-- # from-file: ../../examples/styling/examples/cssSelectorsStyling.tsx -->

```tsx
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
```

### Media Queries
- To define media query use `b.mediaQueryDef`, first parameter is media query and second affected styles with styling changes.
- Build-in builder `b.createMediaQuery` can be used to write media query.

<!-- # from-file: ../../examples/styling/examples/mediaQueriesStyling.tsx -->

```tsx
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
```

[Preview example](../../examples/styling/dist/index.html)