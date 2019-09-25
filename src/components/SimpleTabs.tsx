import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export interface ITabItem {
    label: string;
    content: any;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    }
}));

interface IProps {
    tabItems: ITabItem[];
}

export default function SimpleTabs(props: IProps) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const { tabItems } = props;

    const tabs = tabItems.map((tab, index) => {
        return <Tab label={tab.label} {...a11yProps(index)} />;
    });

    const tabPanels = (_value: number) =>
        tabItems.map((tab, index) => {
            return (
                <TabPanel value={_value} index={index}>
                    {tab.content}
                </TabPanel>
            );
        });

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    {tabs}
                </Tabs>
            </AppBar>
            {tabPanels(value)}
        </div>
    );
}
