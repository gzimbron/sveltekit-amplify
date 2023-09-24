import CustomError from '$core/entities/CustomError';
import CreateUser from '$features/accountManager/application/useCases/user/CreateUser';
import MockUserRepository from '$features/accountManager/infrastructure/repositories/MockUser.repository';
import {
	testEmail,
	testLastName,
	testName
} from '$tests/features/accountManager/accountTestHelpters';
import { beforeEach, describe, expect, it } from 'vitest';

describe('CreateUser Tests', () => {
	let useCase: CreateUser;

	beforeEach(() => {
		useCase = new CreateUser(new MockUserRepository());
	});

	it('Crear un usuario', async () => {
		const newUser = await useCase.execute({
			email: testEmail,
			name: testName,
			last_name: testLastName
		});

		expect(newUser).toBeDefined();
		expect(newUser.id).toBeDefined();
		expect(newUser.email).toBe(testEmail);
		expect(newUser.name).toBe(testName);
		expect(newUser.last_name).toBe(testLastName);
	});

	it('Eliminar espacios antes y después de los parámetros', async () => {
		const newUser = await useCase.execute({
			email: `    ${testEmail}      `,
			name: `    ${testName}      `,
			last_name: `    ${testLastName}      `
		});

		expect(newUser).toBeDefined();
		expect(newUser.id).toBeDefined();
		expect(newUser.email).toBe(testEmail);
		expect(newUser.name).toBe(testName);
		expect(newUser.last_name).toBe(testLastName);
	});

	it('Formatea email a minúsculas', async () => {
		const newUser = await useCase.execute({
			email: testEmail.toUpperCase(),
			name: testName,
			last_name: testLastName
		});

		expect(newUser).toBeDefined();
		expect(newUser.id).toBeDefined();
		expect(newUser.email).toBe(testEmail);
		expect(newUser.name).toBe(testName);
		expect(newUser.last_name).toBe(testLastName);
	});

	it('Email ya registrado', async () => {
		await useCase.execute({
			email: testEmail,
			name: testName,
			last_name: testLastName
		});

		try {
			await useCase.execute({
				email: testEmail,
				name: testName,
				last_name: testLastName
			});
		} catch (error) {
			expect(error).toBeInstanceOf(CustomError);
			const e = error as CustomError;
			expect(e.translateTag).toBe('error.emailAlreadyRegistered');
		}
	});

	it('Falta de parámetros', async () => {
		try {
			await useCase.execute({
				email: '',
				name: testName,
				last_name: testLastName
			});
		} catch (error) {
			expect(error).toBeInstanceOf(CustomError);
			const e = error as CustomError;
			expect(e.translateTag).toBe('error.missingParameters');
		}
	});
});
