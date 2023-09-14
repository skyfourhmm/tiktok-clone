import Image from "../Image";
import React, { useEffect, useState, useRef } from "react";
import { fetchListVideo } from "../../apiServices/userServices.js";
import VideoInfor from './VideoInfo'

import InfiniteScroll from 'react-infinite-scroll-component';

function Video() {
  const [isClient, setIsClient] = useState(false); 

  // ấn xuống sẽ thực hiện scroll theo
  useEffect(() => {
    document.getElementById("focus").focus();
  }, []);

  // lấy data video

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

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
    loader={<p>Loading...</p>}
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
