import io from 'socket.io-client';

const BASE_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : 'http://localhost:3001/';
const GIFY_API_KEY = 'dc6zaTOxFJmzC';
const GIFY_API_URL = 'api.giphy.com/v1/gifs/search';

const register = async (user) => {
    const registerURL = BASE_URL + 'auth/register';
    let response = await fetch(registerURL, {
        method: 'POST',
        body: JSON.stringify({user: user}),
        headers: {
            "Content-Type": "application/json",
        }
    });
    response = await response.json();
    if (response.error) {
        return false;
    }
    return response.user;
};

const searchGIFY = async (query) => {
    let response = await fetch(`https://${GIFY_API_URL}?api_key=${GIFY_API_KEY}&q=${query}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
    response = await response.json();
    console.log(response.data);
    return response.data;
};

const login = async (auth) => {
    const loginURL = BASE_URL + 'auth/token';
    let response = await fetch(loginURL, {
        method: 'POST',
        body: JSON.stringify({...auth}),
        headers: {
            "Content-Type": "application/json",
        }
    });
    response = await response.json();
    if (response.error) {
        return false;
    }
    return response.user;
};

const getMessages = async (chat_id, token) => {
    const chatURL = BASE_URL + 'chats/messages/' + chat_id;
    let response = await fetch(chatURL, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "token": token,
        }
    });
    response = await response.json();
    if (response.error) {
        return false;
    }
    return response;
};
const getUsersChats = async (token) => {
    const chatURL = BASE_URL + 'chats/user';
    let response = await fetch(chatURL, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "token": token,
        }
    });
    response = await response.json();
    if (response.error) {
        return false;
    }
    return response;
};
const joinChatWS = (chat_id, token, socket) => {
    console.log('join_sent');
    socket.emit('join', {token, chat_id});
};
const typingChatWS = (chat_id, token, isTyping, socket) => {
    console.log('typing_notif_sent');
    socket.emit('typing', {token, chat_id, isTyping});
};
const postMessageWS = (chat_id, token, text, type, socket) => {
    console.log('message_sent');
    socket.emit('chat_message', {token, text, chat_id, type});
};
const postMessage = async (chat_id, token, text, type) => {
    const chatURL = BASE_URL + 'chats/message/' + chat_id;
    let response = await fetch(chatURL, {
        method: 'POST',
        body: JSON.stringify({text, type}),
        headers: {
            "Content-Type": "application/json",
            "token": token,
        }
    });
    response = await response.json();
    if (response.error) {
        return false;
    }
    return response;
};
const getUsersDropdown = async (queryItem, token) => {
    const usersURL = BASE_URL + `users?queryItem=${queryItem}`;
    let response = await fetch(usersURL, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "token": token,
        }
    });
    response = await response.json();
    if (response.error) {
        return false;
    }
    return response;
};
const createChat = async (chat_users, chat_name, token) => {
    const usersURL = BASE_URL + `chats/new`;
    let response = await fetch(usersURL, {
        method: 'POST',
        body: JSON.stringify({chat_name, chat_users}),
        headers: {
            "Content-Type": "application/json",
            "token": token,
        }
    });
    response = await response.json();
    if (response.error) {
        return false;
    }
    return response;
};
const editChat = async (chat_users, chat_name, chat_id, token) => {
    const chatURL = BASE_URL + `chats/edit/${chat_id}`;
    let response = await fetch(chatURL, {
        method: 'POST',
        body: JSON.stringify({chat_name, chat_users}),
        headers: {
            "Content-Type": "application/json",
            "token": token,
        }
    });
    response = await response.json();
    if (response.error) {
        return false;
    }
    return response;
};
const deleteChat = async (chat_id, token) => {
    const chatURL = BASE_URL + `chats/delete/${chat_id}`;
    let response = await fetch(chatURL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "token": token,
        }
    });
    response = await response.json();
    if (response.error) {
        return false;
    }
    return response;
};
const getAllPostsAllGroupsForUser = async (token) => {
    const usersURL = BASE_URL + `groups/user/allposts`;
    let response = await fetch(usersURL, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "token": token,
        }
    });
    response = await response.json();
    if (response.error) {
        return false;
    }
    return response;
};
const getGroupInfo = async (group_id, token) => {
    const groupURL = BASE_URL + `groups/${group_id}`;
    let response = await fetch(groupURL, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "token": token,
        }
    });
    response = await response.json();
    if (response.error) {
        return false;
    }
    return response;
};
const getAllPostsForGroup = async (group_id, token) => {
    const groupURL = BASE_URL + `groups/posts/${group_id}`;
    let response = await fetch(groupURL, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "token": token,
        }
    });
    response = await response.json();
    if (response.error) {
        return false;
    }
    return response;
};

const addPost = async (group_id, text, token) => {
    const chatURL = BASE_URL + `groups/post/${group_id}`;
    let response = await fetch(chatURL, {
        method: 'POST',
        body: JSON.stringify({text}),
        headers: {
            "Content-Type": "application/json",
            "token": token,
        }
    });
    response = await response.json();
    if (response.error) {
        return false;
    }
    return response;
};

const getUsersInChat = async (chat_id, token) => {
    const usersURL = BASE_URL + `chats/users/${chat_id}`;
    let response = await fetch(usersURL, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "token": token,
        }
    });
    response = await response.json();
    if (response.error) {
        return false;
    }
    return response;
};
const socket = io(BASE_URL);
export {
    socket,
    register,
    login,
    getMessages,
    postMessage,
    postMessageWS,
    joinChatWS,
    typingChatWS,
    getUsersChats,
    getUsersDropdown,
    createChat,
    searchGIFY,
    getUsersInChat,
    editChat,
    deleteChat,
    getAllPostsAllGroupsForUser,
    getGroupInfo,
    getAllPostsForGroup,
    addPost,
}