import React from "react";
import JSNetworkGraph from "./JSNetworkGraph";

import { makeStyles, createStyles, useTheme } from "@material-ui/core/styles";
import { SizeMe } from "react-sizeme";

import assignDefaultValuesToObject from "../../utils/assignDefaultValuesToObject";
import getDefaultConfig from "./getDefaultConfig";

import IGraphConfig from "./models/configs/IGraphConfig";
import IGraphData from "./models/IGraphData";
import parseData from "./parseData";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            "& svg": {
                width: "100% !important"
            }
        }
    })
);

interface IProps<T> {
    id: string;
    data: IGraphData<T>;
    config?: IGraphConfig<T>;
}

export default function NetworkGraph<T>(props: IProps<T>) {
    const { id, data, config = {} } = props;
    const classes = useStyles();

    const theme = useTheme();
    const defaultConfig = getDefaultConfig<T>(theme);

    const parsedData = parseData(data);

    // TODO: removing classes.root causes an issue when zooming the browser in and out
    return (
        <div className={classes.root}>
            <SizeMe>
                {({ size }) => {
                    const { width } = size;
                    const _width = width === null ? undefined : width;

                    return (
                        <JSNetworkGraph
                            id={id}
                            data={parsedData}
                            config={assignDefaultValuesToObject(defaultConfig, {
                                ...config,
                                width: _width
                            })}
                        />
                    );
                }}
            </SizeMe>
        </div>
    );
}
