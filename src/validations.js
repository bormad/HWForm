import * as yup from 'yup';

export const userValidation = yup.object({
	password: yup
		.string()
		.required('Пароль обязательное поле')
		.min(3, 'Пароль должен быть минимум 3 символа'),
	email: yup
		.string()
		.required('Email обязательное поле')
		.email('Неправильно введен Email'),

	repeatPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают')
});
