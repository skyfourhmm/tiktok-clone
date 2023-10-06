import { useEffect, useState } from "react";
import { fetchAnUser } from "../apiServices/userServices.js";
import HeaderProfile from "./components/HeaderProfile";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import Video from "./components/Video.js";
import { LockIcon, UserIcon } from "../components/Icons/index";

import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const AntTabs = styled(Tabs)({
  backgroundColor: "#fff",
  "& .MuiTabs-indicator": {
    backgroundColor: "#000",
    height: "3px",
  },
});

const AntTab = styled(Tab)({
  "&.Mui-selected ": {
    color: "#000",
  },

  fontSize: "16px",
  fontWeight: "600",
  padding: "0 60px",
  textTransform: "none",
});

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
        return (
          <div className="grid-cols-8 grid gap-3 mt-9 parent">
            {dataUser.data.videos.map((items) => (
              <Video items={items} key={items.id} />
            ))}
          </div>
        );
      } else {
        return (
          <div className="flex w-full flex-col items-center mt-20 mb-3">
            <UserIcon width="80px" height="80px" className="text-gray-400" />
            <h3 className="text-4xl font-extrabold mb-3">No content</h3>
            <span>This user has not published any videos.</span>
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
  const [tab, setTab] = useState(true);
  // ----------------------------------------------
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      setTab(true);
    } else {
      setTab(false);
    }
  };
  return (
    <div className="ml-[280px] px-6 py-8 relative w-full">
      <HeaderProfile data={dataUser.data} location={location} />

      {/* <div className="mt-9">
        <div className="flex w-[400px] relative">
          <div
            className={`w-1/2 text-center cursor-pointer font-bold pt-2 pb-6 video`}
            onClick={handleTabClick}
          >
            Videos
          </div>
          <div
            className={`w-1/2 text-center cursor-pointer font-bold pt-2 pb-6 liked`}
            onClick={handleTabClick}
          >
            <FontAwesomeIcon icon={faLock} />
            <span className="ml-4">Like</span>
          </div>
          <div
            className={`w-1/2 bg-black h-1 absolute bottom-0 ${tabs} third-div`}
          ></div>
        </div>
      </div> */}

      <Box>
        <AntTabs value={value} onChange={handleChange} variant="scrollable">
          <AntTab disableRipple label="Videos" value={0} />
          <AntTab
            disableRipple
            icon={<FontAwesomeIcon icon={faLock} />}
            iconPosition="start"
            label="Liked"
            value={1}
          />
        </AntTabs>
      </Box>

      {/* <div className={"grid-cols-8 grid gap-3 mt-9 parent"}> */}
      {/* <div className="h-[290px] ml-5">
          <video className="h-full object-cover rounded-2xl cursor-pointer">
            <source src="https://files.fullstack.edu.vn/f8-tiktok/videos/3083-6503c58d5c308.mp4" />
          </video>
        </div> */}
      {tab && renderVideo()}
      {!tab && (
        <div className="flex w-full flex-col items-center mt-20 mb-3">
          <LockIcon width="80px" height="80px" className="text-gray-400" />
          <h3 className="text-4xl font-extrabold mb-3">
            This user's liked videos are private
          </h3>
          <span>
            Videos liked by {dataUser.data.nickname} are currently hidden
          </span>
        </div>
      )}
      {/* </div> */}
    </div>
  );
}

export default Profile;
