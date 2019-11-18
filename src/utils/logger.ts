enum LogSeverity {
    INFO,
    ERROR,
    WARNING
}

function log(msg: string, severity: LogSeverity = LogSeverity.INFO) {
    if (process.env.REACT_APP_NODE_ENV === "production") {
        // TODO: log to remote server?
    }

    if (severity === LogSeverity.INFO) {
        console.log(msg);
    } else if (severity === LogSeverity.ERROR) {
        console.error(msg);
    } else if (severity === LogSeverity.WARNING) {
        console.warn(msg);
    }
}

const logger = {
    info: (msg: string) => {
        return log(msg, LogSeverity.INFO);
    }
};

export default logger;
