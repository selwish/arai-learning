import { createTask } from '../../services/taskService'; // サービス層をインポート

/**
 * タスクを送信する処理
 * @param {Object} newTask 入力されたタスク情報
 * @param {Function} onTaskCreate 親コンポーネントへ通知するコールバック
 */
export const handleTaskSubmit = async (newTask, onTaskCreate, showAlertMessage) => {
    const createdTask = await createTask(newTask);

    if (createdTask) {
        showAlertMessage('タスクが作成されました', 'success');
        if (onTaskCreate) onTaskCreate();
    } else {
        showAlertMessage('タスクの作成に失敗しました', 'error');
    }
};

