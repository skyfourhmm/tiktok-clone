import instance from "./customizeApi";

const fetchLogin = (email, password) => {
    return instance.post("auth/login", {email, password});
}

const fetchListVideo = (type ='for-you' , page = 5) => {
    return instance.get(`videos?type=${type}&page=${page}`);
}

export {fetchLogin, fetchListVideo}