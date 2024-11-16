import { Event } from '../../../types/event';

export interface EventModalProps {
  open: boolean;
  event?: Event;
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
