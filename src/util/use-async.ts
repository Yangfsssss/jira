import { useState } from 'react';

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitialStat: State<null> = {
  stat: 'idle',
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = { ...defaultConfig, ...initialConfig };

  const [state, setState] = useState<State<D>>({
    ...defaultInitialStat,
    ...initialState,
  });

  //useState直接传入函数的意义是：惰性初始化；所以要用useState保存函数，不能只接传入函数
  const [retry, setRetry] = useState(() => () => {});

  const setData = (data: D) =>
    setState({
      data,
      stat: 'success',
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      error,
      stat: 'error',
      data: null,
    });

  //run用来处理异步请求
  const run = (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
    if (!promise || !promise.then) {
      throw new Error('请传入 Promise 类型数据');
    }

    setRetry(() => () => {
      if (runConfig?.retry !== undefined && typeof runConfig.retry === 'function') {
        run(runConfig.retry(), runConfig);
      }
    });

    setState({ ...state, stat: 'loading' });

    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);

        if (config.throwOnError) {
          return Promise.reject(error);
        }

        return error;
      });
  };

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    setData,
    setError,
    run,
    //retry被调用时重新调用一次run，让state刷新一遍
    retry,
    ...state,
  };
};
