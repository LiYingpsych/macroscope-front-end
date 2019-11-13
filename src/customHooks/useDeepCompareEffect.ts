import { useRef, useEffect, EffectCallback } from "react";
import isEqual from "lodash.isequal";

function deepCompareEquals(a: any, b: any) {
    // TODO: implement deep comparison here
    // something like lodash
    return isEqual(a, b);
}

function useDeepCompareMemoize(value: any) {
    const ref = useRef();
    // it can be done by using useMemo as well
    // but useRef is rather cleaner and easier

    if (!deepCompareEquals(value, ref.current)) {
        ref.current = value;
    }

    return ref.current;
}

export default function useDeepCompareEffect(callback: EffectCallback, dependencies: any) {
    useEffect(callback, useDeepCompareMemoize(dependencies));
}
