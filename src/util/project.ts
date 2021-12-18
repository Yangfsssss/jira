import { useEffect } from 'react';
import { cleanObject } from '.';
import { Project } from '../screens/project-list/list';
import { useHttp } from './http';
import { useAsync } from './use-async';

export const useProject = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();

  const client = useHttp();

  useEffect(() => {
    run(client('projects', { data: cleanObject(param || {}) }));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
