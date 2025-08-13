package com.rumanski.demo;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/tasks")
@AllArgsConstructor
public class TasksController {

    private final TaskService service;

    @PostMapping()
    public ResponseEntity<Task> createTask(@Valid @RequestBody CreateTaskRequest request ){
        Task created = service.create(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Collection<Task>> getAll(){
        return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
    }
}
