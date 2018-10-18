const BASE_URL = 'BASE_URL' in process.env ? process.env.BASE_URL : 'http://localhost:3001/';

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
    console.log(response);
};

export {register}