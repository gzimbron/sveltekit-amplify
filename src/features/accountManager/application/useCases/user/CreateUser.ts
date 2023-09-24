import CustomError from '$core/entities/CustomError';
import cleanEmail from '$core/functions/cleanEmail';
import UseCase from '$core/interfaces/UseCase';
import User, { userSchema } from '$features/accountManager/domain/entities/User';
import type IUserRepository from '$features/accountManager/domain/repositories/IUserRepository';

type CreateUserParams = Omit<User, 'id'>;

export default class CreateUser extends UseCase<IUserRepository, User> {
	async execute({ email, name, last_name }: CreateUserParams): Promise<User> {
		email = cleanEmail(email);
		name = name.trim();
		last_name = last_name.trim();

		const result = userSchema.safeParse({ email, name, last_name });
		if (!result.success) {
			throw new CustomError({
				translateTag: 'error.missingParameters',
				translateParams: { parameters: result.error.issues.map((issue) => issue.path.join('.')) }
			});
		}

		const existe = await this.repository.get(email);

		if (existe) {
			throw new CustomError({
				translateTag: 'error.emailAlreadyRegistered'
			});
		}

		return this.repository.create(
			new User({
				email,
				name,
				last_name
			})
		);
	}
}
