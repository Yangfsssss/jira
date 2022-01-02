import { QueryKey, useMutation, useQuery } from 'react-query';
import { Task } from 'types/task';
import { Project } from '../types/project';
import { useHttp } from './http';
import { useAddConfig, useDeleteConfig, useEditConfig } from './use-optimistic-options';

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[]>(['projects', param], () => client('projects', { data: param }));
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH',
      }),
    useEditConfig(queryKey)
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: 'POST',
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (id: number) =>
      client(`projects/${id}`, {
        method: 'DELETE',
      }),
    useDeleteConfig(queryKey)
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();

  return useQuery<Project>(['project', { id }], () => client(`projects/${id}`), { enabled: Boolean(id) });
};

export const useTask = (id?: number) => {
  const client = useHttp();

  return useQuery<Task>(['task', { id }], () => client(`tasks/${id}`), { enabled: Boolean(id) });
};

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        data: params,
        method: 'PATCH',
      }),
    useEditConfig(queryKey)
  );
};
