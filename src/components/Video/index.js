import Image from "../Image";
import React, { useEffect, useState, useRef } from "react";
import { fetchListVideo } from "../../apiServices/userServices.js";
import VideoInfor from './VideoInfo'


function Video() {
  const [listVideo, setListVideo] = useState([]);

  // ấn xuống sẽ thực hiện scroll theo
  useEffect(() => {
    document.getElementById("focus").focus();
  }, []);


  const [currentPage, setCurrentPage] = useState(1)

  // lấy data video
  useEffect(() => {
    const handleRenderListVideo = async () => {
      let res = await fetchListVideo('for-you', 1);
      setListVideo(res);
    };
    handleRenderListVideo();
  }, []);

  const getVideo = () => {
    setCurrentPage(prev => prev+1)
  }

  //  xem cuối màng hình 
  function checkIfUserScrolledToBottom() {
    // Lấy chiều cao tổng của văn bản và phần trượt của người dùng
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrolledToBottom = window.scrollY + windowHeight === documentHeight;

    // Kiểm tra xem người dùng đã lướt tới cuối màn hình hay chưa
    if(scrolledToBottom) {
        // Gọi hàm tại đây nếu người dùng đã lướt tới cuối màn hình
        getVideo()
        console.log(123)
    }
}

  // Gọi hàm kiểm tra mỗi khi người dùng cuộn trang
    window.addEventListener('scroll', checkIfUserScrolledToBottom);

  return (
    <div id="focus" className="ml-[111px]">
      {listVideo.data &&
        listVideo.data.map((items, index) => (
          <div key={items.id} className="flex mb-28 ">
            <Image large src={items.user.avatar} />
            <VideoInfor items={items}/>
          </div>
        ))}
    </div>
  );
}

export default Video;
