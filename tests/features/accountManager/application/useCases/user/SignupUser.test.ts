import CustomError from '$core/entities/CustomError';
import SignupUser from '$features/accountManager/application/useCases/user/SignupUser';
import MockUserRepository from '$features/accountManager/infrastructure/repositories/MockUser.repository';
import {
	testEmail,
	testInvalidPassword,
	testValidPassword
} from '$tests/features/accountManager/accountTestHelpters';
import { beforeEach, describe, expect, it } from 'vitest';

describe('SignupUser Test', () => {
	let useCase: SignupUser;

	beforeEach(() => {
		useCase = new SignupUser(new MockUserRepository());
	});

	it('Registro exitoso', async () => {
		await expect(
			useCase.execute({
				email: testEmail,
				password: testValidPassword
			})
		).resolves.toBeUndefined();
	});

	it('Password no válida', async () => {
		try {
			await useCase.execute({
				email: testEmail,
				password: testInvalidPassword
			});
		} catch (error) {
			expect(error).toBeInstanceOf(CustomError);
			const e = error as CustomError;
			expect(e.translateTag).toBe('error.invalidPasswordFormat');
		}
	});

	it('No se ingresó email', async () => {
		try {
			await useCase.execute({
				email: '',
				password: testValidPassword
			});
		} catch (error) {
			expect(error).toBeInstanceOf(CustomError);
			const e = error as CustomError;
			expect(e.translateTag).toBe('error.invalidEmail');
		}
	});

	it('Email con Formato inválido', async () => {
		try {
			await useCase.execute({
				email: 'sinarroba.com',
				password: testValidPassword
			});
		} catch (error) {
			expect(error).toBeInstanceOf(CustomError);
			const e = error as CustomError;
			expect(e.translateTag).toBe('error.invalidEmail');
		}
	});

	it('Email ya registrado', async () => {
		await useCase.execute({
			email: testEmail,
			password: testValidPassword
		});

		try {
			await useCase.execute({
				email: testEmail,
				password: testValidPassword
			});
		} catch (error) {
			expect(error).toBeInstanceOf(CustomError);
			const e = error as CustomError;
			expect(e.translateTag).toBe('error.emailAlreadyRegistered');
		}
	});
});
