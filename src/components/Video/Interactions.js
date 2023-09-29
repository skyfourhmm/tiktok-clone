import { useContext, useState } from "react";

import Menu from "../Popper/Menu";
import {
  HeartIcon,
  CommentIcon,
  ShareIcon,
  EmbedIcon,
  SendIcon,
  FaceBookIcon,
  WhatsAppIcon,
  CoppyLinkIcon,
  TwitterIcon,
  LinkInIcon,
  RedditIcon,
  TelegramIcon,
} from "../Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../hooks/useContect";

import { openModalLogin } from "../../redux/action";
import { store } from "../../redux/store";

function Interactions({ items }) {
  const { user } = useContext(UserContext);

  const MENU_ITEM = [
    {
      icon: <EmbedIcon />,
      title: "Embed",
    },
    {
      icon: <SendIcon />,
      title: "Send to Friends",
    },
    {
      icon: <FaceBookIcon width="26" height="26" />,
      title: "Share to Facebook",
    },
    {
      icon: <WhatsAppIcon />,
      title: "Share to WhatsApp",
    },
    {
      icon: <CoppyLinkIcon />,
      title: "Coppy link",
    },
    {
      icon: <TwitterIcon width="26" height="26" />,
      title: "Share to Twitter",
    },
    {
      icon: <LinkInIcon />,
      title: "Share to Linkedin",
    },
    {
      icon: <RedditIcon />,
      title: "Share to Reddit",
    },
    {
      icon: <TelegramIcon />,
      title: "Share to Telegram",
    },
  ];

  const [interactionHeart, setInteractionHeart] = useState(false);
  const [interactionSave, setInteractionSave] = useState(false);

  const handleInteractionHeart = () => {
    if (user.auth) {
      setInteractionHeart((prev) => !prev);
    } else {
      store.dispatch(openModalLogin());
    }
  };

  const handleInteractionSave = () => {
    if (user.auth) {
      setInteractionSave((prev) => !prev);
    } else {
      store.dispatch(openModalLogin());
    }
  };

  return (
    <div className="justify-end flex flex-col pl-6">
      <div className="flex flex-col items-center mt-6">
        <button
          className="p-3 bg-gray-200 rounded-full mb-3"
          onClick={handleInteractionHeart}
        >
          <HeartIcon className={interactionHeart ? "text-red-500" : ""} />
        </button>
        <span>{items.likes_count}</span>
      </div>
      <div className="flex flex-col items-center mt-6">
        <button className="p-3 bg-gray-200 rounded-full mb-3">
          <CommentIcon data={items} />
        </button>
        <span>{items.comments_count}</span>
      </div>
      <div className="flex flex-col items-center mt-6">
        <button
          className="p-3 bg-gray-200 rounded-full mb-3"
          onClick={handleInteractionSave}
        >
          <FontAwesomeIcon
            className={
              interactionSave
                ? "text-yellow-400 w-[25px] h-[25px]"
                : "w-[25px] h-[25px]"
            }
            icon={faBookmark}
          />
        </button>
        <span>0</span>
      </div>
      <Menu items={MENU_ITEM}>
        <div className="flex flex-col items-center mt-6">
          <button className="p-3 bg-gray-200 rounded-full mb-3">
            <ShareIcon />
          </button>
          <span>{items.shares_count}</span>
        </div>
      </Menu>
    </div>
  );
}

export default Interactions;
