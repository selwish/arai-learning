package com.example.demo.dao;

import java.util.List;
import java.util.Optional;

import com.example.demo.entity.Task;

public interface TaskDao{

	List<Task> findAll();

	// 1件のTaskを返却
	Optional<Task> findById(int id);

	void insert(Task task);

	//以下2つは更新した数が返却される
	int update(Task task);

	int deleteById(int id);

	List<Task> findByType(int typeId);
	
	// タスク名でタスクを検索して取得する
    List<Task> searchByTitle(String keyword);

}