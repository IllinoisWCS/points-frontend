import { EventCategoryType } from '../../../types/event';

export interface EventModalProps {
  open: boolean;
  toggleModal: () => void;
  reloadOnClose: () => void;
}

export interface StringFieldProps {
  value: string;
}

export interface CategoryFieldProps {
  value: EventCategoryType;
}

export interface NumberFieldProps {
  value: number;
}

export interface SameDayFieldProps {
  checked?: boolean | undefined;
}

export interface DropdownProps {
  value?:
    | string
    | number
    | boolean
    | Array<string | number | boolean>
    | undefined;
}
