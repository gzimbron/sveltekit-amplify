import CustomError from '$core/entities/CustomError';
import cleanEmail from '$core/functions/cleanEmail';
import validEmail from '$core/functions/validEmail';
import UseCase from '$core/interfaces/UseCase';
import type User from '$features/accountManager/domain/entities/User';
import type IUserRepository from '$features/accountManager/domain/repositories/IUserRepository';

interface UpdateUserParams {
	email: string;
	updateParams: Partial<Omit<User, 'id' | 'email'>>;
}

export default class UpdateUser extends UseCase<IUserRepository, User> {
	async execute({ email, updateParams }: UpdateUserParams): Promise<User> {
		email = cleanEmail(email);

		if (!validEmail(email)) {
			throw new CustomError({
				translateTag: 'error.invalidEmail'
			});
		}

		if (!updateParams || Object.keys(updateParams).length === 0) {
			throw new CustomError({
				translateTag: 'error.noParamsToUpdate'
			});
		}

		return this.repository.update(email, updateParams);
	}
}
