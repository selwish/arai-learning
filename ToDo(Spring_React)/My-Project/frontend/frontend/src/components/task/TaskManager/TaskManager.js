import React, { useState, useEffect } from 'react';
import TaskList from '../TaskList/TaskList'; // TaskListをインポート
import { fetchTasks } from './module/fetchTasks'; // タスク取得
import { createTask } from './module/createTask'; // タスク登録

export default function TaskManager() {
  const [tasks, setTasks] = useState([]); // タスクリストを管理
  const [selectedTaskId, setSelectedTaskId] = useState(null); // 選択されたタスクのID

  // 初期データ取得
  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    };
    loadTasks();
  }, []);

  // 新しいタスクを登録してリストを更新
  const handleTaskCreate = async (newTask) => {
    const createdTask = await createTask(newTask);
    if (createdTask) {
      setTasks((prevTasks) => [...prevTasks, createdTask]); // 新しいタスクを追加
    }
  };

  // タスク選択時の処理
  const handleTaskClick = (taskId) => {
    setSelectedTaskId(taskId);
  };

  return (
    <div>
      {/* TaskListコンポーネントを表示 */}
      <TaskList
        tasks={tasks} // タスクリストを渡す
        onTaskClick={handleTaskClick} // タスク選択処理を渡す
        onTaskCreate={handleTaskCreate} // 新規タスク登録処理を渡す
      />
    </div>
  );
}
