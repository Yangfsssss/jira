import React, { useCallback } from 'react';
import { useDocumentTitle } from '../../utils';
import { useKanbans, useReorderKanban } from 'utils/kanban';
import {
  useKanbanQueryKey,
  useKanbanSearchParams,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSearchParams,
} from './util';
import { KanbanColumn } from './kanban-column';
import styled from '@emotion/styled';
import { SearchPanel } from './search-panel';
import { useReorderTask, useTasks } from 'utils/task';
import { Spin } from 'antd';
import { ScreenContainer } from 'components/lib';
import { CreateKanban } from './create-kanban';
import { TaskModal } from './task-modal';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Drag, Drop, DropChild } from 'components/drag-and-drop';

export const KanbanScreen = () => {
  useDocumentTitle('看板列表');

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams());
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());

  const isLoading = kanbanIsLoading || taskIsLoading;

  // console.log('useKanbanSearchParams', useKanbanSearchParams());
  // console.log('useKanbanQueryKey', useKanbanQueryKey());

  const onDragEnd = useDragEnd();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size={'large'} />
        ) : (
          <ColumnsContainer>
            <Drop type={'COLUMN'} direction={'horizontal'} droppableId={'kanban'}>
              <DropChild style={{ display: 'flex' }}>
                {kanbans?.map((kanban, index) => (
                  <Drag key={kanban.id} draggableId={'kanban' + kanban.id} index={index}>
                    <KanbanColumn kanban={kanban} key={kanban.id} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateKanban />
          </ColumnsContainer>
        )}

        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
};

export const useDragEnd = () => {
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { data: allTasks } = useTasks(useTasksSearchParams());

  const { mutateAsync: reorderKanban } = useReorderKanban(useKanbanQueryKey());
  const { mutateAsync: reorderTask } = useReorderTask(useTasksQueryKey());

  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }

      if (type === 'COLUMN') {
        const fromId = kanbans?.[source.index].id;
        const toId = kanbans?.[destination.index].id;

        if (!fromId || !toId || fromId === toId) {
          return;
        }

        const type = destination.index > source.index ? 'after' : 'before';

        reorderKanban({ fromId, referenceId: toId, type });
      }

      if (type === 'ROW') {
        const fromKanbanId = Number(source.droppableId);
        const toKanbanId = Number(destination.droppableId);

        // if (fromKanbanId === toKanbanId) {
        //   console.log('fromKanbanId', fromKanbanId);
        //   console.log('toKanbanId', toKanbanId);
        //   console.log('stopped');

        //   return;
        // }

        const fromTask = allTasks?.filter((task) => task.kanbanId === fromKanbanId)[source.index]!;
        const toTask = allTasks?.filter((task) => task.kanbanId === toKanbanId)[destination.index]!;

        if (fromTask?.id === toTask?.id) {
          return;
        }

        const type = fromKanbanId === toKanbanId && destination.index > source.index ? 'after' : 'before';

        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId,
          toKanbanId,
          type,
        });
      }
    },
    [kanbans, reorderKanban, allTasks, reorderTask]
  );
};

export const ColumnsContainer = styled('div')`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
