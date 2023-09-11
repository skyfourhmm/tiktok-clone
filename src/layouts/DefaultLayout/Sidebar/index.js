import Menu from "../../components/Sidebar/Menu/Menu";
import MenuItem from "../../components/Sidebar/Menu/MenuItem";
import config from "../../../config";
import * as followingServices from '../../../../src/apiServices/followingServices'
import AccountItem from "../../../components/AccountItem/AccountItem";
import ModalLogIn from '../../../../src/components/Modal/modalLogIn'

import { Fragment, useEffect, useState } from "react";
import Button from "../../../components/Button";
import {ForYouIcon, FollowingIcon, ExploreIcon, LiveIcon, ForYouIconActive, FollowingIconActive, ExploreIconActive, LiveIconActive} from '../../../../src/components/Icons/index.js'


function Sidebar() {
    const [following, setFollowing] = useState([])
    const [logined, setLogined] = useState(true)
    const [showModal, setShowModal] = useState(false)

    useEffect( () => {

      followingServices.getFollowing({page : 1, perPage: 10}).then(data => {
        setFollowing(data)
      })
      .catch( (error) => {
        console.log(error)
      })
    }, [])

  return (
    <Fragment>
    <div className="my-9 ml-4 min-w-[200px] max-w-[250px] h-screen fixed bg-white group">
      <div className="overflow-y-hidden group-hover:overflow-y-auto h-[88%]">
      <Menu>
        <MenuItem
          to={config.routers.home}
          icon={<ForYouIcon/>}
          title={"For You"}
          iconActive={<ForYouIconActive/>}
        ></MenuItem>
        <MenuItem
          to={config.routers.following}
          icon={<FollowingIcon/>}
          title={"Following"}
          iconActive={<FollowingIconActive/>}
        ></MenuItem>
        <MenuItem
          to={config.routers.explore}
          icon={<ExploreIcon/>}
          title={"Explore"}
          iconActive={<ExploreIconActive/>}
        ></MenuItem>
        <MenuItem
          to={config.routers.live}
          icon={<LiveIcon/>}
          title={"Live"}
          iconActive={<LiveIconActive/>}
        ></MenuItem>
      </Menu>

      {logined ? <div>
        <h4 className="text-gray-400 px-3 py-2">Log in to follow creators, like videos, and view comments.</h4>
        <Button outline large onClick={() => setShowModal(true)}>Log in</Button>
      </div>: <div>
        <h4 className="text-gray-400 px-3 py-2">Following accounts</h4>
        {following.map((itemUser) => {
            return <AccountItem key={itemUser.id} data={itemUser} />;
        })}
        <h4 className="text-red-500 px-3 py-2 font-bold cursor-pointer select-none">See more</h4>
      </div>}
      </div>
    </div>
    <ModalLogIn isVisible={showModal} onClose={() => setShowModal(false)}/>
    </Fragment>
  );
}

export default Sidebar;
