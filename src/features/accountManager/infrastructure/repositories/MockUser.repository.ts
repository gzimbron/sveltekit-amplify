import CustomError from '$core/entities/CustomError';
import type User from '$features/accountManager/domain/entities/User';
import type IUserRepository from '$features/accountManager/domain/repositories/IUserRepository';

export default class MockUserRepository implements IUserRepository {
	private users: User[];
	private accounts: string[];

	constructor() {
		this.users = [];
		this.accounts = [];
	}

	async signUp(email: string, password: string, preRegistered: boolean): Promise<void> {
		if (this.accounts.includes(email)) {
			throw new CustomError({ translateTag: 'error.emailAlreadyRegistered' });
		}

		this.accounts.push(email);

		console.log('registro exitoso!', { email, password, preRegistered });
	}

	async create(user: User): Promise<User> {
		this.users.push(user);
		return user;
	}

	async get(email: string): Promise<User | undefined> {
		return this.users.find((user) => user.email === email);
	}

	async update(email: string, updateParams: Partial<User>): Promise<User> {
		const user = this.users.find((user) => user.email === email);

		if (!user) {
			throw new Error('User not found');
		}

		Object.assign(user, updateParams);

		return user;
	}
}
