import image from "../../../assets/images/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faEllipsisVertical,
  faLanguage,
  faCircleQuestion,
  faKeyboard,
  faCircleHalfStroke,
  faCoins,
  faGear,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  MessageIcon,
  InboxIcon,
} from "../../../../src/components/Icons/index.js";

import React, { Fragment, useState, useContext } from "react";
import { UserContext } from "../../../hooks/useContect.js";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import Button from "../../../components/Button/index.js";
import Menu from "../../../components/Popper/Menu/index.js";
import Image from "../../../components/Image/index.js";
import Notifications from "../../../components/Notifications/index.js";
import Search from "../Search/index.js";
import config from "../../../config";
import ModalLogIn from "../../../components/Modal/modalLogIn.js";
import { store } from "../../../redux/store.js";
import { openModalLogin } from "../../../redux/action.js";
import { connect } from "react-redux";

function Header() {
  const { user } = useContext(UserContext);
  let token = localStorage.getItem("token");

  const MENU_ITEM = [
    {
      icon: <FontAwesomeIcon icon={faLanguage} />,
      title: "English",
      children: {
        title: "Language",
        data: [
          {
            code: "vn",
            title: "Việt Nam",
          },
          {
            code: "en",
            title: "English",
          },
          {
            code: "cn",
            title: "China",
          },
        ],
      },
    },
    {
      icon: <FontAwesomeIcon icon={faCircleQuestion} />,
      title: "Feedback and help",
      to: "/feedback",
    },
    {
      icon: <FontAwesomeIcon icon={faKeyboard} />,
      title: "Keyboard shortcuts",
    },
    {
      icon: <FontAwesomeIcon icon={faCircleHalfStroke} />,
      title: "Dark mode",
    },
  ];

  const Menu_User = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: "View Profile",
      type: "profile",
    },
    {
      icon: <FontAwesomeIcon icon={faBookmark} />,
      title: "Favorites",
      to: "/favorites",
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: "Get Coins",
      to: "/coin",
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: "Settings",
      to: "/settings",
    },
    ...MENU_ITEM,
    {
      icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
      title: "Log Out",
      separation: true,
    },
  ];

  // const currentUser = true;

  const [datafromMenu, setDatafromMenu] = useState(false);
  const sendCurrentUser = (data) => {
    setDatafromMenu(data);
  };

  // lấy dữ liệu xem có dữ liệu hay ko

  let avatar;
  if (user.data.data && user.data.data.avatar) {
    avatar = user.data.data.avatar;
  }
  // xử lý ẩn hiện modal
  const [showModal, setShowModal] = useState(true);

  // show modal login
  const handleShowModelLogin = () => {
    store.dispatch(openModalLogin());
  };

  return (
    <Fragment>
      <div className="h-24 shadow-sm my-0 fixed inset-x-0 top-0 bg-white z-20">
        <div className="flex px-16 justify-between items-center">
          <Link to={config.routers.home}>
            <img src={image.logo} />
          </Link>
          {/* search */}
          <Search />
          <div className="flex items-center">
            {token ? (
              <>
                <Button upload leftIcon={<FontAwesomeIcon icon={faUpload} />}>
                  Up load
                </Button>
                <Tippy content="Messages">
                  <button className="ml-8 text-4xl">
                    <MessageIcon />
                  </button>
                </Tippy>
                <Tippy content="Inbox">
                  <button className="ml-8 text-4xl mr-8 relative">
                    <InboxIcon />
                    <Notifications data={[1, 2, 3, 4]} />
                  </button>
                </Tippy>
                <Menu items={Menu_User} sendCurrentUser={sendCurrentUser}>
                  <Image alt={user.data.email} src={avatar} small />
                </Menu>
              </>
            ) : (
              <>
                <Button
                  upload
                  leftIcon={<FontAwesomeIcon icon={faUpload} />}
                  onClick={handleShowModelLogin}
                >
                  Up load
                </Button>
                <Button primary onClick={handleShowModelLogin}>
                  Log in
                </Button>

                <Menu items={MENU_ITEM}>
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    className="pl-9 text-4xl cursor-pointer"
                  />
                </Menu>
              </>
            )}
          </div>
        </div>
      </div>

      {/* <ModalLogIn isVisible={showModal} onClose={() => setShowModal(false)}/> */}
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    isVisible: state.status,
  };
};

export default connect(mapStateToProps)(Header);
