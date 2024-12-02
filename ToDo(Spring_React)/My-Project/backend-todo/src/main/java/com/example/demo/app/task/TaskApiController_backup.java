//Reactに値を渡すためのクラス
// backup

// package com.example.demo.app.task;

// import java.util.List;

// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.example.demo.entity.Task;
// import com.example.demo.service.TaskService;

// @RestController
// @RequestMapping(value = "/api/tasks", produces = "application/json;charset=UTF-8")
// @CrossOrigin(origins = "*")
// public class TaskApiController {

//     private final TaskService taskService;

//     public TaskApiController(TaskService taskService) {
//         this.taskService = taskService;
//     }

//     // タスク一覧を取得
//     @GetMapping
//     public List<Task> getTasks() {
//         return taskService.findAll();
//     }

//     // タスクを挿入
//     @PostMapping
//     public Task createTask(@RequestBody TaskForm taskForm) {
//         Task task = makeTask(taskForm, 0);
//         taskService.insert(task);
//         return task;
//     }

//     // タスクを更新
//     @PutMapping("/{id}")
//     public Task updateTask(@PathVariable int id, @RequestBody TaskForm taskForm) {
//         Task task = makeTask(taskForm, id);
//         taskService.update(task);
//         return task;
//     }

//     // タスクを削除
//     @DeleteMapping("/{id}")
//     public void deleteTask(@PathVariable int id) {
//         taskService.deleteById(id);
//     }

//     // TaskFormからTaskオブジェクトを作成するヘルパーメソッド
//     private Task makeTask(TaskForm taskForm, int taskId) {
//         Task task = new Task();
//         if (taskId != 0) {
//             task.setId(taskId);
//         }
//         task.setUserId(1);  // UserIdは仮に1と設定（ユーザー管理が必要なら変更）
//         task.setTypeId(taskForm.getTypeId());
//         task.setTitle(taskForm.getTitle());
//         task.setDetail(taskForm.getDetail());
//         task.setDeadline(taskForm.getDeadline());
//         return task;
//     }
// }
