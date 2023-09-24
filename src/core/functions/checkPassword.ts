import z from 'zod';

// usar zod para verificar password: mínimo 6 caracteres, debe incluir 1 numero 1 mayuscula y 1 simbolo

const schema = z
	.string()
	.min(6)
	.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/);

export default function isValidPassword(input: string): boolean {
	return schema.safeParse(input).success;
}
