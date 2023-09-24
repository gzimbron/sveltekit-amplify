import { z } from 'zod';

export const userSchema = z.object({
	id: z.string().optional(),
	email: z.string().email(),
	name: z.string(),
	last_name: z.string()
});

export type UserDTO = z.infer<typeof userSchema>;

export default class User {
	readonly id: string;
	email: string;
	name: string;
	last_name: string;

	constructor(data: UserDTO) {
		this.id = data.id ?? '';
		this.email = data.email ?? '';
		this.name = data.name ?? '';
		this.last_name = data.last_name ?? '';
	}
}
