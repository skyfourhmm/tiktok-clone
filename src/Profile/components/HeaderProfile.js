import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  ShareIcon } from "../../components/Icons";
import Image from "../../components/Image";
import { faCircleCheck, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import ButtonFollow from "../../components/ButtonFollow";


function HeaderProfile({data}) {
  
  if(!data) {
    return null
  }

  return (
    <div>
      <div className="flex">
        <Image
          src={
            data.avatar
          }
          profile
        />
        <div className="ml-6">
          <div className="mb-5 flex items-center">
            <span className="text-5xl font-bold mr-3">{data.nickname}</span>
            <FontAwesomeIcon className="text-cyan-400 text-3xl" icon={faCircleCheck}/>
          </div>
          <h3 className="font-bold">{data.first_name + " " + data.last_name}</h3>
          <div className="flex mt-3">
            <ButtonFollow followed={data.is_followed} userID={data.id} inside/>
            {/* <Button primary profile>
              Follow
            </Button> */}
          </div>
        </div>
        <div className="items-start ml-[135px]">
          <div className="flex items-center text-3xl">
            <button className="pr-6">
              <ShareIcon />
            </button>
            <button>
              <FontAwesomeIcon icon={faEllipsis} />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-9">
        <div className="flex">
            <span className="flex">
                <p className="font-bold">{data.followings_count}</p>
                <p className="pl-2">Following</p>
            </span>
            <span className="flex ml-8">
                <p className="font-bold">{data.followers_count}</p>
                <p className="pl-2">Followers</p>
            </span>
            <span className="flex ml-8">
                <p className="font-bold">{data.likes_count}</p>
                <p className="pl-2">likes</p>
            </span>
        </div>
        <div className="mt-6">
            <span>{data.bio || 'No bio here'}</span>
        </div>
      </div>
    </div>
  );
}

export default HeaderProfile;
