export interface ModalState {
  isOpen: boolean;
}

export interface ModalActions {
  open: () => void;
  close: () => void;
  clearCartAndClose: () => void;
}

export type ModalStore = ModalState & ModalActions;
