import {observable, decorate, runInAction} from "mobx";
import {register as authRegister, login as authLogin} from '../api/auth';

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
});

export default new Store();