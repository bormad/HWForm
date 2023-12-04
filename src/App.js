import './App.css';
import React from 'react';
import { userValidation } from './validations';

export const App = () => {
	const [inputValue, setInputValue] = React.useState({
		email: '',
		password: '',
		repeatPassword: ''
	});
	const [error, setError] = React.useState(true);
	const submitButtonRef = React.useRef(null);

	const onChangeInput = (key, value) => {
		setInputValue(prev => ({ ...prev, [key]: value }));
	};

	const onClickBtn = event => {
		event.preventDefault();
		console.log(inputValue);
		setInputValue({
			email: '',
			password: '',
			repeatPassword: ''
		});
		setError(true);
	};

	React.useEffect(() => {
		const validateInput = async () => {
			try {
				await userValidation.validate(inputValue);
				setError(null);
			} catch (error) {
				setError(error.message);
			}
		};

		validateInput();
	}, [inputValue]);

	React.useEffect(() => {
		if (!error) {
			submitButtonRef.current.focus();
		}
	}, [error]);

	return (
		<div className='App'>
			<form className='App__form'>
				<input
					name='email'
					value={inputValue.email}
					onChange={({ target }) => onChangeInput('email', target.value)}
					className='App__input'
					type='text'
					placeholder='Email'
				/>
				<input
					name='password'
					value={inputValue.password}
					onChange={({ target }) => onChangeInput('password', target.value)}
					className='App__input'
					type='password'
					placeholder='Password'
				/>
				<input
					name='repeatPassword'
					value={inputValue.repeatPassword}
					onChange={({ target }) =>
						onChangeInput('repeatPassword', target.value)
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
					disabled={!!error}
				>
					Зарегистрироваться
				</button>
			</form>
			{error && <div className='App__error'>{error}</div>}
		</div>
	);
};
