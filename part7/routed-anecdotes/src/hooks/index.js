import { useState } from 'react';

export const useField = type => {
	const [ value, setValue ] = useState('');

	const onChange = event => {
		setValue(event.target.value);
	};

	console.log(
		'type, value, onChange',
		type,
		value,
		onChange
	);

	const reset = () => {
		setValue('');
	};

	return {
		type,
		value,
		onChange,
		reset
	};
};
