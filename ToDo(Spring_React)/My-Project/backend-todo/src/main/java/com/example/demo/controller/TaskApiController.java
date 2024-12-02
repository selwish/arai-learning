package com.example.demo.controller;

import com.example.demo.dao.TaskDao;
import com.example.demo.entity.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskApiController {

    private final TaskDao taskDao;

    @Autowired
    public TaskApiController(TaskDao taskDao) {
        this.taskDao = taskDao;
    }

    // 全てのTaskを取得
    @GetMapping
    public List<Task> getAllTasks() {
        return taskDao.findAll();
    }

    // 特定のTaskをIDで取得
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable int id) {
        Optional<Task> task = taskDao.findById(id);
        return task.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 新しいTaskを追加
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        try {
            taskDao.insert(task); // タスクを保存
            return ResponseEntity.ok(task); // 保存したタスクを返す
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build(); // エラー時にHTTP 500を返す
        }
    }
    
    // タスクを更新
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable int id, @RequestBody Task updatedTask) {
        try {
        	// タスクの存在を確認
            Optional<Task> existingTask = taskDao.findById(id);
            if (existingTask.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            // タスクの更新
            updatedTask.setId(id); // 更新するタスクにIDを設定
            int rowsAffected = taskDao.update(updatedTask);

            if (rowsAffected == 1) {
                return ResponseEntity.ok(updatedTask); // 更新されたタスクを返す
            } else {
                return ResponseEntity.status(500).body("タスクの更新に失敗しました");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("サーバーエラー");
        }
    }
    
    // タスクを削除
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable int id) {
        try {
            // タスクの存在を確認
            Optional<Task> existingTask = taskDao.findById(id);
            if (existingTask.isEmpty()) {
                return ResponseEntity.notFound().build(); // タスクが見つからない場合
            }

            // タスクを削除 (is_delete を true に設定)
            int rowsAffected = taskDao.deleteById(id);

            if (rowsAffected == 1) {
                return ResponseEntity.ok("タスクが削除されました"); // 成功メッセージを返す
            } else {
                return ResponseEntity.status(500).body("タスクの削除に失敗しました");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("サーバーエラー");
        }
    }
    
    // タスクを検索
    @GetMapping("/search")
    public ResponseEntity<List<Task>> searchTasksByTitle(@RequestParam String keyword) {
        try {
            // タスク名で部分一致検索
            List<Task> tasks = taskDao.searchByTitle(keyword);
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            e.printStackTrace();
            // 検索結果が無ければnullを返却
            return ResponseEntity.status(500).body(null);
        }
    }

}
