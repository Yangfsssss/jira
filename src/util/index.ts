import { useEffect, useRef, useState } from 'react';

// const isFalsy = (value: unknown) => (value === 0 ? false : !value);

//解决删除value为false字面量的属性的bug
const isVoid = (value: unknown) => value === undefined || value === null || value === '';
// object类型的问题
// let a:object;
// a = {name:'jack'}
// a = ()=>{}
// a = new RegExp('')

// let b : {[key: string]:unknown}
// b = {name:'jack'}
// b = ()=>{}

//在一个函数里，改变传入的对象是不好的
export const cleanObject = (obj: { [key: string]: unknown }) => {
  const result = { ...obj };

  Object.keys(result).forEach((key) => {
    const value = result[key];

    if (isVoid(value)) {
      delete result[key];
    }
  });

  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    //TODO 依赖项里加上callback会造成无限循环，这个和useCallback和useMemo有关系
  }, []);
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

export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
  const oldTitle = useRef(document.title).current;
  // const oldTitle = document.title;
  //页面加载时：旧title
  //加载后：新title

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (keepOnUnmount === false) {
        //如果不指定依赖，加载的就是旧title
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

export const resetRoute = () => {
  window.location.href = window.location.origin;
  return;
};
