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
import {
  faBookmark,
  faUser
} from "@fortawesome/free-regular-svg-icons";
import {MessageIcon, InboxIcon} from "../../../../src/components/Icons/index.js";

import React, {  Fragment, useState } from "react";
import {Link} from 'react-router-dom'
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css'; 

import Button from "../../../components/Button/index.js";
import Menu from "../../../components/Popper/Menu/index.js";
import Image from "../../../components/Image/index.js";
import Notifications from "../../../components/Notifications/index.js";
import Search from "../Search/index.js";
import config from "../../../config";
import ModalLogIn from "../../../components/Modal/modalLogIn.js";


function Header() {
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
          }
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
      to: "/userPage",
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
      separation: true
    },
  ]

  // const currentUser = true;

  const [datafromMenu, setDatafromMenu] = useState(false)
  const sendCurrentUser = (data) => {
    setDatafromMenu(data)
  }

  // xử lý ẩn hiện modal 
  const [showModal, setShowModal] = useState(true)

  return (
    <Fragment>
    <div className="h-24 shadow-sm my-0 fixed inset-x-0 top-0 bg-white z-20">
      <div className="flex px-16 justify-between items-center">
        <Link to={config.routers.home}>
          <img src={image.logo} />
        </Link>
        {/* search */}
        <Search/>
        <div className="flex items-center">
          {datafromMenu ? (
            <>
              <Button upload leftIcon={<FontAwesomeIcon icon={faUpload} />}>
                Up load
              </Button>
              <Tippy content="Messages">
                <button className="ml-8 text-4xl"><MessageIcon/></button>
              </Tippy>
              <Tippy content="Inbox">
                <button className="ml-8 text-4xl mr-8 relative"><InboxIcon/><Notifications data={[1,2,3,4]}/></button>
              </Tippy>
              <Menu items={Menu_User} sendCurrentUser = {sendCurrentUser}>
                  <Image
                    alt={'nguyen van a'}
                    src = {'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/ec3bd3ac8f4db529e561d674fff49765~c5_100x100.jpeg?x-expires=1691398800&x-signature=X5qG%2FTdrswkmyZ9KtxOw8pTzFcE%3D'}
                    small
                  />
              </Menu>
            </>
          ) : (
            <>
              <Button upload leftIcon={<FontAwesomeIcon icon={faUpload} />} onClick={() => setShowModal(true)}>Up load</Button>
              <Button primary onClick={() => setShowModal(true)}>Log in</Button>

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

    <ModalLogIn isVisible={showModal} onClose={() => setShowModal(false)}/>
    </Fragment>
  );
}

export default Header;
