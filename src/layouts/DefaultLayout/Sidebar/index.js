import Menu from "../../components/Sidebar/Menu/Menu";
import MenuItem from "../../components/Sidebar/Menu/MenuItem";
import config from "../../../config";
import AccountItem from "../../../components/AccountItem/AccountItem";
import ModalLogIn from "../../../../src/components/Modal/modalLogIn";

import { Fragment, useEffect, useState } from "react";
import Button from "../../../components/Button";
import {
  ForYouIcon,
  FollowingIcon,
  ExploreIcon,
  LiveIcon,
  ForYouIconActive,
  FollowingIconActive,
  ExploreIconActive,
  LiveIconActive,
} from "../../../../src/components/Icons/index.js";
import { fetchListFollow } from "../../../apiServices/userServices.js";

import { openModalLogin } from "../../../redux/action";
import { store } from "../../../redux/store";

function Sidebar() {
  const [showModal, setShowModal] = useState(false);
  const [showMore, setShowMore] = useState(1);
  const [isHideShowMore, setisHideShowMore] = useState(false);

  const [userFollowing, setUserFollowing] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let res = await fetchListFollow(showMore);

      if (res.status === 401) {
        return;
      }
      setShowMore((prev) => prev + 1);
      setUserFollowing((prevItems) => [...prevItems, ...res.data]);
      setisHideShowMore(userFollowing.length === res.meta.pagination.total);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isClient) {
      fetchData();
    }
  }, [isClient]);

  const handlShowMore = () => {
    fetchData();
  };

  let token = localStorage.getItem("token");

  // thực hiện bất modal login
  const handleOpenModalLogin = () => {
    store.dispatch(openModalLogin());
  };

  return (
    <Fragment>
      <div className="my-9 ml-4 min-w-[200px] max-w-[250px] h-screen fixed bg-white group">
        <div className="overflow-y-hidden group-hover:overflow-y-auto h-[88%]">
          <Menu>
            <MenuItem
              to={config.routers.home}
              icon={<ForYouIcon />}
              title={"For You"}
              iconActive={<ForYouIconActive />}
            ></MenuItem>
            <MenuItem
              to={config.routers.following}
              icon={<FollowingIcon />}
              title={"Following"}
              iconActive={<FollowingIconActive />}
            ></MenuItem>
            <MenuItem
              to={config.routers.explore}
              icon={<ExploreIcon />}
              title={"Explore"}
              iconActive={<ExploreIconActive />}
            ></MenuItem>
            <MenuItem
              to={config.routers.live}
              icon={<LiveIcon />}
              title={"Live"}
              iconActive={<LiveIconActive />}
            ></MenuItem>
          </Menu>

          {!token ? (
            <div>
              <h4 className="text-gray-400 px-3 py-2">
                Log in to follow creators, like videos, and view comments.
              </h4>
              <Button outline large onClick={handleOpenModalLogin}>
                Log in
              </Button>
            </div>
          ) : (
            <div>
              <h4 className="text-gray-400 px-3 py-2">Following accounts</h4>
              {userFollowing.map((itemUser) => {
                return <AccountItem key={itemUser.id} data={itemUser} />;
              })}
              {!isHideShowMore && (
                <h4
                  className="text-red-500 px-3 py-2 font-bold cursor-pointer select-none"
                  onClick={handlShowMore}
                >
                  See more
                </h4>
              )}
            </div>
          )}
        </div>
      </div>
      {/* <ModalLogIn isVisible={showModal} onClose={() => setShowModal(false)}/> */}
    </Fragment>
  );
}

export default Sidebar;
