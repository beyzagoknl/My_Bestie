export const url = process.env.REACT_APP_API_URL;
let user = JSON.parse(localStorage.getItem("user"));
let token = null;

if (user != null) token = user.accessToken;

export const setHeaders = () => ({ Authorization: `Bearer: ${token}` });
