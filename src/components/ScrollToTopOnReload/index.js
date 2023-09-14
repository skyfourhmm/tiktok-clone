import { useEffect } from 'react';

const ScrollToTopOnReload = () => {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

  return null; // Không cần render bất kỳ gì
};

export default ScrollToTopOnReload;
