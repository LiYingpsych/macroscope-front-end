import IGraphData from "./models/IGraphData";

function scaleSizes<T>(data: IGraphData<T>): IGraphData<T> {
    let sizes: number[] = [];

    data.nodes.forEach(node => {
        if (typeof node.size !== "undefined") sizes.push(node.size);
    });

    const maxNodeSize = Math.max(...sizes);
    const minNodeSize = Math.max(...sizes);

    const nodeSizeMultiplier = 2000;

    return {
        ...data,
        nodes: data.nodes.map(node => {
            return {
                ...node,
                size:
                    typeof node.size === "undefined"
                        ? (minNodeSize / maxNodeSize) * nodeSizeMultiplier
                        : (node.size / maxNodeSize) * nodeSizeMultiplier
            };
        })
    };
}

export default function parseData<T>(data: IGraphData<T>): IGraphData<T> {
    const scaledSizesData = scaleSizes(data);

    return scaledSizesData;
}
