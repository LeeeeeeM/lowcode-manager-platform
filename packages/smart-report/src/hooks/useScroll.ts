import { RefObject, useEffect, useState } from "react";

const useScrollObserver = (ref: RefObject<HTMLElement>, dep: any[]) => {
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const updateSize = () => {
      console.log('updateSize')
      if (ref.current) {
        const hasVerticalScrollbar =
          ref.current.scrollHeight > ref.current.clientHeight;
        setHasScroll(hasVerticalScrollbar);
      } else {
        setHasScroll(false);
      }
    };

    // 创建 ResizeObserver 实例
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // 只处理目标元素的变化
        if (entry.target === ref.current) {
          updateSize();
        }
      }
    });

    // 观察当前元素
    resizeObserver.observe(ref.current);

    // 初始化大小
    updateSize();

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref, ...dep]);

  return hasScroll;
};

export default useScrollObserver;
