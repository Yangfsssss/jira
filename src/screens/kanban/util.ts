import { log } from 'console';
import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router';
import { useDebounce } from 'utils';
import { useProject, useTask } from 'utils/project';
import { useUrlQueryParam } from 'utils/url';

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];

  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() }); //{projectId:2}

export const useKanbanQueryKey = () => ['kanbans', useKanbanSearchParams()]; //['kanbans',{projectId:2}]

export const useTasksSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'typeId', 'processorId', 'tagId']);

  const projectId = useProjectIdInUrl();

  const debouncedName = useDebounce(param.name, 200);

  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      // name: debouncedName,
      name: param.name,
    }),
    [projectId, param]
  );
};

export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()];

export const useTasksModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam(['editingTaskId']);

  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));

  const startEditing = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );

  // const startEditing = (id: number) => {
  //   setEditingTaskId({ editingTaskId: id });
  // };

  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: '' });
  }, [setEditingTaskId]);

  // const close = () => {
  //   setEditingTaskId({ editingTaskId: '' });
  // };

  return {
    editingTaskId,
    editingTask,
    close,
    startEditing,
    isLoading,
  };
};
