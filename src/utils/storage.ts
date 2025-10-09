import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()

class Storage {

    setItem=(key:string, value:any)=> {
        try {
            return storage.set(key, JSON.stringify(value))
        } catch (e) {
        }
    };

    getItem=(key:string)=> {
        try {
            const value = storage.getString(key);
            if (value) {
                return JSON.parse(value)
            }
            return undefined
        } catch(e) {
        }
    };

    removeItem=(key:string)=> {
        try {
            storage.delete(key)
        } catch(e) {
            // remove error
        }
    };

    clear=async ()=> (
        storage.clearAll()
    )

}

export default new Storage()
