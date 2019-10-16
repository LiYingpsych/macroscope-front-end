export default class UpdatableTimeout {
    private timeout: NodeJS.Timeout;

    constructor() {
        this.timeout = setTimeout(() => {}, 1);
    }

    public updateTimeout(cb: (...args: any[]) => void, time: number = 1000) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(cb, time);
    }
}
