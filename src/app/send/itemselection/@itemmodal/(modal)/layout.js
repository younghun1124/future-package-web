import  Modal  from "@/ui/Modal";

export default function ModalLayout({ children }) {
  return (
    <Modal>
      {children}
    </Modal>
  );
}
