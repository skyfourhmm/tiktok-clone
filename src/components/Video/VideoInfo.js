import useElementOnScreen from "../../hooks/useElementOnScreen";
import Interactions from "./Interactions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faMusic,
  faPause,
  faPlay,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";

import { useRef, useState, useEffect } from "react";
import { Link  } from "react-router-dom";
import ButtonFollow from "../ButtonFollow";
import Videos from '../../Videos/index'
import AccountItem from "../AccountItem/AccountItem";
import VideoContent from "./VideoContent";

function VideoInfo({ items }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  // const history = useHistory();

  const handlePlayVideo = () => {
    // history.push('videos', { data: items });
    try {
      setPlaying((prev) => !prev);
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    } catch (error) {
      if(error.message === "The play() request was interrupted by a call to pause().") {
        console.log(error.message)
      }
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
      try {
        if (isVisibile) {
          if (!playing) {
            videoRef.current.play();
            setPlaying(true);
            toggleMute();
          }
        } else {
          if (playing) {
            videoRef.current.pause();
            setPlaying(false);
            toggleMute();
          }
        }
      } catch (error) {
        if(error.message === "The play() request was interrupted by a call to pause().") {
          console.log(error.message)
        }
      }
    };
    handlePlayVideo();
  }, [isVisibile]);

  // handle icon
  const [hidePlay, setHidePlay] = useState(true);
  const handleHidePlay = () => {
    setHidePlay((prev) => !prev);
    return handlePlayVideo();
  };

  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    setIsMuted((prevMuted) => !prevMuted);
  };

  return (
    <>
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
                <FontAwesomeIcon
                  className="text-blue-500"
                  icon={faCheckCircle}
                />
              )}
            </div>
          </Link>
          {/* <AccountItem data={items.user}/> */}
          <h2 className="">{items.description}</h2>
          <div className="mb-5">
            <FontAwesomeIcon icon={faMusic} />
            <span className="ml-3 cursor-pointer hover:underline text-2xl">
              {items.music}
            </span>
          </div>
          <div className="flex">
            <div className="rounded-2xl relative w-full h-[550px]">
              {/* <video
                key={items.id}
                ref={videoRef}
                onClick={handlePlayVideo}
                loop
                preload="auto"
                autoPlay={true}
                muted={isMuted}
                onPlay={() => setHidePlay(true)}
                onPause={() => setHidePlay(false)}
                className="w-full h-full object-cover cursor-pointer rounded-2xl"
              >
                <source src={items.file_url} type={items.meta.mime_type} />
              </video> */}
              <VideoContent items={items} />
              {/* <div
                className="absolute bottom-0 left-0 text-white ml-6 mb-6 cursor-pointer"
                onClick={handleHidePlay}
              >
                {hidePlay && <FontAwesomeIcon icon={faPause} />}
                {!hidePlay && <FontAwesomeIcon icon={faPlay} />}
              </div>
              <div
                className="absolute bottom-0 right-0 text-white mr-6 mb-6 cursor-pointer"
                onClick={() => toggleMute()}
              >
                {isMuted && <FontAwesomeIcon icon={faVolumeXmark} />}
                {!isMuted && <FontAwesomeIcon icon={faVolumeHigh} />}
              </div> */}
            </div>
            <Interactions items={items} />
          </div>
        </div>
        <ButtonFollow
          followed={items.user.is_followed}
          userID={items.user_id}
        />
      </div>
    </>
  );
}

export default VideoInfo;
