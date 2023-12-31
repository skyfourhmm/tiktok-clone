import Button from "../../Button";
import FooterModal from "../footerModal";
import Input from "../../Input";
import { useState } from "react";
import { CloseEyeIcon, OpentEyeIcon } from "../../Icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { fetchLogin } from "../../../apiServices/userServices.js";

import { UserContext } from "../../../hooks/useContect";
import { useContext } from "react";

function UserModalLogin({ isVisible }) {
  const { login } = useContext(UserContext);

  // const navigate = useNavigate();

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [eye, setEye] = useState(true);
  const [loadingApi, setLoadingApi] = useState(false);
  const [isFailLogin, setIsFailLogin] = useState(false);

  const handleEmailChange = (value) => {
    setEmailValue(value);
  };

  const handlePasswordChange = (value) => {
    setPasswordValue(value);
  };

  // ẩn hiện mật khẩuUse phone / email / username
  const handleEye = () => {
    setEye((prev) => !prev);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    if (!emailValue || !passwordValue) {
      // thông báo
      return;
    }
    setLoadingApi(true);
    let res = await fetchLogin(emailValue, passwordValue);

    if (res && res.meta) {
      localStorage.setItem("token", res.meta.token);
      // navigate("/");
      window.location.reload();
      login(res.data);
    }

    if (res && (res.status === 422 || res.status === 401)) {
      // thông báo lỗi ở đây
      setIsFailLogin(true);
    }
    setLoadingApi(false);
  };

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

        <div className="relative">
          <Input
            placeholder="Password"
            type={eye ? "password" : "text"}
            isFail={isFailLogin}
            onValueChange={handlePasswordChange}
          />
          <div
            className="absolute bottom-[20%] right-6 cursor-pointer"
            onClick={handleEye}
          >
            {eye ? <CloseEyeIcon /> : <OpentEyeIcon />}
          </div>
        </div>

        {isFailLogin && (
          <span className="mt-3 text-lg text-red-400">
            User account or password incorrect
          </span>
        )}
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
          {loadingApi ? (
            <FontAwesomeIcon icon={faCircleNotch} className="animate-spin" />
          ) : (
            "Log in"
          )}
        </Button>
      </div>
      <FooterModal />
    </div>
  );
}

export default UserModalLogin;
