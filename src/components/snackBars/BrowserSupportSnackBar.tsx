import React from "react";
import GenericSnackBar from "./GenericSnackBar";
import NewTabLink from "components/links/NewTabLink";

export default function BrowserSupportSnackBar() {
    const isSafari = navigator.vendor === "Apple Computer, Inc.";
    // const isSafari =
    //     navigator.vendor &&
    //     navigator.vendor.indexOf("Apple") > -1 &&
    //     navigator.userAgent &&
    //     navigator.userAgent.indexOf("CriOS") == -1 &&
    //     navigator.userAgent.indexOf("FxiOS") == -1;

    const browserSupportMessage = (browserName: string) => (
        <div>
            {browserName} is not being supported. Please see a list of supported browsers{" "}
            <NewTabLink
                style={{ color: "inherit", textDecoration: "underline" }}
                href="https://github.com/StraightOuttaCrompton/macroscope-front-end#browser-support"
            >
                here
            </NewTabLink>
            .
        </div>
    );

    return <GenericSnackBar defaultIsOpen={isSafari} message={browserSupportMessage("Safari")} />;
}
