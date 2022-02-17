import { regex, regex2 } from './Helpers/constants'

export const nameReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return {
			value: action.val,
			isValid: regex2.test(action.val),
		}
	}
	if (action.type === 'INPUT_BLUR') {
		return {
			value: state.value,
			isValid: regex2.test(state.value) ? true : false,
			error: regex2.test(state.value)
				? ''
				: state.value === ''
				? 'Введите логин'
				: 'Некорректный логин',
		}
	}
	return {
		value: '',
		isValid: false,
	}
}

export const emailReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return {
			value: action.val,
			isValid: regex.test(action.val),
			// error: 'e-mail address should include "@"',
		}
	}
	if (action.type === 'INPUT_BLUR') {
		return {
			value: state.value,
			isValid: regex.test(state.value) ? true : false,
			error: regex.test(state.value)
				? ''
				: state.value === ''
				? 'enter e-mail address'
				: 'e-mail should includes "@~.com" ',
		}
	}
	return {
		value: '',
		isValid: false,
	}
}

export const passwordReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return {
			value: action.val,
			isValid: action.val.trim().length > 5,
			// error: 'password should be more than 5',
		}
	}
	if (action.type === 'INPUT_BLUR') {
		return {
			value: state.passwordState,
			isValid: state.value.length > 5 ? true : false,
			error:
				state.value.length > 5
					? ''
					: state.value === ''
					? 'enter a password'
					: 'password should be more than 5',
		}
	}
	return {
		value: '',
		isValid: false,
	}
}
