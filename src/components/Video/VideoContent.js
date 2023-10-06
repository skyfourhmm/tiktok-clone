import { useRef, useState, useEffect } from "react";
import useElementOnScreen from "../../hooks/useElementOnScreen";

import ButtonCircle from "../ButtonCircle";
import { MutedIcon, PauseIcon, PlayIcon, UnMutedIcon } from "../Icons";

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
      this.setState({ error });
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
        this.setState({ error });
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
              <PlayIcon />
            </div>
          )}

          <div
            className="absolute bottom-0 right-0 text-white mr-6 mb-6 cursor-pointer z-30"
            onClick={() => toggleMute()}
          >
            <ButtonCircle
              leftIcon={
                isMuted && (
                  <MutedIcon />
                  // <FontAwesomeIcon className="text-4xl" icon={faVolumeXmark} />
                )
              }
              rightIcon={
                !isMuted && (
                  <UnMutedIcon />
                  // <FontAwesomeIcon className="text-4xl" icon={faVolumeHigh} />
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
            {hidePlay && <PlayIcon />}
            {!hidePlay && <PauseIcon />}
          </div>
          <div
            className="absolute bottom-0 right-0 text-white mr-6 mb-6 cursor-pointer"
            onClick={() => toggleMute()}
          >
            {isMuted && <MutedIcon />}
            {!isMuted && <UnMutedIcon />}
          </div>
        </>
      )}
    </>
  );
}

export default VideoContent;
