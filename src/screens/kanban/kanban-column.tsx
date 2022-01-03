import { Kanban } from 'types/kanban';
import { useTasks } from 'utils/task';
import { useTaskTypes } from 'utils/task-type';
import { useKanbanQueryKey, useTasksModal, useTasksSearchParams } from './util';

import taskIcon from '../../assets/task.svg';
import bugIcon from '../../assets/bug.svg';
import styled from '@emotion/styled';
import { Button, Card, Dropdown, Menu, Modal } from 'antd';
import { CreateTask } from './create-tasks';
import { Task } from 'types/task';
import { Mark } from 'components/mark';
import { useDeleteKanban } from 'utils/kanban';
import { Row } from 'components/lib';
import React from 'react';
import { Drag, Drop, DropChild } from 'components/drag-and-drop';

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;

  if (!name) {
    return null;
  }

  return <img src={name === 'task' ? taskIcon : bugIcon} alt="icon" />;
};

const TaskCard = ({ task }: { task: Task }) => {
  const { startEditing } = useTasksModal();
  const { name: keyword } = useTasksSearchParams();

  return (
    <Card style={{ marginBottom: '0.5rem', cursor: 'pointer' }} onClick={() => startEditing(task.id)} key={task.id}>
      <p>
        <Mark name={task.name} keyword={keyword} />
      </p>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};

export const KanbanColumn = React.forwardRef<HTMLDivElement, { kanban: Kanban }>(({ kanban, ...props }, ref) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  return (
    <Container {...props} ref={ref}>
      <Row between>
        <h3>{kanban.name}</h3>
        <More kanban={kanban} key={kanban.id} />
      </Row>
      <TasksContainer>
        <Drop type={'ROW'} direction={'vertical'} droppableId={String(kanban.id)}>
          <DropChild style={{ minHeight: '5px' }}>
            {tasks?.map((task, taskIndex) => (
              <Drag key={task.id} index={taskIndex} draggableId={'task' + task.id}>
                <div>
                  <TaskCard task={task} key={task.id} />
                </div>
              </Drag>
            ))}
          </DropChild>
        </Drop>
        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </Container>
  );
});

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync: deleteKanban } = useDeleteKanban(useKanbanQueryKey());

  const startEditing = () => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除看板吗？',
      onOk() {
        deleteKanban(kanban.id);
      },
    });
  };

  const overlay = (
    <Menu>
      <Menu.Item key={kanban.id}>
        <Button type={'link'} onClick={startEditing}>
          删除
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={overlay}>
      <Button type={'link'}>...</Button>
    </Dropdown>
  );
};

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::webkit-scrollbar {
    display: none;
  }
`;
