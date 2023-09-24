import CustomError from '$core/entities/CustomError';

import Swal, { type SweetAlertOptions } from 'sweetalert2';

const swalProps: SweetAlertOptions = {
	confirmButtonColor: 'hsl(var(--p))',
	cancelButtonColor: 'hsl(var(--s))'
};

export default class Alert {
	static error = async (error: unknown, options: SweetAlertOptions = {}) => {
		let text: string;

		if (error instanceof CustomError) {
			//traducir
			text = error.translateTag;
		} else {
			text = error as string;
		}

		console.error(error);
		return Swal.fire({
			...swalProps,
			text,
			icon: 'error',
			...options
		});
	};

	static info = async (text: string, options: SweetAlertOptions = {}) => {
		return Swal.fire({
			...swalProps,
			text,
			icon: 'info',
			...options
		});
	};

	static success = async (text: string, options: SweetAlertOptions = {}) => {
		return Swal.fire({
			...swalProps,
			text,
			icon: 'success',
			...options
		});
	};

	static question = async (text: string, options: SweetAlertOptions = {}) => {
		return Swal.fire({
			...swalProps,
			text,
			icon: 'question',
			confirmButtonText: 'Sí',
			showCancelButton: true,
			cancelButtonText: 'No',
			focusCancel: true,
			...options
		});
	};

	static warning = async (text: string, options: SweetAlertOptions = {}) => {
		return Swal.fire({
			...swalProps,
			text,
			icon: 'warning',
			...options
		});
	};

	static custom = async (options: SweetAlertOptions = {}) => {
		return Swal.fire({
			...swalProps,
			...options
		});
	};
}
