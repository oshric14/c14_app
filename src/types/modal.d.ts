import { ReactNode } from "react";

export type openModalType = {
  logo?: boolean;
  content: ReactNode;
  title?: string;
};

export type ModalContextType = {
  openModal: (options: openModalType) => void;
  closeModal: () => void;
};

export type ModalProps = {
  title?: string;
  logo?: boolean;
  onClose: () => void;
  children: ReactNode;
};
