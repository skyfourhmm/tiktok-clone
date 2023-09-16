import React, { useEffect, useState, useRef } from "react";
import { fetchListVideo } from "../../apiServices/userServices.js";
import VideoInfor from './VideoInfo'
import Image from "../Image";


import InfiniteScroll from 'react-infinite-scroll-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function Video() {

  // ấn xuống sẽ thực hiện scroll theo
  useEffect(() => {
    document.getElementById("focus").focus();
  }, []);

  // lấy data video

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  
  const [isClient, setIsClient] = useState(false); 


  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let data = await fetchListVideo('for-you', page);

      setItems(prevItems => [...prevItems, ...data.data]);
      setPage(prevPage => prevPage + 1);
    } catch(error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isClient) {
      fetchData();
    }
  }, [isClient]);

  

  return (
    <InfiniteScroll
    dataLength={items.length}
    next={fetchData}
    hasMore={true} // Replace with a condition based on your data source
    loader={isLoading && <FontAwesomeIcon className="animate-spin" icon={faSpinner}/>}
    endMessage={<p>No more data to load.</p>}
    >
    <div id="focus" className="ml-[111px]">
      {items &&
        items.map((items, index) => (
          <div key={items.id} className="flex mb-28 ">
            <Image large src={items.user.avatar} />
            <VideoInfor items={items}/>
          </div>
        ))}
    </div>
    </InfiniteScroll>
  );
}

export default Video;
