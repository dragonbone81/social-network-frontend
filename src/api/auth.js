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

export {register, login}