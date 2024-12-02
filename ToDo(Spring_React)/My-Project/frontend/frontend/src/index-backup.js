// memo-backup
// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

// class Index extends Component {
//   // constructor
//   constructor(props) {
//     super(props);
//     // タスクデータを格納するための配列を初期化しておけば、1つ1つの項目の定義をする必要はない
//     this.state = {
//       tasks: []  // 複数のタスクを格納する配列を初期化
//     };
//   }

//   // コンポーネントがマウントされた後にAPIを呼び出す
//   componentDidMount() {
//     // APIエンドポイント
//     const URL = 'http://localhost:8080/api/tasks';

//     // APIエンドポイントにGETリクエストを送り、サーバーからデータを取得
//     fetch(URL)
//       .then(res => res.json())
//       .then(json => {
//         // 受け取ったデータを状態にセット
//         this.setState({ tasks: json });
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }

//   // 値の表示
//   // render メソッドは、UIを構築するために使用
//   render() {
//     return (
//       <div className='Index'>
//         <h1>ToDo List</h1>
//         {this.state.tasks.map(task => (
//           <div key={task.id} className='task'>
//             <p>Task ID: {task.id}</p>
//             <p>User ID: {task.userId}</p>
//             <p>Type ID: {task.typeId}</p>
//             <p>TaskTable ID: {task.taskType.id}</p>
//             <p>Type: {task.taskType.type}</p>
//             <p>Comment: {task.taskType.comment}</p>
//             <p>Title: {task.title}</p>
//             <p>Detail: {task.detail}</p>
//             <p>Deadline: {task.deadline}</p>
//             <hr />
//           </div>
//         ))}
//       </div>
//     );
//   }
// }

// // Reactコンポーネントを#rootにレンダリング
// const rootElement = document.getElementById('root');
// const root = ReactDOM.createRoot(rootElement);

// root.render(<Index />);
