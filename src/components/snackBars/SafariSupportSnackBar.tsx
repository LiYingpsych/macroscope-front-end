import React from "react";
import GenericSnackBar from "./GenericSnackBar";

export default function SafariSupportSnackBar() {
    const isSafari = navigator.vendor === "Apple Computer, Inc.";
    // const isSafari =
    //     navigator.vendor &&
    //     navigator.vendor.indexOf("Apple") > -1 &&
    //     navigator.userAgent &&
    //     navigator.userAgent.indexOf("CriOS") == -1 &&
    //     navigator.userAgent.indexOf("FxiOS") == -1;

    return <GenericSnackBar defaultIsOpen={isSafari} message="Safari is not being supported." />;
}
