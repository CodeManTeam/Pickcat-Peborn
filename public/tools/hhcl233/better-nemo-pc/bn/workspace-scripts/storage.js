
class Storage {
    constructor(namespace) {
        this.namespace = namespace;
        this.storage = this.getAll() || {};
    }
    getAll() {
        const data = localStorage.getItem(this.namespace);
        try {
            return data ? JSON.parse(data) : {};
        } catch (error) {
            console.error('解析存储数据失败:', error);
            return {};
        }
    }
    save(data) {
        localStorage.setItem(this.namespace, JSON.stringify(data));
    }
    get(id) {
        if (!this.storage[id]) return null;
        return this.storage[id];
    }
    set(id, value) {
        this.storage[id] = value;
        this.save(this.storage);
    }
    remove(id) {
        delete this.storage[id];
        this.save(this.storage);
    }
    clear() {
        this.storage = {};
        localStorage.removeItem(this.namespace);
    }
    getAllData() {
        return { ...this.storage };
    }
}
const storage = new Storage('bn');
window['storage'] = storage;
const eStorage = new Storage('localExtensions');
window['eStorage'] = eStorage;

const experimentalConfig = {
    disable_repeat_forever_in_warp: false,
    webview_debug: isPhoneTestEnv(),
}