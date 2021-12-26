import { useMemo, useState } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { cleanObject, subset } from '.';

/** 返回页面url中，指定键的参数值  */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParams();

  //将传入的参数变为不可变的依赖项
  const [stateKeys] = useState(keys);

  return [
    useMemo(
      () => subset(Object.fromEntries(searchParams), stateKeys) as { [key in K]: string },
      [searchParams, stateKeys]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params);
    },
  ] as const;
};

export const useSetUrlSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit;

    return setSearchParams(o);
  };
};
