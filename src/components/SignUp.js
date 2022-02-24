import classes from './SignUp.module.css'
import { nameReducer, emailReducer, passwordReducer } from '../reducer'
import { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
	const navigate = useNavigate()

	const [formIsValid, setFormIsValid] = useState(false)
	const [nameState, dispatchName] = useReducer(nameReducer, {
		value: '',
		isValid: null,
		error: '',
	})
	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: '',
		isValid: null,
		error: '',
	})
	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: '',
		isValid: null,
		error: '',
	})

	useEffect(() => {
		setFormIsValid(
			nameState.isValid && emailState.isValid && passwordState.isValid,
		)
	}, [nameState.isValid, emailState.isValid, passwordState.isValid])

	const nameChangeHandler = (event) => {
		dispatchName({ type: 'USER_INPUT', val: event.target.value })
	}
	const validateNameHandler = (event) => {
		dispatchName({ type: 'INPUT_BLUR' })
	}

	const emailChangeHandler = (event) => {
		dispatchEmail({ type: 'USER_INPUT', val: event.target.value })
	}

	const validateEmailHandler = () => {
		dispatchEmail({ type: 'INPUT_BLUR' })
	}

	const passwordHandler = (event) => {
		dispatchPassword({ type: 'USER_INPUT', val: event.target.value })
	}

	const validatePasswordHandler = (event) => {
		dispatchPassword({ type: 'INPUT_BLUR', val: event.target.value })
	}

	async function addUserHandler(user) {
		const response = await fetch(
			'https://login-page-users-default-rtdb.firebaseio.com/users.json',
			{
				method: 'POST',
				body: JSON.stringify(user),
				headers: {
					'Content-type': 'application/json',
				},
			},
		)
		const data = await response.json()
		console.log(data)
	}
	const submitHandler = (event) => {
		event.preventDefault()
		const user = {
			userName: nameState.value,
			eMail: emailState.value,
			password: passwordState.value,
		}
		addUserHandler(user)
		return navigate('/WelcomePage')
	}
	return (
		<div className={classes.app}>
			<form onSubmit={submitHandler}>
				<h1>Register</h1>
				<div>
					<label>User Name</label>
					<input
						className={`${
							nameState.isValid === false && classes.invalid
						} `}
						placeholder='name'
						onChange={nameChangeHandler}
						type='text'
						onBlur={validateNameHandler}
						name='username'
					/>
					<span>{nameState.isValid ? '' : nameState.error}</span>
					<label>E-mail:</label>
					<input
						placeholder='e-mail'
						onChange={emailChangeHandler}
						type='email'
						onBlur={validateEmailHandler}
						name='email'
					/>
					<span>{emailState.isValid ? '' : emailState.error} </span>
					<label>Password:</label>
					<input
						placeholder='password'
						type='password'
						onChange={passwordHandler}
						onBlur={validatePasswordHandler}
						name='password'
					/>
					<span>
						{passwordState.isValid ? '' : passwordState.error}
					</span>
				</div>

				<button type='submit' disabled={!formIsValid}>
					submit
				</button>
			</form>
		</div>
	)
}

export default SignUp
