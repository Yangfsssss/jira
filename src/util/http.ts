import { useCallback } from 'react';
import qs from 'qs';
import * as auth from '../auth-provider';
import { useAuth } from '../context/auth-context';

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  //axios和fetch的表现不一样，axios可以直接在返回状态不为2xx的时侯抛出异常
  return fetch(`${apiUrl}/${endpoint}`, config).then(async (response) => {
    if (response.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: '请重新登录！' });
    }

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

//如果函数（非函数组件）中需要使用hook，那么该函数也一定是一个hook
export const useHttp = () => {
  const { user } = useAuth();

  //TODO 讲解TS Utility type
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) => {
      return http(endpoint, { ...config, token: user?.token });
    },
    [user?.token]
  );
};

//类型别名，interface在这种情况下无法代替type
// type favoriteNumber = string | number;
// let roseFavoriteNumber: favoriteNumber = '6';

//interface也无法实现utility type
// type Person = {
// 	name: string;
// 	age: number;
// 	height: number;
// };
// const xiaoMing: Partial<Person> = {};
// type shenMiRen = Omit<Person, 'name' | 'age'>;

//keyof操作符，能将类型别名中的key全部取出，并组合成一个新的类型别名，类似于Object.keys()
// type PersonKeys = keyof Person;
//in操作符，代表遍历，类似于for...in...

//Pick的实现
//From T, pick a set of properties whose keys are in the union K
// type PersonOnlyName = Pick<Person, 'name'>;
//类似于Person.name
// type Pick<T, K extends keyof T> = {
// 	[P in K]: T[P];
// };

//Exclude的实现
//Exclude from T those types that are assignable to U
// type AgeAndHeight = Exclude<PersonKeys, 'name'>;
//类似于Person.map(item=>item !== 'name')
// type Exclude<T, U> = T extends U ? never : T;

//Partial的实现
//Make all properties in T optional
// type Partial<T> = {
//有限表达式，问号（?）与冒号（:）不参与运算
//类似于`${for const P in Object.keys(T)}?:${T[P]}`
// 	[P in keyof T]?: T[P];
// };

//Omit的实现
//Construct a type with the properties of T except for those in type K.
// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
