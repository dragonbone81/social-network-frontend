const BASE_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : 'http://localhost:3001/';

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
const postMessage = async (chat_id, token, text) => {
    const chatURL = BASE_URL + 'chats/message/' + chat_id;
    let response = await fetch(chatURL, {
        method: 'POST',
        body: JSON.stringify({text: text}),
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

export {register, login, getMessages, postMessage, getUsersChats}