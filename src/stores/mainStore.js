import {observable, action, decorate, runInAction} from "mobx";
import {
    register as authRegister,
    login as authLogin,
    getMessages as authGetMessages,
    postMessage as authPostMessage,
    postMessageWS as authPostMessageWS,
    typingChatWS as authTypingChatWS,
    joinChatWS as authJoinChatWS,
    getUsersChats as authGetUsersChats,
    getUsersDropdown as authGetUsersDropdown,
    createChat as authCreateChat,
    searchGIFY as authSearchGIFY,
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
    postMessage = async (chat_id, text, type) => {
        const message = await authPostMessage(chat_id, this.user.token, text, type);
        if (!message) {
            return false;
        }
        return message;
    };
    joinChatWS = (chat_id, socket) => {
        authJoinChatWS(chat_id, this.user.token, socket);
    };
    typingChatWS = (chat_id, socket, isTyping) => {
        authTypingChatWS(chat_id, this.user.token, isTyping, socket);
    };
    postMessageWS = (chat_id, text, type, socket) => {
        authPostMessageWS(chat_id, this.user.token, text, type, socket);
    };
    getMessages = async (chat_id) => {
        runInAction(() => this.gettingChatMessages = true);
        const messages = await authGetMessages(chat_id, this.user.token);
        runInAction(() => this.gettingChatMessages = false);
        if (!messages) {
            return false;
        }
        return messages;
    };
    getUsersChats = async () => {
        runInAction(() => this.gettingUsersChats = true);
        const chats = await authGetUsersChats(this.user.token);
        runInAction(() => this.gettingUsersChats = false);
        if (!chats) {
            return false;
        }
        return chats;
    };
    getUsersDropdown = async (queryItem) => {
        const users = await authGetUsersDropdown(queryItem, this.user.token);
        if (!users) {
            return false;
        }
        return users.filter((user) => user.username !== this.user.username);
    };
    createChat = async (users, chat_name) => {
        const chat = await authCreateChat(users, chat_name, this.user.token);
        if (!chat) {
            return false;
        }
        return chat;
    };
    searchGIFY = async (query) => {
        this.searchedGIFs = await authSearchGIFY(query);
    };

    user = {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        token: '',
    };
    searchedGIFs = [];
    realTime = true;
    typing = false;
    othersTyping = false;
    gettingUsersChats = false;
    gettingChatMessages = false;
}

decorate(Store, {
    user: observable,
    othersTyping: observable,
    searchedGIFs: observable,
    typing: observable,
    realTime: observable,
    gettingUsersChats: observable,
    gettingChatMessages: observable,
    register: action,
    login: action,
    searchGIFY: action,
    hydrateStoreWithLocalStorage: action,
});

export default new Store();