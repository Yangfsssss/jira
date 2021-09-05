import { log } from 'console';
import { SyntheticEvent, useState } from 'react';

const calculateExponent = (base: number, exponent: number) => base ** exponent;

const useExponentCalculator = () => {
	const [base, setBase] = useState(4);
	const [exponent, setExponent] = useState(4);

	const result = calculateExponent(base, exponent).toFixed(2);

	const handleBaseChange = (e: SyntheticEvent<HTMLInputElement>) => {
		e.preventDefault();
		//@ts-ignore
		// console.log(e.target.value, typeof e.target.value);
		// console.log(e.currentTarget.value, typeof e.currentTarget.value);
		// setBase(Number(e.currentTarget.value))
	};

	const handleExponentChange = (e: any) => {
		e.preventDefault();
		setExponent(e.target.value);
	};

	return {
		base,
		exponent,
		result,
		handleBaseChange,
		handleExponentChange,
	};
};

export const ExponentCalculator = () => {
	const { base, exponent, result, handleBaseChange, handleExponentChange } = useExponentCalculator();

	return (
		<div className='blue-wrapper'>
			<input type='number' className='base' onChange={handleBaseChange} placeholder='Base' value={base} />
			<input type='number' className='exponent' onChange={handleExponentChange} placeholder='Exp.' value={exponent} />
			<h1 className='result'>{result}</h1>
		</div>
	);
};
