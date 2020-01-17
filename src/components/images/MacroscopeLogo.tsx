import React from "react";
import Image from "./Image";

interface IProps {
    size?: number;
}

export default function MacroscopeLogo(props: IProps) {
    const { size = 512 } = props;

    return <Image src="/logo512.png" alt="logo512" size={size} />;
}
