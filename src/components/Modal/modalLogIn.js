import { Fragment, useState } from "react";
import Modal from "./index";
import {
  QRIcon,
  FaceBookIcon,
  UserIcon,
  GoogleIcon,
  TwitterIcon,
  InstagramIcon,
  LineIcon,
  KaKaoTalkIcon,
} from "../../../src/components/Icons/index";
import ModalQR from "./ItemModalLogin/modalQr";
import UserModalLogin from "./ItemModalLogin/userModalLogin";
import FooterModal from "./footerModal";

function ModalLogIn({ isVisible, onClose }) {
  const Items_Log = [
    {
      id: 1,
      title: "Use QR code",
      icon: QRIcon,
    },
    {
      id: 2,
      title: "Use phone / email / username",
      icon: UserIcon,
    },
    {
      id: 3,
      title: "Continue with Facebook",
      icon: FaceBookIcon,
    },
    {
      id: 4,
      title: "Continue with Google",
      icon: GoogleIcon,
    },
    {
      id: 5,
      title: "Continue with Twitter",
      icon: TwitterIcon,
    },
    {
      id: 6,
      title: "Continue with Instagram",
      icon: InstagramIcon,
    },
    {
      id: 7,
      title: "Continue with Line",
      icon: LineIcon,
    },
    {
      id: 8,
      title: "Continue with KaKaoTalk",
      icon: KaKaoTalkIcon,
    },
  ];

  const [modalChange, setModalChange] = useState(0);
  const [hideBack, setHideBack] = useState(false);

  const handleChageModal = (item) => {
    setModalChange(item.id);
    setHideBack(true);
  };

  return (
    <Modal
      isVisible={isVisible}
      // onClose={onClose}
      firtPageModal={setModalChange}
      hideback={hideBack}
      sethideback={setHideBack}
    >
      {modalChange === 1 ? (
        <ModalQR />
      ) : modalChange === 2 ? (
        <UserModalLogin />
      ) : (
        <Fragment>
          <div className="flex flex-col items-center overflow-auto h-4/5">
            <h2 className="text-5xl font-extrabold my-8 select-none cursor-text">
              Log in to TikTok
            </h2>
            <div className="w-4/5 flex flex-col">
              {Items_Log.map((item, index) => (
                <div
                  key={item.id}
                  className="flex w-full items-center cursor-pointer border border-gray-200 mb-6 p-5"
                  onClick={() => handleChageModal(item)}
                >
                  <item.icon />
                  <span className="flex-grow text-center">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full flex flex-col items-center relative">
            <div className=" w-4/5 flex flex-col mb-10">
              <span className="text-lg opacity-60 flex-grow text-center select-none cursor-text mb-20 pt-3">
                By continuing, you agree to TikTok's
                <a
                  className="text-black cursor-pointer !important"
                  href="https://www.tiktok.com/legal/page/row/terms-of-service/en"
                >
                  Terms of Service
                </a>
                and confirm that you have read TikTok's{" "}
                <a href="https://www.tiktok.com/legal/page/row/privacy-policy/en">
                  Privacy Policy
                </a>
              </span>
            </div>
            <FooterModal />
          </div>
        </Fragment>
      )}
    </Modal>
  );
}

export default ModalLogIn;
