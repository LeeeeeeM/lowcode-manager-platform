import {
  useRef,
  useState,
  useMemo,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
  ForwardedRef,
} from "react";
import cns from "classnames";
import styles from "./index.module.less";

export interface Data<T> {
  value: T;
  index: number;
}

interface VirtualListProps<T extends Data<U>, U> {
  data: T[];
  dynamicHeight: (v: T, index: number) => number;
  estimatedItemSize?: number;
  selectCurrentItem?: (index: number) => void;
  currentIndex?: number;
}

interface Measure {
  offset: number;
  size: number;
}

export interface VirtualListRef {
  scrollToIndex: (index: number) => void;
}

const VirtualList = forwardRef<VirtualListRef, VirtualListProps<any, any>>(
  <T extends Data<U>, U extends [string, number]>(
    {
      data,
      dynamicHeight,
      estimatedItemSize = 30,
      selectCurrentItem = () => {},
      currentIndex = 0,
    }: VirtualListProps<T, U>,
    ref: ForwardedRef<VirtualListRef>
  ) => {
    const [visibleData, setVisibleData] = useState<T[]>([]);
    const listRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const sizeAndOffsetCacheRef = useRef<Record<string, Measure>>({});
    const lastMeasuredIndexRef = useRef<number>(-1);

    const getItemSizeAndOffset = useCallback(
      (index: number) => {
        const sizeAndOffsetCache = sizeAndOffsetCacheRef.current;
        const lastMeasuredIndex = lastMeasuredIndexRef.current;

        if (lastMeasuredIndex >= index) {
          return sizeAndOffsetCache[index];
        }

        let offset = 0;
        if (lastMeasuredIndex >= 0) {
          const lastMeasure = sizeAndOffsetCache[lastMeasuredIndex];
          if (lastMeasure) {
            offset = lastMeasure.offset + lastMeasure.size;
          }
        }

        for (let i = lastMeasuredIndex + 1; i <= index; i++) {
          const item = data[i];
          const size = dynamicHeight(item, i);
          sizeAndOffsetCache[i] = {
            size,
            offset,
          };

          offset += size;
        }

        if (index > lastMeasuredIndex) {
          lastMeasuredIndexRef.current = index;
        }

        return sizeAndOffsetCache[index];
      },
      [dynamicHeight, data]
    );

    const findNearestItemIndex = useCallback(
      (scrollTop: number) => {
        let total = 0;
        for (let i = 0, j = data.length; i < j; i++) {
          const size = getItemSizeAndOffset(i).size;
          total += size;
          if (total >= scrollTop || i === j - 1) {
            return i;
          }
        }

        return 0;
      },
      [getItemSizeAndOffset, data]
    );

    const getLastMeasuredSizeAndOffset = useCallback(() => {
      const sizeAndOffsetCache = sizeAndOffsetCacheRef.current;
      const lastMeasuredIndex = lastMeasuredIndexRef.current;
      return lastMeasuredIndex > 0
        ? sizeAndOffsetCache[lastMeasuredIndex]
        : { offset: 0, size: 0 };
    }, []);

    const updateVisibleData = (scrollTop: number, clientHeight: number) => {
      const start = findNearestItemIndex(scrollTop);
      const end = findNearestItemIndex(scrollTop + clientHeight);
      setVisibleData(data.slice(start, Math.min(end + 1, data.length)));
      if (contentRef.current) {
        const contentElement = contentRef.current;
        contentElement.style.transform = `translate3d(0, ${
          getItemSizeAndOffset(start).offset
        }px, 0)`;
      }
    };

    const handleScroll = () => {
      if (!listRef.current) return;
      const { scrollTop = 0, clientHeight } = listRef.current;
      // 增加1000px的缓冲区
      updateVisibleData(Math.max(0, scrollTop - 500), clientHeight + 500);
    };

    const contentHeight = useMemo(() => {
      const lastMeasuredIndex = lastMeasuredIndexRef.current;
      const itemCount = data.length;
      if (lastMeasuredIndex >= 0) {
        const lastMeasuredSizeAndOffset = getLastMeasuredSizeAndOffset();
        return (
          lastMeasuredSizeAndOffset.offset +
          lastMeasuredSizeAndOffset.size +
          (itemCount - 1 - lastMeasuredIndex) * estimatedItemSize
        );
      }
      return itemCount * estimatedItemSize;
    }, [data, estimatedItemSize, getLastMeasuredSizeAndOffset]);

    useEffect(() => {
      if (!listRef.current) return;
      const { scrollTop = 0, clientHeight } = listRef.current;
      updateVisibleData(scrollTop, clientHeight);
    }, []);

    // 实现 scrollToIndex 方法
    const scrollToIndex = useCallback(
      (index: number) => {
        // 1. 检查索引有效性
        if (index < 0 || index >= data.length) {
          console.error(`Index ${index} is out of bounds.`);
          return;
        }

        const container = listRef.current;
        if (!container) return;

        // 2. 获取目标项的偏移量
        const { offset } = getItemSizeAndOffset(index);

        // 3. 设置滚动容器的位置
        container.scrollTo({
          top: offset,
          behavior: "auto", // 可选平滑滚动 'smooth'
        });

        // 4. 触发可视数据更新（可选，滚动事件会自动触发）
        const { clientHeight } = container;
        updateVisibleData(Math.max(0, offset - 500), clientHeight + 500);
      },
      [data.length, getItemSizeAndOffset]
    );

    // 将 scrollToIndex 方法暴露给父组件
    useImperativeHandle(ref, () => ({
      scrollToIndex,
    }));

    return (
      <>
        <div
          ref={listRef}
          className={styles["list-view"]}
          onScroll={handleScroll}
        >
          <div
            className={styles["list-view-phantom"]}
            style={{
              height: contentHeight,
            }}
          />
          <div ref={contentRef} className={styles["list-view-content"]}>
            {visibleData.map((item, _) => (
              <div
                className={cns({
                  [styles["list-view-item"]]: true,
                  [styles["class-1"]]: true,
                  [styles["class-2"]]: currentIndex === item.index,
                })}
                key={item.index}
                style={{
                  height: `${getItemSizeAndOffset(item.index).size}px`,
                }}
                onClick={() => {
                  selectCurrentItem(item.index);
                }}
              >
                {item.value}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
);

export default VirtualList;
