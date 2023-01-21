export interface EventModalProps {
  open: boolean;
  toggleModal: () => void;
  reloadOnClose: () => void;
}

export interface StringFieldProps {
  target: {
    value: string;
  };
}

export interface SameDayFieldProps {
  target: {
    checked: boolean;
  };
}
