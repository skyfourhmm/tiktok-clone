import { useEffect, useState } from "react";
import { fetchAnUser } from "../apiServices/userServices.js";
import HeaderProfile from "./components/HeaderProfile";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import Video from "./components/Video.js";
import { UserIcon } from "../components/Icons/index";

function Profile() {
  const location = useLocation();
  const [dataUser, setDataUser] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchData() {
      try {
        let res = await fetchAnUser(location.pathname);
        if (res && res.data) {
          setDataUser(res);
        }
      } catch {
        console.log("loi");
      }
    }
    fetchData();
  }, [location.pathname]);


  const renderVideo = () => {
    if (dataUser && dataUser.data) {
      if (dataUser.data.videos && dataUser.data.videos.length > 0) {
        return <div className="grid-cols-8 grid gap-3 mt-9 parent">
        {dataUser.data.videos.map((items) => (
          <Video items={items} key={items.id} />
        ))}
      </div>;
      } else {
        return ( 
          <div className="flex w-full flex-col items-center mt-20 mb-3">
            <UserIcon width="80px" height="80px" className='text-gray-400'/>
            <h3 className="text-4xl font-extrabold mb-3">Không có nội dung</h3>
            <span>Người dùng này chưa đăng bất kỳ video nào.</span>
          </div>
        );
      }
    } else {
      return <p>Loading...</p>;
    }
  };

  useEffect(() => {
    renderVideo();
  }, [dataUser]);

  // -------------------------------
  const [tabs, setTabs] = useState("left-0");

  const handleTabClick = (e) => {
    if (e.target.classList.contains("video")) {
      setTabs("left-0");
    } else {
      setTabs("right-0");
    }
  };

  return (
    <div className="ml-[280px] px-6 py-8 relative w-full">
      <HeaderProfile data={dataUser.data} location={location}/>

      <div className="mt-9">
        <div className="flex w-[400px] relative">
          <div
            className={`w-1/2 text-center cursor-pointer font-bold pt-2 pb-6 video`}
            onClick={handleTabClick}
          >
            Video
          </div>
          <div
            className={`w-1/2 text-center cursor-pointer font-bold pt-2 pb-6 liked`}
            onClick={handleTabClick}
          >
            <FontAwesomeIcon icon={faLock} />
            <span className="ml-4">Đã thích</span>
          </div>
          <div
            className={`w-1/2 bg-black h-1 absolute bottom-0 ${tabs} third-div`}
          ></div>
        </div>
      </div>

      {/* <div className={"grid-cols-8 grid gap-3 mt-9 parent"}> */}
        {/* <div className="h-[290px] ml-5">
          <video className="h-full object-cover rounded-2xl cursor-pointer">
            <source src="https://files.fullstack.edu.vn/f8-tiktok/videos/3083-6503c58d5c308.mp4" />
          </video>
        </div> */}
        {renderVideo()}
      {/* </div> */}
    </div>
  );
}

export default Profile;
