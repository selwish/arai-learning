import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline, createTheme, Box } from '@mui/material';
import Sidebar from './components/layout/Sidebar/Sidebar';
import TaskList from './components/task/TaskList/TaskList';
import TaskDetails from './components/task/TaskDetails/TaskDetails';
import TaskDetailsPage from './components/task/TaskDetails/TaskDetailsPage'; // タスク詳細ページのコンポーネント
import { useFetchTasks } from './hooks/useFetchTasks';
import { updateTask } from './components/services/taskService';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const theme = createTheme({});

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [], // タスクリスト
      selectedTaskId: null, // 選択されたタスクのIDを保存
      sidebarOpen: true, // Sidebarの開閉状態
    };
  }

  // 初期データ取得用
  componentDidMount() {
    this.refreshTasks(); // タスクリストを初期取得
  }

  // タスクリストの更新処理
  refreshTasks = () => {
    useFetchTasks((tasks) => {
      this.setState({ tasks });
    });
  };

  // タスククリック時の処理
  handleTaskClick = (taskId) => {
    this.setState({ selectedTaskId: taskId });
  };

  // タスク更新処理
  handleTaskUpdate = async (updatedTask) => {
    const result = await updateTask(updatedTask.id, updatedTask);

    if (result) {
      this.setState((prevState) => {
        const updatedTasks = prevState.tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
        return { tasks: updatedTasks };
      });
    } else {
      console.error('タスクの更新に失敗しました');
    }
  };

  // サイドバーの開閉処理
  toggleSidebar = () => {
    this.setState((prevState) => ({ sidebarOpen: !prevState.sidebarOpen }));
  };

  render() {
    const { tasks, selectedTaskId, sidebarOpen } = this.state;
    const selectedTask = tasks.find((task) => task.id === selectedTaskId); // 選択されたタスク

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box sx={{ display: 'flex', width: '100%', height: '100vh' }}>
            {/* サイドメニュー */}
            <Sidebar open={sidebarOpen} toggleSidebar={this.toggleSidebar} />

            {/* ルーティング */}
            <Box
              sx={{
                display: 'flex',
                flexGrow: 1,
                transition: 'margin 0.3s ease',
              }}
            >
              <Routes>
                {/* メイン画面 */}
                <Route
                  path="/"
                  element={
                    <Box sx={{ display: 'flex', flexGrow: 1 }}>
                      {/* タスクリスト */}
                      <Box
                        sx={{
                          flex: 6,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          padding: 2,
                          height: '100%',
                          boxSizing: 'border-box',
                        }}
                      >
                        <TaskList
                          tasks={tasks}
                          onTaskClick={this.handleTaskClick}
                          onTaskCreate={this.refreshTasks}
                          onTaskUpdate={this.handleTaskUpdate}
                          onTaskDelete={this.refreshTasks}
                        />
                      </Box>

                      <Box
                        sx={{
                          width: '1px',
                          backgroundColor: '#ddd',
                          height: '100%',
                        }}
                      />

                      {/* TaskDetails */}
                      <Box
                        sx={{
                          flex: 4,
                          display: 'flex',
                          flexDirection: 'column',
                          padding: 2,
                          height: '100%',
                        }}
                      >
                        {selectedTask ? (
                          <TaskDetails
                            task={selectedTask}
                            onTaskUpdate={this.handleTaskUpdate}
                          />
                        ) : (
                          <h3>✅タスクを選択すると詳細が表示されます</h3>
                        )}
                      </Box>
                    </Box>
                  }
                />

                {/* タスク詳細ページ */}
                <Route
                  path="/tasks/:id"
                  element={<TaskDetailsPage />}
                />
              </Routes>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    );
  }
}

// Reactコンポーネントを#rootにレンダリング
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<Index />);
