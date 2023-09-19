import Button from "../../Button";
import FooterModal from "../footerModal";
import Input from "../../Input";
import {  useState } from "react";
import { CloseEyeIcon, OpentEyeIcon } from "../../Icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { fetchLogin } from "../../../apiServices/userServices.js";

import { UserContext } from "../../../hooks/useContect";
import { useContext } from "react";

function UserModalLogin({isVisible}) {

  const { login } = useContext(UserContext);


  const navigate = useNavigate()

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [eye, setEye] = useState(true)
  const [loadingApi, setLoadingApi] = useState(false)

  const handleEmailChange = (value) => {
    setEmailValue(value);
  };

  const handlePasswordChange = (value) => {
    setPasswordValue(value);
  };

  // ẩn hiện mật khẩu
  const handleEye = () => {
    setEye(prev => !prev)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {    
      handleLogin();
    }
  }

  const handleLogin = async () => {
    if(!emailValue || !passwordValue) {
      // thông báo
      return
    }
    setLoadingApi(true)
    let res = await fetchLogin(emailValue, passwordValue);

    if(res && res.meta){
      localStorage.setItem("token",res.meta.token)
      localStorage.setItem('nickname', res.data.nickname)
      navigate('/')
      window.location.reload()
      login(res.data)
    }
    
    if(res && res.status === 400) {
      // thông báo lỗi ở đây
    }

    setLoadingApi(false)
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-5xl font-extrabold my-8 select-none cursor-text">
        Log in
      </h2>
      <div className="flex flex-col w-4/5 relative">
        <span>Email or username</span>
        <Input
          placeholder="Email or username"
          type="email"
          onValueChange={handleEmailChange}
        />
        <Input
          placeholder="Password"
          type={eye ? "password":'text'}
          onValueChange={handlePasswordChange}
        />
        <div className="absolute bottom-[51%] right-6 cursor-pointer" onClick={handleEye}>
          {eye ? <CloseEyeIcon/> : <OpentEyeIcon/>}
        </div>
        <span className="my-4 text-lg hover:underline cursor-pointer">
          Forgot password?
        </span>
        <Button
          primary={!!emailValue && !!passwordValue}
          large
          disabled={!(!!emailValue && !!passwordValue)}
          onClick={handleLogin}
          onKeyDown={handleKeyPress}
        >
          {loadingApi ? <FontAwesomeIcon icon={faCircleNotch} className="animate-spin" /> :'Log in'}
        </Button>
      </div>
      <FooterModal />
    </div>
  );
}

export default UserModalLogin;
