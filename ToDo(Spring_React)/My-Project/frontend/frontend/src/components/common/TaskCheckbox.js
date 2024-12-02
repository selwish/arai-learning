import React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import { updateTask } from '../services/taskService';

export default function TaskCheckbox({ task, onUpdate }) {
  const handleToggle = async () => {
    const updatedTask = { ...task, isCompleted: !task.isCompleted };
    const result = await updateTask(task.id, updatedTask);

    if (result && onUpdate) {
      onUpdate(result); // 親コンポーネントに変更を通知
    } else {
      console.error('タスクの更新に失敗しました');
    }
  };

  return (
    <ListItemIcon
      sx={{
        minWidth: 'auto',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Checkbox
        edge="start"
        checked={task.isCompleted} // 親から受け取った値を使用
        tabIndex={-1}
        disableRipple
        onClick={handleToggle}
        inputProps={{ 'aria-labelledby': task.id }}
      />
    </ListItemIcon>
  );
}
