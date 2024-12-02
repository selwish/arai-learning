const BASE_URL = 'http://localhost:8080/api/tasks';
// 検索機能でaxiosを使用
import axios from 'axios';

// axiosがlocalhost:8080に接続するようにデフォルトを設定
axios.defaults.baseURL = 'http://localhost:8080';

/**
 * 全タスクを取得
 */
export const fetchTasks = async () => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error('タスク一覧の取得に失敗しました');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
};

/**
 * 新しいタスクを登録
 */
export const createTask = async (task) => {
    console.log('createTask - Received task1:', task); // デバッグログ
    const URL = 'http://localhost:8080/api/tasks';

    // console.log("Sending Task Data:", JSON.stringify(task, null, 2));

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });

        if (!response.ok) {
            throw new Error(`HTTPエラー: ${response.status}`);
        }

        // レスポンスボディを生で確認
        const text = await response.text();

        try {
            // JSONとして解析
            const json = JSON.parse(text);
            return json;
        } catch (parseError) {
            return null;
        }
    } catch (error) {
        console.error('Error creating task:', error);
        return null;
    }
};


/**
 * 特定のタスクをIDで取得
 */
export const fetchTaskById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`タスクの取得に失敗しました (ID: ${id})`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching task by ID:', error);
        return null;
    }
};

/**
 * タスクを更新
 */
export const updateTask = async (id, updatedTask) => {
    const URL = `http://localhost:8080/api/tasks/${id}`;

    try {
        const response = await fetch(URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        });

        if (!response.ok) {
            throw new Error(`HTTPエラー: ${response.status}`);
        }

        return await response.json(); // 更新後のタスクを返す
    } catch (error) {
        console.error('Error updating task:', error);
        return null;
    }
};


/**
 * タスクを削除
 */
export const deleteTask = async (id) => {
    const URL = `http://localhost:8080/api/tasks/${id}`;

    try {
        const response = await fetch(URL, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`タスク削除に失敗しました (HTTPステータス: ${response.status})`);
        }

        return true;
    } catch (error) {
        console.error(`Error deleting task: ${error}`);
        return false;
    }
};


// タスク検索
export const searchTasks = async (keyword) => {

    try {
        const response = await axios.get(`/api/tasks/search`, {
            params: { keyword },
        });
        //   console.log('Response data:', response.data); // サーバーから返されたデータ
        return response.data; // 検索結果のタスクリストを返す
    } catch (error) {
        console.error('Failed to search tasks:', error);
        return [];
    }
};

