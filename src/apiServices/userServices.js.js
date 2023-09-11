import instance from "./customizeApi";

const fetchLogin = (email, password) => {
    return instance.post("auth/login", {email, password});
}

const fetchListVideo = (type ='for-you' , page = 3) => {
    return instance.get(`videos?type=for-you&page=${page}`, {type , page});
}

export {fetchLogin, fetchListVideo}