import { useState, useEffect } from 'react';

const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const cleanObject = (obj: object) => {
	const result = { ...obj };

	Object.keys(result).forEach((key) => {
		//@ts-ignore
		const value = result[key];

		if (isFalsy(value)) {
			//@ts-ignore
			delete result[key];
		}
	});

	return result;
};

export const useMount = (callback: () => void) => {
	useEffect(() => {
		callback();
	});
};

export const useDebounce = <V>(value: V, delay?: number) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		//加载时设置定时任务，delay时间后将值更新
		const timeout = setTimeout(() => setDebouncedValue(value), delay);

		//卸载（更新时）清除掉该定时任务，若加载至更新的时间小于delay，那么加载时的定时任务将被清除，不会执行
		//在用户最后一次输入后，value变化，useEffect执行，设置最后一个定时任务，delay时间之后，将value更新为
		//新值
		return () => clearTimeout(timeout);
	}, [value, delay]);

	return debouncedValue;
};

export const useArray = <T>(value: T[]) => {
	const [array, setArray] = useState(value);

	const clear = () => {
		setArray([]);
	};

	const removeIndex = (index: number) => {
		const newArray = array.filter((item) => item !== array[index]);
		setArray(newArray);
	};

	const add = (value: T) => {
		setArray([...array, value]);
	};

	return { array, clear, removeIndex, add };
};
