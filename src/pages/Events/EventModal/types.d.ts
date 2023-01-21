export interface EventModalProps {
  open: boolean;
  toggleModal: () => void;
  reloadOnClose: () => void;
}

export interface StringFieldProps {
  value: string;
}

export interface CategoryFieldProps {
  value: 'corporate' | 'social' | 'outreach' | 'mentoring' | 'explorations' | 'generalMeeting' | 'other';
}

export interface NumberFieldProps {
  value: number;
}

export interface SameDayFieldProps {
  checked?: boolean | undefined;
}

export interface DropdownProps {
  value?: string | number | boolean | Array<string | number | boolean> | undefined;
}
