package com.rumanski.demo;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateTaskRequest {

    @NotBlank
    String title;
}
