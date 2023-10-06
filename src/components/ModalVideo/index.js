import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonCircle from "../components/ButtonCircle";
import { ArrowDown, CloseIcon, FlagIcon } from "../components/Icons";
import VideoContent from "../components/Video/VideoContent";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Videos({ items }) {
  console.log(items);

  return (
    <div className="flex h-screen">
      <div className="basis-2/3 relative">
        <img
          className="h-full w-full"
          src="https://files.fullstack.edu.vn/f8-tiktok/videos/3096-65084c9a6fb62.jpg"
        />
        <div className="w-full h-full z-10 absolute top-0 left-0 backdrop-blur-md bg-black/80 "></div>
        {/* <video controls className="w-full absolute h-full top-0 z-20">
            <source
              src="https://files.fullstack.edu.vn/f8-tiktok/videos/3056-64f4e9e4382a8.mp4"
              type="video/mp4"
            />
        </video> */}
        <VideoContent inside />
        <div className="absolute top-0 z-30 flex justify-between w-full px-4 mt-6">
          <ButtonCircle leftIcon={<CloseIcon />}></ButtonCircle>
          <ButtonCircle leftIcon={<FlagIcon width="16" height="16" />}>
            Report
          </ButtonCircle>
        </div>
        <div className="absolute top-1/2 right-0 z-30 pr-3 -translate-y-40">
          <ButtonCircle
            leftIcon={
              <ArrowDown className="rotate-180" width="30" height="30" />
            }
          ></ButtonCircle>
          <div className="h-6"></div>
          <ButtonCircle
            leftIcon={<ArrowDown width="30" height="30" />}
          ></ButtonCircle>
        </div>
      </div>
      <div className="basis-1/3 bg-white">navigate</div>
    </div>
  );
}

export default Videos;
