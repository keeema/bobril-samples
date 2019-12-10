import * as b from "bobril";
import {InlineStyling} from "./examples/inlineStyling";
import {CssBaseStyling} from "./examples/cssBaseStyling";
import {CssExtendingStyling} from "./examples/cssExtendingStyling";
import {CssSelectorsStyling} from "./examples/cssSelectorsStyling";
import {MediaQueriesStyling} from "./examples/mediaQueriesStyling";

class Styling extends b.Component<{}> {
    render(): b.IBobrilChildren {
        return (
            <>
                <InlineStyling label="Inline styling">
                    Body of styled element
                </InlineStyling>
                <CssBaseStyling label="Css styling">
                    Body of styled element
                </CssBaseStyling>
                <CssExtendingStyling label="Extended Css styling">
                    Body of styled element
                </CssExtendingStyling>
                <CssSelectorsStyling label="Using css selectors">
                    Try hover
                </CssSelectorsStyling>
                <MediaQueriesStyling label="Using media queries">
                    Try change screen width
                </MediaQueriesStyling>
            </>
        );
    }
}

b.init(() => <Styling />);
