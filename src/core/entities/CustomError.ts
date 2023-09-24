interface CustomErrorProps {
	readonly translateTag: string;
	readonly translateParams?: object;
	readonly code?: string;
}

export default class CustomError extends Error {
	readonly translateTag: string;
	readonly code?: string;
	readonly translateParams?: object;

	constructor(translationProps: CustomErrorProps) {
		super(translationProps.translateTag);

		this.translateTag = translationProps.translateTag;
		this.translateParams = translationProps?.translateParams;
		this.code = translationProps?.code;
	}
}
