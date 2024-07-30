import { useState, useEffect } from "react";

const useIsIOS = (): boolean => {
  const [isIOS, setIsIOS] = useState<boolean>(false);

  useEffect(() => {
    const checkIsIOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const iosDevices = /iphone|ipad|ipod/.test(userAgent);
      setIsIOS(iosDevices);
    };

    checkIsIOS();
  }, []);

  return isIOS;
};

export default useIsIOS;
