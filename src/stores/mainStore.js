import {observable, action, decorate, runInAction, configure} from "mobx";
import {
    register as authRegister,
    login as authLogin,
    getMessages as authGetMessages,
    postMessage as authPostMessage,
    getUsersChats as authGetUsersChats,
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
        runInAction(()=>this.gettingChatMessages = true);
        const messages = await authGetMessages(chat_id, this.user.token);
        runInAction(()=>this.gettingChatMessages = false);
        if (!messages) {
            return false;
        }
        return messages;
    };
    getUsersChats = async () => {
        runInAction(()=>this.gettingUsersChats = true);
        const chats = await authGetUsersChats(this.user.token);
        runInAction(()=>this.gettingUsersChats = false);
        if (!chats) {
            return false;
        }
        return chats;
    };
    user = {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        token: '',
    };
    gettingUsersChats = false;
    gettingChatMessages = false;
}

decorate(Store, {
    user: observable,
    gettingUsersChats: observable,
    gettingChatMessages: observable,
    register: action,
    login: action,
    hydrateStoreWithLocalStorage: action,
});

export default new Store();