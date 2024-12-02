import React, { useState, useEffect } from 'react';
import { Box, IconButton, Menu, MenuItem, Divider, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TaskCheckbox from '../../common/TaskCheckbox';
import FlagIcon from '@mui/icons-material/Flag';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function TaskDetails({ task, onTaskUpdate }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [dueDate, setDueDate] = useState(task?.dueDate ? dayjs(task.dueDate) : null);
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [priority, setPriority] = useState(task?.priority || 1);

  useEffect(() => {
    setDueDate(task?.dueDate ? dayjs(task.dueDate) : null);
    setTitle(task?.title || '');
    setDescription(task?.description || '');
    setPriority(task?.priority || 1);
  }, [task]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePriorityChange = (newPriority) => {
    if (task) {
      const updatedTask = { ...task, priority: newPriority };
      onTaskUpdate(updatedTask);
      setPriority(newPriority);
    }
    handleMenuClose();
  };

  const getPriorityColor = () => {
    switch (priority) {
      case 4:
        return 'red';
      case 3:
        return 'orange';
      case 2:
        return 'blue';
      default:
        return 'gray';
    }
  };

  const handleDateChange = (newDate) => {
    if (task) {
      const formattedDate = newDate
        ? dayjs(newDate).tz('Asia/Tokyo').format('YYYY-MM-DDTHH:mm:ss')
        : null;

      const updatedTask = { ...task, dueDate: formattedDate };
      onTaskUpdate(updatedTask);
      setDueDate(newDate);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTitleUpdate = () => {
    if (task && title !== task.title) {
      const updatedTask = { ...task, title };
      onTaskUpdate(updatedTask);
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDescriptionUpdate = () => {
    if (task && description !== task.description) {
      const updatedTask = { ...task, description };
      onTaskUpdate(updatedTask);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTitleUpdate();
      e.target.blur();
    }
  };

  if (!task) {
    return <h3>✅タスクを選択すると詳細が表示されます</h3>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        {/* チェックボックス、日付入力、フラグボタン */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '16px',
          }}
        >
          {/* チェックボックス */}
          <TaskCheckbox task={task} onUpdate={onTaskUpdate} />

          {/* 日付入力ボタン */}
          <DatePicker
            label="日付を設定"
            slotProps={{ textField: { size: 'small' } }}
            value={dueDate}
            onChange={handleDateChange}
          />

          {/* フラグボタン */}
          <IconButton onClick={handleMenuOpen} sx={{ marginLeft: '8px' }}>
            <FlagIcon sx={{ color: getPriorityColor() }} />
          </IconButton>

          {/* メニュー */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={() => handlePriorityChange(4)}>
              <FlagIcon sx={{ color: 'red', marginRight: '8px' }} />
              高
            </MenuItem>
            <MenuItem onClick={() => handlePriorityChange(3)}>
              <FlagIcon sx={{ color: 'orange', marginRight: '8px' }} />
              中
            </MenuItem>
            <MenuItem onClick={() => handlePriorityChange(2)}>
              <FlagIcon sx={{ color: 'blue', marginRight: '8px' }} />
              低
            </MenuItem>
            <MenuItem onClick={() => handlePriorityChange(1)}>
              <FlagIcon sx={{ color: 'gray', marginRight: '8px' }} />
              無
            </MenuItem>
          </Menu>
        </Box>
        {/* 区切り線 */}
        <Divider />
        {/* タスクタイトル */}
        <TextField
          value={title}
          onChange={handleTitleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleTitleUpdate}
          fullWidth
          variant="standard"
          InputProps={{
            disableUnderline: true,
            style: { marginTop: '12px', fontSize: '1.5rem', fontWeight: 'bold' },
          }}
          sx={{
            '& .MuiInputBase-root': {
              padding: 0,
            },
          }}
        />
        {/* タスク説明 */}
        <TextField
          multiline
          fullWidth
          value={description}
          onChange={handleDescriptionChange}
          onBlur={handleDescriptionUpdate}
          variant="standard"
          InputProps={{
            disableUnderline: true,
            style: { marginTop: '12px', fontSize: '1rem', lineHeight: '1.5rem' },
          }}
          sx={{
            '& .MuiInputBase-root': {
              padding: 0,
            },
          }}
        />
      </div>
    </LocalizationProvider>
  );
}
