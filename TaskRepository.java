package com.rumanski.demo;

import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class TaskRepository {

    private final ConcurrentHashMap<Long, Task> tasks = new ConcurrentHashMap<>();

    public void create(Task task) {
        tasks.put(task.id, task);
    }

    public Collection<Task> getAll() {
        return tasks.values();
    }
}
