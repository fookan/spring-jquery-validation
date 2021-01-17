package com.example.springjqueryvalidation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class SampleController {
  @GetMapping
  public String get() {
    return "sample";
  }


  @GetMapping("/sample2")
  public String sample2() {
    return "sample2";
  }

  @GetMapping("/sample3")
  public String sample3() {
    return "sample3";
  }

  @PostMapping
  public String post() {
    return "sample";
  }
}
