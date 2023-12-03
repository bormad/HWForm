import './App.css';
import React from 'react';

export const App = () => {
	const EMAIL_REGEXP =
		/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
	const [inputValue, setInputValue] = React.useState({
		email: '',
		password: '',
		repeatPassword: ''
	});
	const [error, setError] = React.useState('Заполните все поля');
	const submitButtonRef = React.useRef(null);

	const validations = (key, newValue) => {
		let newError = null;
		if (key === 'email' && !EMAIL_REGEXP.test(newValue)) {
			newError = 'Неверный Email';
		} else if (key === 'password' && newValue.length < 3) {
			newError = 'Пароль слишком короткий';
		} else if (key === 'repeatPassword' && newValue !== inputValue.password) {
			newError = 'Пароли не совпадают';
		} else {
			const fillinInAlFields = Object.values(inputValue).some(
				value => value.length === 0
			);
			if (fillinInAlFields) {
				newError = 'Заполните все поля';
			}
		}
		setError(newError);
	};

	const onChangeInput = (key, newValue) => {
		validations(key, newValue);
		setInputValue({ ...inputValue, [key]: newValue });

		if (key === 'repeatPassword' && newValue === inputValue.password) {
			submitButtonRef.current.focus();
		}
	};

	const onClickBtn = event => {
		event.preventDefault();
		console.log(inputValue);
		setInputValue({
			email: '',
			password: '',
			repeatPassword: ''
		});
		setError('Вы не заполнили все поля');
	};
	return (
		<div className='App'>
			<form className='App__form'>
				<input
					name='email'
					value={inputValue.email}
					onChange={event => onChangeInput('email', event.target.value)}
					className='App__input'
					type='text'
					placeholder='Email'
				/>
				<input
					name='password'
					value={inputValue.password}
					onChange={event => onChangeInput('password', event.target.value)}
					className='App__input'
					type='password'
					placeholder='Password'
				/>
				<input
					name='repeatPassword'
					value={inputValue.repeatPassword}
					onChange={event =>
						onChangeInput('repeatPassword', event.target.value)
					}
					className='App__input'
					type='password'
					placeholder='Repeat password'
				/>
				<button
					className='App_btn'
					ref={submitButtonRef}
					onClick={onClickBtn}
					type='submit'
					disabled={error}
				>
					Зарегистрироваться
				</button>
			</form>
			{error && <div className='App__error'>{error}</div>}
		</div>
	);
};
