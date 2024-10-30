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
    import.meta.env.DEV ? DEVELOP_LOWCODE_URL : ""
  }${LOWCODE_PATH_PREFIX}/preview.html?${PAGE_SIG_ID}=${info?.id}`;

  return (
    <Modal
      open={visible}
      destroyOnClose={true}
      title={`预览页面-${info?.name}`}
      onCancel={handleCancel}
      footer={null}
    >
      <div>
        <ResponsiveIframeViewer
          src={route}
          title={info?.name || ""}
          size={ViewportSize.mobile}
        />
      </div>
    </Modal>
  );
};

export default PreviewModal;
