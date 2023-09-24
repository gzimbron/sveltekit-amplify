import CustomError from '$core/entities/CustomError';
import GetUser from '$features/accountManager/application/useCases/user/GetUser';
import User from '$features/accountManager/domain/entities/User';
import MockUserRepository from '$features/accountManager/infrastructure/repositories/MockUser.repository';
import {
	testEmail,
	testLastName,
	testName
} from '$tests/features/accountManager/accountTestHelpters';
import { beforeAll, describe, expect, it } from 'vitest';

describe('GetUser Tests', () => {
	let useCase: GetUser;

	beforeAll(() => {
		const repository = new MockUserRepository();

		repository.create(
			new User({
				email: testEmail,
				name: testName,
				last_name: testLastName,
				id: '123'
			})
		);

		useCase = new GetUser(repository);
	});

	it('Obtiene usuario', async () => {
		const user = await useCase.execute(testEmail);
		expect(user).toBeDefined();
		expect(user).toBeInstanceOf(User);
	});

	it('Email con espacios antes y después', async () => {
		const user = await useCase.execute(`    ${testEmail}      `);
		expect(user).toBeDefined();
		expect(user).toBeInstanceOf(User);
	});

	it('Email vacío', async () => {
		try {
			await useCase.execute('');
		} catch (error) {
			expect(error).toBeInstanceOf(CustomError);
			const e = error as CustomError;
			expect(e.translateTag).toBe('error.missingParameter');
			expect(e.translateParams).toHaveProperty('parameter', 'email');
		}
	});

	it('Email inválido', async () => {
		try {
			await useCase.execute('noesunmail');
		} catch (error) {
			expect(error).toBeInstanceOf(CustomError);
			const e = error as CustomError;
			expect(e.translateTag).toBe('error.invalidEmail');
		}
	});

	it('Obtener usuario inexistente', async () => {
		const user = await useCase.execute('noexiste@email.com');
		expect(user).toBeUndefined();
	});
});
