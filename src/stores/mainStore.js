import {observable, action, decorate, runInAction, configure} from "mobx";
import {
    register as authRegister,
    login as authLogin,
    getMessages as authGetMessages,
    postMessage as authPostMessage
} from '../api/auth';

// configure({enforceActions: 'always'});

class Store {
    constructor() {
        this.hydrateStoreWithLocalStorage();
    }

    hydrateStoreWithLocalStorage = () => {
        let user = localStorage.getItem('user');
        if (user === null) {
            return;
        }
        user = JSON.parse(user);
        this.user = user;
    };
    register = async (user) => {
        const responseUser = await authRegister(user);
        if (!responseUser) {
            return false;
        }
        localStorage.setItem('user', JSON.stringify(responseUser));
        runInAction(() => {
            this.user = responseUser;
        });
        return true;
    };
    login = async (auth) => {
        const responseUser = await authLogin(auth);
        if (!responseUser) {
            return false;
        }
        localStorage.setItem('user', JSON.stringify(responseUser));
        runInAction(() => {
            this.user = responseUser;
        });
        return true;
    };
    postMessage = async (chat_id, text) => {
        const message = await authPostMessage(chat_id, this.user.token, text);
        if (!message) {
            return false;
        }
        return message;
    };
    getMessages = async (chat_id) => {
        const messages = await authGetMessages(chat_id, this.user.token);
        if (!messages) {
            return false;
        }
        return messages;
    };
    user = {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        token: '',
    };
}

decorate(Store, {
    user: observable,
    register: action,
    login: action,
    hydrateStoreWithLocalStorage: action,
});

export default new Store();