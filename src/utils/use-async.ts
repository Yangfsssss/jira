import { useMountedRef } from './index';
import { useCallback, useState, useReducer } from 'react';

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

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();

  //为什么不直接返回dispatch？
  //可以直接返回dispatch，但由于每次useReducer生成的dispatch不相等，所以无法用useCallback做优化
  return useCallback(
    (...args: T[]) => (mountedRef.current === true ? dispatch(...args) : undefined),
    [dispatch, mountedRef]
  );
};

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = { ...defaultConfig, ...initialConfig };

  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => {
      return { ...state, ...action };
    },
    {
      ...defaultInitialStat,
      ...initialState,
    }
  );

  const safeDispatch = useSafeDispatch(dispatch);

  //useState直接传入函数的意义是：惰性初始化；所以要用useState保存函数，不能只接传入函数
  const [retry, setRetry] = useState(() => () => {});

  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        stat: 'success',
        error: null,
      }),
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        stat: 'error',
        data: null,
      }),
    [safeDispatch]
  );

  //run用来处理异步请求
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error('请传入 Promise 类型数据');
      }

      setRetry(() => () => {
        if (runConfig?.retry !== undefined && typeof runConfig.retry === 'function') {
          run(runConfig.retry(), runConfig);
        }
      });

      safeDispatch({ stat: 'loading' });

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
    },
    [config.throwOnError, safeDispatch, setData, setError]
  );

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
