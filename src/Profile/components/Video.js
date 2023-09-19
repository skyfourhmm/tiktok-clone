import { useRef } from "react";

function Video({items}) {

    const videoRef = useRef(null);

    const handleMouseEnter = () => {
        videoRef.current.play(); // Bắt đầu phát video khi hover vào
    };

    const handleMouseLeave = () => {
        videoRef.current.pause(); // Dừng video khi rời khỏi
        videoRef.current.currentTime = 0
    };

    return (
        <div key={items.id} className=" w-full h-[290px] ml-5">
            <video
              className="h-full object-cover rounded-2xl cursor-pointer"
              autoPlay={false}
              ref={videoRef}
              muted
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              loop
              playsInline
            >
              <source src={items.file_url} />
            </video>
          </div>
    );
}

export default Video;