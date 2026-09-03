import { getPlatformAdapter } from '../platform/registry';

/**
 * Key/value storage facade. Delegates to the registered platform adapter
 * (MMKV on React Native, localStorage on the web) so the public `storage`
 * export keeps the same API on every platform.
 */
class Storage {
    setItem = (key: string, value: any) => {
        try {
            return getPlatformAdapter().storage.setItem(key, value);
        } catch (e) {
        }
    };

    getItem = (key: string) => {
        try {
            return getPlatformAdapter().storage.getItem(key);
        } catch (e) {
        }
    };

    removeItem = (key: string) => {
        try {
            getPlatformAdapter().storage.removeItem(key);
        } catch (e) {
            // remove error
        }
    };

    clear = async () => (
        getPlatformAdapter().storage.clear()
    );
}

export default new Storage();
