abstract class BrowserStorage<I> {
    private storageName: string;
    private storage: Storage

    constructor(storageName: string, storage: Storage) {
        this.storageName = storageName;
        this.storage = storage;
    }

    public set = (value: I): void => this.storage.setItem(this.storageName, JSON.stringify(value));

    public get = (): I | null => {
        const value = this.storage.getItem(this.storageName);

        if (!value)
            return null;

        try {
            return JSON.parse(value);
        } catch (error) {
            return null;
        }
    }

    public truncate = (): void => this.storage.removeItem(this.storageName);
}

export default BrowserStorage;