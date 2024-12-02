package com.example.demo.dao;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Task;

@Repository
public class TaskDaoImpl implements TaskDao {

    private final JdbcTemplate jdbcTemplate;

    public TaskDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Task> findAll() {
        String sql = "SELECT * FROM task WHERE is_delete = false";

        List<Map<String, Object>> resultList = jdbcTemplate.queryForList(sql);

        List<Task> list = new ArrayList<>();
        for (Map<String, Object> result : resultList) {
            Task task = mapToTask(result);
            list.add(task);
        }
        return list;
    }

    @Override
    public Optional<Task> findById(int id) {
        String sql = "SELECT * FROM task WHERE task_id = ? AND is_delete = false";

        Map<String, Object> result = jdbcTemplate.queryForMap(sql, id);

        Task task = mapToTask(result);

        return Optional.ofNullable(task);
    }

    @Override
    public void insert(Task task) {
        String sql = "INSERT INTO task(user_id, list_id, type_id, title, description, due_date, priority, is_pinned, is_completed, is_delete, created_at, updated_at) "
                   + "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        jdbcTemplate.update(sql, task.getUserId(), task.getListId(), task.getTypeId(), task.getTitle(),
                task.getDescription(), task.getDueDate(), task.getPriority(), task.getIsPinned(),
                task.getIsCompleted(), task.getIsDelete(), task.getCreatedAt(), task.getUpdatedAt());
    }

    @Override
    public int update(Task task) {
        String sql = "UPDATE task SET list_id = ?, type_id = ?, title = ?, description = ?, due_date = ?, priority = ?, is_pinned = ?, "
                   + "is_completed = ?, is_delete = ?, updated_at = ? WHERE task_id = ?";

        return jdbcTemplate.update(sql, task.getListId(), task.getTypeId(), task.getTitle(), task.getDescription(),
                task.getDueDate(), task.getPriority(), task.getIsPinned(), task.getIsCompleted(),
                task.getIsDelete(), task.getUpdatedAt(), task.getId());
    }

    @Override
    public int deleteById(int id) {
        String sql = "UPDATE task SET is_delete = true WHERE task_id = ?";

        return jdbcTemplate.update(sql, id);
    }

    @Override
    public List<Task> findByType(int typeId) {
        String sql = "SELECT * FROM task WHERE type_id = ? AND is_delete = false";

        List<Map<String, Object>> resultList = jdbcTemplate.queryForList(sql, typeId);

        List<Task> tasks = new ArrayList<>();
        for (Map<String, Object> result : resultList) {
            Task task = mapToTask(result);
            tasks.add(task);
        }
        return tasks;
    }

    // MapをTaskに変換する
    private Task mapToTask(Map<String, Object> result) {
        return new Task(
                (int) result.get("task_id"),
                (int) result.get("user_id"),
                (int) result.get("list_id"), // listIdを取得
                (Integer) result.get("type_id"),
                (String) result.get("title"),
                (String) result.get("description"),
                ((Timestamp) result.get("due_date")).toLocalDateTime(),
                (Integer) result.get("priority"),
                (Boolean) result.get("is_pinned"),
                (Boolean) result.get("is_completed"),
                (Boolean) result.get("is_delete"),
                ((Timestamp) result.get("created_at")).toLocalDateTime(),
                ((Timestamp) result.get("updated_at")).toLocalDateTime()
        );
    }
    
    //  タスク名でタスクを検索して取得する
    @Override
    public List<Task> searchByTitle(String keyword) {
        String sql = "SELECT * FROM task WHERE title LIKE ? AND is_delete = false";
        List<Map<String, Object>> resultList = jdbcTemplate.queryForList(sql, "%" + keyword + "%");
        
        List<Task> tasks = new ArrayList<>();
        for (Map<String, Object> result : resultList) {
            Task task = mapToTask(result);
            tasks.add(task);
        }
        return tasks;
    }

}
