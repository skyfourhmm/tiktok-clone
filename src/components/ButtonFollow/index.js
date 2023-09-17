import Button from "../Button";
import { useState, useContext } from "react";
import { UserContext } from "../../hooks/useContect";
import { fetchFollow, fetchUnFollow } from "../../apiServices/userServices.js";

import { IconUserFollowing } from "../../components/Icons";

function ButtonFollow({ followed, userID, inside = false }) {
  const [isFollowed, setIsFollowed] = useState(followed);
  const { user } = useContext(UserContext);

  const handleFollow = async () => {
    if (user.auth) {
      if (isFollowed) {
        let resFl = await fetchUnFollow(userID);
        if (resFl) {
          setIsFollowed(false);
        }
      } else {
        let resUnFl = await fetchFollow(userID);
        if (resUnFl) {
          setIsFollowed(true);
        }
      }
    }
  };

  return (
    <>
      <Button
        small
        outline={!isFollowed}
        upload={isFollowed}
        primary={!isFollowed}
        onClick={(isFollowed && inside) ? null : handleFollow}
        profile
      >
        {!isFollowed ? "Follow" : !inside ? "Following" : "Messages"}
      </Button>
      {(isFollowed && inside) ? (
        <button className="py-2 px-2 ml-4 border-2 rounded-md" onClick={handleFollow}>
          <IconUserFollowing />
        </button>
      ) : (
        <></>
      )}
    </>
  );
}

export default ButtonFollow;
