import {
  FC,
  useEffect,
  useState,
  CSSProperties,
  useCallback,
  useRef,
  useMemo,
} from "react";
import * as monaco from "monaco-editor";
import { MenuItem } from "services/entity/report-menu";
import {
  ITEM_HEIGHT,
  ITEM_MAX_WIDTH,
  MIN_ITEM_LENGTH,
  SpecialCharacter,
} from "/@/constants/monaco";
import VirtualList, { Data, VirtualListRef } from "../VirtualList";

interface MonacoBlockMenuProps {
  editor: monaco.editor.IStandaloneCodeEditor;
  menuList: MenuItem[];
}

type MenuItemData = MenuItem & Data<string>;

const MonacoBlockMenu: FC<MonacoBlockMenuProps> = ({
  editor,
  menuList = [],
}) => {
  const [triggerPosition, setTriggerPosition] =
    useState<monaco.Position | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentItems, setCurrentItems] = useState<MenuItem[]>([]);
  const selectedIndexRef = useRef(0);

  const listRef = useRef<VirtualListRef>(null);

  const [renderKey, setRenderKey] = useState<number>(0);

  const menuRef = useRef<HTMLDivElement>(null); // 使用 ref 管理菜单

  useEffect(() => {
    if (!editor) return;
    const onKeyDown = (e: monaco.IKeyboardEvent) => {
      if (e.code === SpecialCharacter.Slash) {
        setTriggerPosition(editor.getPosition());
        setTimeout(() => setIsMenuOpen(true), 0);
        setCurrentItems(menuList);
      }
    };

    const disposable = editor.onKeyDown(onKeyDown);

    return () => {
      disposable?.dispose();
    };
  }, [editor, isMenuOpen, menuList]);

  const handleMenuKey = useCallback(
    (e: KeyboardEvent) => {
      if (!isMenuOpen) return;

      // 放开 Space 和 Backspace 键的默认行为
      const normalKeys = [
        SpecialCharacter.Space,
        SpecialCharacter.Backspace,
        SpecialCharacter.Tab,
      ];

      if (normalKeys.includes(e.code as SpecialCharacter)) {
        closeMenu();
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      // 获取当前选中项的索引
      const selectedIndex = selectedIndexRef.current;
      let newIndex = selectedIndex;

      switch (e.code) {
        case SpecialCharacter.ArrowUp:
          newIndex =
            (selectedIndex - 1 + currentItems.length) % currentItems.length;
          break;
        case SpecialCharacter.ArrowDown:
          newIndex = (selectedIndex + 1) % currentItems.length;
          break;
        case SpecialCharacter.Enter:
          const close = insertItem(selectedIndex);
          if (close) {
            closeMenu();
          }
          return;
        case SpecialCharacter.Escape:
          closeMenu();
          return;
      }
      selectedIndexRef.current = newIndex;
      setSelectedIndex(newIndex);
      listRef.current?.scrollToIndex(newIndex);
    },
    [isMenuOpen, currentItems]
  );

  const insertItem = useCallback(
    (index: number): boolean => {
      if (!triggerPosition || !editor) return true;
      const { lineNumber, column } = triggerPosition;

      if (currentItems[index].children?.length) {
        setCurrentItems(currentItems[index].children);
        setSelectedIndex(0);
        selectedIndexRef.current = 0;
        return false;
      }

      editor.executeEdits("", [
        {
          range: new monaco.Range(lineNumber, column, lineNumber, column + 1),
          text: currentItems[index].label,
          forceMoveMarkers: true,
        },
      ]);
      return true;
    },
    [triggerPosition, editor, currentItems]
  );

  const handleOutsideClick = (e: MouseEvent) => {
    // 检查点击是否发生在菜单外部
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target as Node) &&
      isMenuOpen
    ) {
      closeMenu();
    }
  };

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    setSelectedIndex(0);
    setTriggerPosition(null);
    selectedIndexRef.current = 0;
  }, []);

  // 全局监听键盘事件
  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("keydown", handleMenuKey, true);
      document.addEventListener("mousedown", handleOutsideClick, true);
    }

    return () => {
      document.removeEventListener("keydown", handleMenuKey, true);
      document.removeEventListener("mousedown", handleOutsideClick, true);
    };
  }, [isMenuOpen, handleMenuKey]);

  const menuStyle: CSSProperties = useMemo(() => {
    if (!triggerPosition || !editor) return {};

    const { lineNumber, column } = triggerPosition;
    const coords = editor.getScrolledVisiblePosition({ lineNumber, column });
    const { left: boxLeft = 0, top: boxTop = 0 } =
      editor.getDomNode()?.getBoundingClientRect() || {};

    const { left = 0, top = 0, height = 20 } = coords || {};

    return {
      position: "absolute",
      left: `${left + boxLeft + 10}px`,
      top: `${top + boxTop + height}px`,
      background: "white",
      border: "1px solid #ddd",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      zIndex: 1000,
    };
  }, [triggerPosition, editor]);

  const dynamicCalcHeight: any = useCallback((_: MenuItem, index: number) => {
    return ITEM_HEIGHT;
  }, []);

  const renderItems: MenuItemData[] = useMemo(() => {
    return currentItems.map((item, index) => {
      return {
        ...item,
        value: item.label,
        index,
      } as MenuItemData;
    });
  }, [currentItems]);

  const menuBoxStyle: CSSProperties = useMemo(() => {
    return {
      width: ITEM_MAX_WIDTH,
      height: Math.min(MIN_ITEM_LENGTH, renderItems.length || 1) * ITEM_HEIGHT,
    };
  }, [renderItems?.length]);

  const selectItemCallback = (index: number) => {
    const close = insertItem(index);
    if (close) {
      closeMenu();
    }
  };

  useEffect(() => {
    // 重新渲染
    setRenderKey((prev) => prev + 1);
  }, [currentItems]);

  return (
    <>
      {isMenuOpen && triggerPosition && (
        <div style={menuStyle}>
          <div ref={menuRef} style={menuBoxStyle}>
            <VirtualList
              key={renderKey}
              ref={listRef}
              dynamicHeight={dynamicCalcHeight}
              data={renderItems}
              estimatedItemSize={ITEM_HEIGHT}
              selectCurrentItem={selectItemCallback}
              currentIndex={selectedIndex}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MonacoBlockMenu;
