import { FC } from "react";
import { Modal } from "antd";
import {
  ResponsiveIframeViewer,
  ViewportSize,
} from "react-responsive-iframe-viewer/dist/main";
import { Page } from "services/entity";
import { DEVELOP_LOWCODE_URL, LOWCODE_PATH_PREFIX, PAGE_SIG_ID } from "common";

interface PreviewModalProps {
  info?: Page;
  visible: boolean;
  closeModal: () => void;
}

const PreviewModal: FC<PreviewModalProps> = (props) => {
  const { visible = false, closeModal = () => {}, info } = props;

  const handleCancel = () => {
    closeModal();
  };

  const route = `${
    // wujie 内引入 iframe，其根节点加载资源会被 主应用的 origin 替代，做的跨域方案，所以这里用 __WUJIE_PUBLIC_PATH__，使用原始资源路径
    import.meta.env.DEV
      ? DEVELOP_LOWCODE_URL + "/"
      : window.__WUJIE_PUBLIC_PATH__ || "/"
  }${LOWCODE_PATH_PREFIX}/preview.html?${PAGE_SIG_ID}=${info?.id}`;

  return (
    <Modal
      open={visible}
      destroyOnClose={true}
      title={`预览页面-${info?.name}`}
      onCancel={handleCancel}
      footer={null}
      width={"100%"}
    >
      <div>
        <ResponsiveIframeViewer
          src={route}
          title={info?.name || ""}
          showControls={false}
          size={ViewportSize.desktop}
        />
      </div>
    </Modal>
  );
};

export default PreviewModal;
