import BrowserStorage from "./BrowserStorage";

class SessionStorage<I> extends BrowserStorage<I> {
    constructor(storageName: string) {
        super(storageName, sessionStorage);
    }
}

export default SessionStorage;