const onEnter = (cb: Function) => (event: KeyboardEvent) => {
    const key = event.key;

    if (key.toLowerCase() === "enter") {
        cb();
    }
};

export default onEnter;
