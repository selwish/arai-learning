import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Divider,
  Box,
  Button,
  Alert,
} from '@mui/material';
import PickerWithButtonField from '../../common/PickerWithButtonField';
import MenuListComposition from '../../common/MenuListComposition';
import TaskCheckbox from '../../common/TaskCheckbox';
import { handleTaskSubmit } from '../TaskDetails/createTask';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function TaskList({
  tasks,
  onTaskClick,
  onTaskCreate,
  onTaskUpdate,
  onTaskDelete,
}) {
  const [taskTitle, setTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  // アラートを表示
  const showAlertMessage = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  // タスク作成時のロジック
  const handleSubmit = async () => {
    if (!taskTitle || !dueDate) {
      showAlertMessage('タスク名と期日は必須です', 'warning');
      return;
    }

    const formattedDueDate = dayjs(dueDate)
      .tz('Asia/Tokyo')
      .format('YYYY-MM-DDTHH:mm:ss');

    const newTask = {
      userId: 1,
      typeId: 1,
      listId: 1,
      title: taskTitle,
      description: '',
      dueDate: formattedDueDate,
      priority: 1,
      isPinned: false,
      isCompleted: false,
      isDelete: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await handleTaskSubmit(newTask, onTaskCreate, showAlertMessage);

    setTaskTitle('');
    setDueDate(null);
  };

  return (
    <>
      {/* アラート表示領域 */}
      {showAlert && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '40%',
            zIndex: 1300,
            transition: 'opacity 0.3s ease, transform 0.5s ease',
          }}
        >
          <Alert severity={alertSeverity} onClose={() => setShowAlert(false)}>
            {alertMessage}
          </Alert>
        </Box>
      )}

      {/* 入力エリア */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '16px',
          gap: '8px',
          width: '100%',
        }}
      >
        <TextField
          id="task-title"
          label="+ タスク名"
          variant="outlined"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          sx={{
            flex: 1,
            width: '100%',
          }}
        />

        <PickerWithButtonField
          value={dueDate}
          onChange={(newValue) => setDueDate(newValue)}
          sx={{ flexShrink: 0 }}
        />
      </Box>

      {/* タスク作成ボタン */}
      <Button variant="contained" onClick={handleSubmit}>
        タスクを作成
      </Button>

      {/* タスクリスト */}
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {tasks &&
          tasks.map((task, index) => (
            <React.Fragment key={task.id}>
              <ListItem disablePadding>
                {/* チェックボックス */}
                <TaskCheckbox task={task} onUpdate={onTaskUpdate} />

                {/* タスクタイトル */}
                <ListItemButton onClick={() => onTaskClick(task.id)}>
                  <ListItemText id={task.id} primary={task.title} />
                </ListItemButton>

                {/* タスクMENU */}
                <MenuListComposition
                  taskId={task.id}
                  onDelete={() => {
                    onTaskDelete();
                    showAlertMessage('タスクが削除されました', 'success');
                  }}
                />
              </ListItem>
              {index < tasks.length - 1 && (
                <Divider component="li" sx={{ width: '100%' }} />
              )}
            </React.Fragment>
          ))}
      </List>
    </>
  );
}

TaskList.defaultProps = {
  onTaskClick: () => {},
  onTaskCreate: () => {},
  onTaskUpdate: () => {},
  onTaskDelete: () => {},
};
