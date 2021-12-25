import { useMemo } from 'react';
import { useProject } from 'util/project';
import { useUrlQueryParam } from 'util/url';

//项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId']);
  return [useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]), setParam] as const;
};

export const useProjectsQueryKey = () => {
  const [param] = useProjectsSearchParams();
  return ['projects', param];
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate']);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam(['editingProjectId']);

  const { data: editingProject, isLoading } = useProject(Number(editingProjectId));

  const open = () => setProjectCreate({ projectCreate: true });
  const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id });

  const close = () => {
    setProjectCreate({ projectCreate: undefined });
    setEditingProjectId({ editingProjectId: undefined });
  };

  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId) === true,
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
