import BrowserStorage from "./BrowserStorage";

class LocalStorage<I> extends BrowserStorage<I> {
    constructor(storageName: string) {
        super(storageName, localStorage);
    }
}

export default LocalStorage;