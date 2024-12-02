// useFetchTasks関数は、APIからタスクデータを取得し、setTasks関数を通じて親コンポーネントの状態を更新する
export const useFetchTasks = (setTasks) => {
  const URL = 'http://localhost:8080/api/tasks';

  fetch(URL)
    .then(res => res.json())  // レスポンスをJSONとしてパース
    .then(json => {
      setTasks(json);  // APIから取得したデータをsetTasksを使って親コンポーネントに渡す
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};
