package com.rumanski.demo;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Random;

@Service
@AllArgsConstructor
public class TaskService {

    private final TaskRepository repository;

    public Task create(CreateTaskRequest request) {
        Task task = Task.builder().id(new Random().nextLong()).title(request.getTitle()).completed(false).build();
        repository.create(task);
        return task;
    }

    public Collection<Task> getAll() {
        return repository.getAll();
    }


}
