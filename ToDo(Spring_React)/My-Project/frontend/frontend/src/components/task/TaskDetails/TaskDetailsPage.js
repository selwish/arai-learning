import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TaskDetails from './TaskDetails'; // TaskDetails コンポーネントを利用
import { fetchTaskById } from '../../services/taskService'; // タスク取得関数を利用
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function TaskDetailsPage() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  // タスクのデータを取得する（API を呼び出し）
  useEffect(() => {
    const fetchTask = async () => {
      const fetchedTask = await fetchTaskById(id);
      if (fetchedTask) {
        setTask(fetchedTask);
      } else {
        console.error(`Task with ID ${id} not found.`);
      }
    };
    fetchTask();
  }, [id]);

  const handleBack = () => navigate('/');

  if (!task) {
    return <p>Loading...</p>;
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '16px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <Button
        onClick={handleBack}
        variant="contained"
        sx={{
          alignSelf: 'flex-start',
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#115293',
          },
        }}
      >
        戻る
      </Button>

      <TaskDetails
        task={task}
        onTaskUpdate={(updatedTask) => setTask(updatedTask)} // 更新時のステート更新
      />
    </Box>
  );
}
