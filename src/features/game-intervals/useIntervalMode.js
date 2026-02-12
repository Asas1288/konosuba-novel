import { useEffect, useRef } from "react";

export const useInterval = (isActive, callback, delay) => {
  const intervalRef = useRef(null);
  
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(callback, delay);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, callback, delay]); // ВСЕ три параметра здесь!
  
  return intervalRef;
};