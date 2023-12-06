import './App.css';
import React from 'react';
import { userValidation } from './validations';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export const App = () => {
	const [error, setError] = React.useState('');
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			repeatPassword: ''
		},
		resolver: yupResolver(userValidation)
	});

	const sendFormData = formData => {
		console.log(formData);
	};

	React.useEffect(() => {
		setError(
			errors.email?.message ||
				errors.password?.message ||
				errors.repeatPassword?.message ||
				''
		);
	}, [errors]);
	return (
		<div className='App'>
			<form className='App__form' onSubmit={handleSubmit(sendFormData)}>
				<input
					{...register('email')}
					name='email'
					className='App__input'
					type='text'
					placeholder='Email'
				/>
				<input
					{...register('password')}
					name='password'
					className='App__input'
					type='password'
					placeholder='Password'
				/>
				<input
					{...register('repeatPassword')}
					name='repeatPassword'
					className='App__input'
					type='password'
					placeholder='Repeat password'
				/>

				<button className='App_btn' type='submit'>
					Зарегистрироваться
				</button>
			</form>
			<div className='App__error'>{error && <div>{error}</div>}</div>
		</div>
	);
};
