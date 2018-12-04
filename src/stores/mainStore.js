import {observable, action, decorate, runInAction} from "mobx";
import {
    register as authRegister,
    login as authLogin,
    getMessages as authGetMessages,
    postMessage as authPostMessage,
    postMessageWS as authPostMessageWS,
    addPostGroupWS as authAddPostGroupWS,
    typingChatWS as authTypingChatWS,
    joinGroupWS as authJoinGroupWS,
    joinChatWS as authJoinChatWS,
    leaveChatWS as authLeaveChatWS,
    leaveGroupWS as authLeaveGroupWS,
    getUsersChats as authGetUsersChats,
    getUsersDropdown as authGetUsersDropdown,
    createChat as authCreateChat,
    createGroup as authCreateGroup,
    searchGIFY as authSearchGIFY,
    getUsersInChat as authGetUsersInChat,
    editChat as authEditChat,
    deleteChat as authDeleteChat,
    getAllPostsAllGroupsForUser as authGetAllPostsAllGroupsForUser,
    getGroupInfo as authGetGroupInfo,
    getLikesOnPost as authGetLikesOnPost,
    getAllPostsForGroup as authGetAllPostsForGroup,
    addPost as authAddPost,
    addLike as authAddLike,
    deleteLike as authDeleteLike,
    getGroupsForUser as authGetGroupsForUser,
    socket as authSocket,
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
    addPostGroupWS = (group_id, text) => {
        authAddPostGroupWS(group_id, this.user.token, text, this.socket);
    };
    addPost = async (group_id, text) => {
        const post = await authAddPost(group_id, text, this.user.token);
        if (!post) {
            return false;
        }
        return post;
    };
    addLike = async (group_id, post_id) => {
        const like = await authAddLike(group_id, post_id, this.user.token);
        if (!like) {
            return false;
        }
        return like;
    };
    deleteLike = async (group_id, post_id) => {
        const like = await authDeleteLike(group_id, post_id, this.user.token);
        if (!like) {
            return false;
        }
        return like;
    };
    joinChatWS = (chat_id) => {
        authJoinChatWS(chat_id, this.user.token, this.socket);
    };
    leaveChatWS = (chat_id) => {
        authLeaveChatWS(chat_id, this.user.token, this.socket);
    };
    leaveGroupWS = (group_id) => {
        authLeaveGroupWS(group_id, this.user.token, this.socket);
    };
    joinGroupWS = (group_id) => {
        authJoinGroupWS(group_id, this.user.token, this.socket);
    };
    typingChatWS = (chat_id, isTyping) => {
        authTypingChatWS(chat_id, this.user.token, isTyping, this.socket);
    };
    postMessageWS = (chat_id, text, type) => {
        authPostMessageWS(chat_id, this.user.token, text, type, this.socket);
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
        return users;
    };
    createChat = async (users, chat_name) => {
        const chat = await authCreateChat(users, chat_name, this.user.token);
        if (!chat) {
            return false;
        }
        return chat;
    };
    createGroup = async (users, group_name) => {
        const group = await authCreateGroup(users, group_name, this.user.token);
        if (!group) {
            return false;
        }
        return group;
    };
    editChat = async (users, chat_name, chat_id) => {
        const chat = await authEditChat(users, chat_name, chat_id, this.user.token);
        if (!chat) {
            return false;
        }
        return chat;
    };
    deleteChat = async (chat_id) => {
        const chat = await authDeleteChat(chat_id, this.user.token);
        if (!chat) {
            return false;
        }
        return chat;
    };
    searchGIFY = async (query) => {
        this.searchedGIFs = await authSearchGIFY(query);
    };
    getUsersInChat = async (chat_id) => {
        const users = await authGetUsersInChat(chat_id, this.user.token);
        if (!users) {
            return false;
        }
        return users;
    };
    getAllPostsAllGroupsForUser = async () => {
        const posts = await authGetAllPostsAllGroupsForUser(this.user.token);
        if (!posts) {
            return false;
        }
        return posts;
    };
    getGroupInfo = async (group_id) => {
        const group = await authGetGroupInfo(group_id, this.user.token);
        if (!group) {
            return false;
        }
        return group;
    };
    getLikesOnPost = async (group_id, post_id) => {
        const likes = await authGetLikesOnPost(group_id, post_id, this.user.token);
        if (!likes) {
            return false;
        }
        return likes;
    };
    getAllPostsForGroup = async (group_id) => {
        const posts = await authGetAllPostsForGroup(group_id, this.user.token);
        if (!posts) {
            return false;
        }
        return posts;
    };
    getGroupsForUser = async () => {
        const groups = await authGetGroupsForUser(this.user.token);
        if (!groups) {
            return false;
        }
        return groups;
    };

    user = {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        token: '',
    };
    socket = authSocket;
    searchedGIFs = [];
    realTime = true;
    typing = false;
    othersTyping = false;
    gettingUsersChats = false;
    gettingChatMessages = false;
}

decorate(Store, {
    user: observable,
    socket: observable,
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