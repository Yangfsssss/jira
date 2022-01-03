import { useProjectIdInUrl } from 'screens/kanban/util';

export const useEpicSearchParams = () => ({ projectId: useProjectIdInUrl() }); //{projectId:2}

export const useEpicQueryKey = () => ['epics', useEpicSearchParams()]; //['Epics',{projectId:2}]
