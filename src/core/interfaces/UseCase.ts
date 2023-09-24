import type BaseRepository from './BaseRepository';

export default abstract class UseCase<TRepository extends BaseRepository, UResponse = void> {
	constructor(protected repository: TRepository) {}
	abstract execute(parameters: unknown): Promise<UResponse>;
}
