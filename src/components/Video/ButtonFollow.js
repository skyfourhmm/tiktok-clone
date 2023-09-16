import Button from "../Button";
import { useState, useContext } from "react";
import { UserContext } from "../../hooks/useContect";
import { fetchFollow, fetchUnFollow } from "../../apiServices/userServices.js";

function ButtonFollow({items}) {
  const [follow, setFollow] = useState(true);
  const [isFollowed, setIsFollowed] = useState(items.user.is_followed)
  const { user } = useContext(UserContext);

  const handleFollow = async () => {
    if(isFollowed) {
        let resFl = await fetchUnFollow(items.user_id)
        if(resFl) {
            setFollow(true)
            setIsFollowed(false)
            console.log('da huy following')
        }
    } else {
        let resUnFl = await fetchFollow(items.user_id)
        if(resUnFl) {
            setFollow(false)
            setIsFollowed(true)
            console.log('da following')
        }
    }
  };

  return (
    <Button small outline={!isFollowed} upload={isFollowed} onClick={handleFollow}>
      {(!isFollowed && follow) ? "Follow" : "Following"}
    </Button>
  );
}

export default ButtonFollow;
