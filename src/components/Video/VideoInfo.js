import useElementOnScreen from "../../hooks/useElementOnScreen";
import Menu from "../Popper/Menu";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faCheckCircle,
  faMusic,
  faPause,
  faPlay,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";

import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

function VideoInfo({ items }) {
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

  const handleFollow = () => {
    setFollow((prev) => !prev);
  };

  const handleInteractionHeart = () => {
    setInteractionHeart((prev) => !prev);
  };

  const handleInteractionSave = () => {
    setInteractionSave((prev) => !prev);
  };

  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlayVideo = () => {
    setPlaying((prev) => !prev);
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  };
  const isVisibile = useElementOnScreen(options, videoRef);

  useEffect(() => {
    const handlePlayVideo = () => {
      if (isVisibile) {
        if (!playing) {
          videoRef.current.play();
          setPlaying(true);
        }
      } else {
        if (playing) {
          videoRef.current.pause();
          setPlaying(false);
        }
      }
    };
    handlePlayVideo();
  }, [isVisibile]);

  // handle icon
  const [hidePlay, setHidePlay] = useState(true);
  const handleHidePlay = () => {
    setHidePlay((prev) => !prev);
    handlePlayVideo();
  };

  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    setIsMuted((prevMuted) => !prevMuted);
  };
  useEffect(() => {
    setIsMuted(false);
  }, []);

  return (
    <div className="ml-6 flex items-start">
      <div className="max-w-[500px]">
        <Link to={`/@${items.user.nickname}`}>
          <div className="flex items-center cursor-pointer">
            <h3 className="font-extrabold text-3xl hover:underline">
              {items.user.nickname}
            </h3>
            <span className="pl-2 pr-5 text-2xl">
              {items.user.first_name + items.user.last_name}
            </span>
            {items.user.tick && (
              <FontAwesomeIcon className="text-blue-500" icon={faCheckCircle} />
            )}
          </div>
        </Link>
        <h2 className="">{items.description}</h2>
        <div className="mb-5">
          <FontAwesomeIcon icon={faMusic} />
          <span className="ml-3 cursor-pointer hover:underline text-2xl">
            {items.music}
          </span>
        </div>
        <div className="flex">
          <div className="rounded-2xl relative w-full h-[550px]">
            <video
              ref={videoRef}
              onClick={handlePlayVideo}
              loop
              preload="true"
              autoPlay={true}
              muted={"true"}
              onPlay={() => setHidePlay(true)}
              onPause={() => setHidePlay(false)}
              className="w-full h-full object-cover cursor-pointer rounded-2xl"
            >
              <source src={items.file_url} type={items.meta.mime_type} />
            </video>
            <div
              className="absolute bottom-0 left-0 text-white ml-6 mb-6 cursor-pointer"
              onClick={handleHidePlay}
            >
              {hidePlay && <FontAwesomeIcon icon={faPause} />}
              {!hidePlay && <FontAwesomeIcon icon={faPlay} />}
            </div>
            <div
              className="absolute bottom-0 right-0 text-white mr-6 mb-6 cursor-pointer"
              onClick={toggleMute}
            >
              {isMuted && <FontAwesomeIcon icon={faVolumeXmark} />}
              {!isMuted && <FontAwesomeIcon icon={faVolumeHigh} />}
            </div>
          </div>
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
        </div>
      </div>
      <Button small outline={follow} upload={!follow} onClick={handleFollow}>
        {follow ? "Follow" : "Following"}
      </Button>
    </div>
  );
}

export default VideoInfo;
