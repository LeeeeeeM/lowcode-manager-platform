import { RefObject, useEffect, useState } from 'react';

const useSizeObserver = (ref: RefObject<HTMLElement>, fn: () => void) => {
  const [size, setSize] = useState({ scrollWidth: 0, scrollHeight: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const updateSize = () => {
      if (ref.current) {
        fn && fn();
        setSize({
          scrollWidth: ref.current.scrollWidth,
          scrollHeight: ref.current.scrollHeight,
        });
      }
    };

    const resizeObserver = new ResizeObserver(updateSize);

    // 观察当前元素
    resizeObserver.observe(ref.current);

    // 初始化大小
    updateSize();

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return size;
};

export default useSizeObserver;