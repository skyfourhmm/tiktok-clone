import React, { useEffect } from 'react';

const ScrollToTopOnReload = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi Component được tải lại
  }, []);

  return null; // Không cần render bất kỳ gì
};

export default ScrollToTopOnReload;
