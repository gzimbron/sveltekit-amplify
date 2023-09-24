import GetUser from '$features/accountManager/application/useCases/user/GetUser';
import MockUserRepository from '$features/accountManager/infrastructure/repositories/MockUser.repository';

const repository = new MockUserRepository();

export default class UserController {
	static prueba = async () => {
		const usecase = new GetUser(repository);

		const user = await usecase.execute('dddd');

		console.log(user);
	};
}
