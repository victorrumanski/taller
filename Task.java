package com.rumanski.demo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Task {

    Long id;
    String title;
    boolean completed;
}
