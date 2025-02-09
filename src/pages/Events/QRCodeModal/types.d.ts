import { Event } from '../../../types/event';

export interface QRCodeModalProps {
  open: boolean;
  event?: Event;
  toggleModal: () => void;
}
