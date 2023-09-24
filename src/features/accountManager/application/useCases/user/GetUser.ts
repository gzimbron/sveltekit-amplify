import CustomError from '$core/entities/CustomError';
import cleanEmail from '$core/functions/cleanEmail';
import validEmail from '$core/functions/validEmail';
import UseCase from '$core/interfaces/UseCase';
import type User from '$features/accountManager/domain/entities/User';
import type IUserRepository from '$features/accountManager/domain/repositories/IUserRepository';

type GetUserReturn = User | undefined;

export default class GetUser extends UseCase<IUserRepository, GetUserReturn> {
	async execute(email: string): Promise<GetUserReturn> {
		email = cleanEmail(email);

		if (!email) {
			throw new CustomError({
				translateTag: 'error.missingParameter',
				translateParams: { parameter: 'email' }
			});
		}

		if (!validEmail(email)) {
			throw new CustomError({
				translateTag: 'error.invalidEmail'
			});
		}

		return this.repository.get(email);
	}
}
