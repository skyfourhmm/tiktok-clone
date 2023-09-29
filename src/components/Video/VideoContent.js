import { useRef, useState, useEffect } from "react";
import useElementOnScreen from "../../hooks/useElementOnScreen";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPlay,
  faVolumeXmark,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import ButtonCircle from "../ButtonCircle";

function VideoContent({ items, inside }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [showModalVideo, setShowModalVideo] = useState(false);

  const handlePlayVideo = () => {
    try {
      setPlaying((prev) => !prev);
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    } catch (error) {
      if (
        error.message ===
        "The play() request was interrupted by a call to pause()."
      ) {
        console.log(error.message);
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
        if (
          error.message ===
          "The play() request was interrupted by a call to pause()."
        ) {
          console.log(error.message);
        }
      }
    };
    handlePlayVideo();
  }, [isVisibile]);

  // handle icon
  const [hidePlay, setHidePlay] = useState(true);

  const handleHidePlay = () => {
    // togglePlay(hidePlay);
    setHidePlay((prev) => !prev);
    return handlePlayVideo();
  };

  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    setIsMuted((prevMuted) => !prevMuted);
  };

  return (
    <>
      <video
        ref={videoRef}
        onClick={handlePlayVideo}
        loop
        preload="auto"
        autoPlay={true}
        muted={isMuted}
        onPlay={() => setHidePlay(true)}
        onPause={() => setHidePlay(false)}
        className={
          inside
            ? "w-full absolute h-full top-0 z-20 cursor-pointer"
            : "w-full h-full object-cover cursor-pointer rounded-2xl"
        }
      >
        {/* items?.file_url ||  */}
        {/* items?.meta.mime_type */}
        <source src={items?.file_url} type={items?.meta.mime_type} />
      </video>

      {inside ? (
        <>
          {!hidePlay && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-white text-9xl">
              <FontAwesomeIcon icon={faPlay} />
            </div>
          )}

          <div
            className="absolute bottom-0 right-0 text-white mr-6 mb-6 cursor-pointer z-30"
            onClick={() => toggleMute()}
          >
            <ButtonCircle
              leftIcon={
                isMuted && (
                  <FontAwesomeIcon className="text-4xl" icon={faVolumeXmark} />
                )
              }
              rightIcon={
                !isMuted && (
                  <FontAwesomeIcon className="text-4xl" icon={faVolumeHigh} />
                )
              }
            ></ButtonCircle>
          </div>
        </>
      ) : (
        <>
          <div
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
          </div>
        </>
      )}
    </>
  );
}

export default VideoContent;
