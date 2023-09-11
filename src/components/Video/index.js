import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faCheckCircle,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

import Image from "../Image";
import Button from "../Button";
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
import React, { useEffect, useState, useRef } from "react";
import useElementOnScreen from "../../hooks/useElementOnScreen";
import Menu from "../Popper/Menu";
import { fetchListVideo } from "../../apiServices/userServices.js";

function Video() {
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

  const [follow, setFollow] = useState(true);
  const [interactionHeart, setInteractionHeart] = useState(false);
  const [interactionSave, setInteractionSave] = useState(false);
  const [listVideo, setListVideo] = useState([]);

  const handleFollow = () => {
    setFollow((prev) => !prev);
  };

  const handleInteractionHeart = () => {
    setInteractionHeart((prev) => !prev);
  };

  const handleInteractionSave = () => {
    setInteractionSave((prev) => !prev);
  };

  // ấn xuống sẽ thực hiện scroll theo
  useEffect(() => {
    document.getElementById("focus").focus();
  }, []);

  // handle video
  const [playing, setPlaying] = useState(false)

  const handlePlayVideo = (event) => {
 
    const video = event.target;
    setPlaying( prev => !prev)
    if(playing) {
      video.pause()
    } else {
      video.play()
    }
  };

  const videoRef = useRef()


  // lấy data video
  useEffect(() => {
    const handleRenderListVideo = async () => {
      let res = await fetchListVideo();
      setListVideo(res);
    };
    handleRenderListVideo();
  }, []);

  return (
    <div id="focus" className="ml-[111px]">
      {listVideo.data &&
        listVideo.data.map((items, index) => (
          <div key={items.id} className="flex mb-28 ">
            <Image large src={items.user.avatar} />
            <div className="ml-6 flex items-start">
              <div className="max-w-[500px]">
                <div className="flex items-center cursor-pointer">
                  <h3 className="font-extrabold text-3xl hover:underline">
                    {items.user.nickname}
                  </h3>
                  <span className="pl-2 pr-5 text-2xl">
                    {items.user.first_name + items.user.last_name}
                  </span>
                  {items.user.tick && (
                    <FontAwesomeIcon
                      className="text-blue-500"
                      icon={faCheckCircle}
                    />
                  )}
                </div>
                <h2 className="">{items.description}</h2>
                <div className="mb-5">
                  <FontAwesomeIcon icon={faMusic} />
                  <span className="ml-3 cursor-pointer hover:underline text-2xl">
                    {items.music}
                  </span>
                </div>
                <div className="h-[550px] flex">
                  <div className="overflow-hidden rounded-2xl">
                    <video
                      ref={videoRef}
                      key={index}
                      onClick={handlePlayVideo}
                      className="h-full w-full cursor-pointer"
                    >
                      <source
                        src={items.file_url}
                        type={items.meta.mime_type}
                      />
                    </video>
                  </div>
                  <div className="justify-end flex flex-col pl-6">
                    <div className="flex flex-col items-center mt-6">
                      <button
                        className="p-3 bg-gray-200 rounded-full mb-3"
                        onClick={handleInteractionHeart}
                      >
                        <HeartIcon
                          className={interactionHeart ? "text-red-500" : ""}
                        />
                      </button>
                      <span>{items.likes_count}</span>
                    </div>
                    <div className="flex flex-col items-center mt-6">
                      <button className="p-3 bg-gray-200 rounded-full mb-3">
                        <CommentIcon />
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
                </div>
              </div>
              <Button
                small
                outline={follow}
                upload={!follow}
                onClick={handleFollow}
              >
                {follow ? "Follow" : "Following"}
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Video;
