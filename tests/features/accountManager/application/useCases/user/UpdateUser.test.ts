import CustomError from '$core/entities/CustomError';
import UpdateUser from '$features/accountManager/application/useCases/user/UpdateUser';
import User from '$features/accountManager/domain/entities/User';
import MockUserRepository from '$features/accountManager/infrastructure/repositories/MockUser.repository';
import {
	testEmail,
	testLastName,
	testName
} from '$tests/features/accountManager/accountTestHelpters';
import { beforeEach, describe, expect, it } from 'vitest';

describe('UpdateUser Test', () => {
	let useCase: UpdateUser;

	beforeEach(() => {
		const repository = new MockUserRepository();

		repository.create(
			new User({
				email: testEmail,
				name: testName,
				last_name: testLastName
			})
		);

		useCase = new UpdateUser(repository);
	});

	it('Actualización exitosa', async () => {
		const newLastName = 'New Last Name';

		const updatedUser = await useCase.execute({
			email: testEmail,
			updateParams: {
				last_name: newLastName
			}
		});

		expect(updatedUser.name).toBe(testName);
		expect(updatedUser.last_name).toBe(newLastName);
	});

	it('Email formato inválido', async () => {
		try {
			await useCase.execute({
				email: '',
				updateParams: {
					last_name: 'XXXXXX'
				}
			});
		} catch (error) {
			expect(error).toBeInstanceOf(CustomError);
			const e = error as CustomError;
			expect(e.translateTag).toBe('error.invalidEmail');
		}
	});

	it('Sin cambios', async () => {
		try {
			await useCase.execute({
				email: testEmail,
				updateParams: {}
			});
		} catch (error) {
			expect(error).toBeInstanceOf(CustomError);
			const e = error as CustomError;
			expect(e.translateTag).toBe('error.noParamsToUpdate');
		}
	});
});
