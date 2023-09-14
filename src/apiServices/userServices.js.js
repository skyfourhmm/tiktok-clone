import instance from "./customizeApi";

const fetchLogin = (email, password) => {
    return instance.post("auth/login", {email, password});
}

const fetchListVideo = (type ='for-you' , page = 3) => {
    return instance.get(`videos?type=${type}&page=${page}`);
}

const fetchUserCurrent = () => {
   return instance.get('auth/me');
}

const fetchListFollow = (page = 1) => {
    return instance.get(`me/followings?page=${page}`)
}

export {fetchLogin, fetchListVideo, fetchUserCurrent, fetchListFollow}