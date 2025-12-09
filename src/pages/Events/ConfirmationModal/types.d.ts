import { Event } from '../../../types/event';

export interface ConfirmationModalProps {
  open: boolean;
  event?: Event;
  toggleConfirmationModal: () => void;
  toggleEventModal: () => void;
  reloadOnClose: () => void;
}
