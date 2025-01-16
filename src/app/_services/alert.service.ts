import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  success(message: string) {
    Toast.fire({
      icon: 'success',
      title: message,
    });
  }

  warning(message: string) {
    Toast.fire({
      icon: 'warning',
      title: message,
    });
  }

  error(message: string) {
    Toast.fire({
      icon: 'error',
      title: message,
    });
  }
}
