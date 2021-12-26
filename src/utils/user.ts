import { useEffect } from 'react';
import { cleanObject } from '.';
import { User } from '../types/user';
import { useHttp } from './http';
import { useAsync } from './use-async';

export const useUsers = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();

  const client = useHttp();

  useEffect(() => {
    run(client('users', { data: cleanObject(param || {}) }));
  }, [param, run, client]);

  return result;
};
