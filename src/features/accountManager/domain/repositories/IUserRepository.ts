import type BaseRepository from '$core/interfaces/BaseRepository';

import type User from '$features/accountManager/domain/entities/User';

export default interface IUserRepository extends BaseRepository {
	signUp(email: string, password: string, preRegistered: boolean): Promise<unknown>;
	create(user: User): Promise<User>;
	get(email: string): Promise<User | undefined>;
	update(email: string, updateParams: Partial<User>): Promise<User>;
}
