import { toast } from 'react-toastify';

export const toastSuccess = (msg: string): void => {
  toast.success(`🦄 ${msg}`, {
    position: 'top-right',
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored'
  });
};

export const toastError = (msg: string): void => {
  toast.error(`🦄 ${msg}`, {
    position: 'top-right',
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored'
  });
};
