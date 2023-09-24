import CustomError from '$core/entities/CustomError';
import isValidPassword from '$core/functions/checkPassword';
import cleanEmail from '$core/functions/cleanEmail';
import validEmail from '$core/functions/validEmail';
import UseCase from '$core/interfaces/UseCase';
import type IUserRepository from '$features/accountManager/domain/repositories/IUserRepository';

interface SignupUserParams {
	email: string;
	password: string;
	verified?: boolean;
}

export default class SignupUser extends UseCase<IUserRepository, unknown> {
	async execute({ email, password, verified = false }: SignupUserParams): Promise<unknown> {
		email = cleanEmail(email);

		if (!validEmail(email)) {
			throw new CustomError({
				translateTag: 'error.invalidEmail'
			});
		}

		if (!isValidPassword(password)) {
			throw new CustomError({
				translateTag: 'error.invalidPasswordFormat'
			});
		}

		const existe = await this.repository.get(email);

		if (existe) {
			throw new CustomError({
				translateTag: 'error.emailAlreadyRegistered'
			});
		}

		return this.repository.signUp(email, password, verified);
	}
}
