import { useQuery } from 'react-query';
import { User } from '../types/user';
import { useHttp } from './http';

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();

  return useQuery<User[]>(['users', param], () => client('users', { data: param }));
};

// export const useUsers = (param?: Partial<User>) => {
//   const { run, ...result } = useAsync<User[]>();

//   const client = useHttp();

//   useEffect(() => {
//     run(client('users', { data: cleanObject(param || {}) }));
//   }, [param, run, client]);

//   return result;
// };
