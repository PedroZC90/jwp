const TOKEN_KEY = "token";

class AuthenticationService {

    getToken = () => {
        return localStorage.getItem(TOKEN_KEY);
    }

    setToken = (token) => {
        localStorage.setItem(TOKEN_KEY, token);
    }

    isLoggedIn = () => {
        const token = this.getToken();
        return (typeof token === "string" && token.length > 0);
    }

}

const AuthService = new AuthenticationService();

export default AuthService;
