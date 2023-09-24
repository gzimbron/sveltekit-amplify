import z from 'zod';

export default function validEmail(email: string): boolean {
	const schema = z.string().email();

	return schema.safeParse(email).success;
}
