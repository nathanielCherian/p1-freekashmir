package com.freekashmir.demo;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class MainController {

    @GetMapping("/")
    public String homepage(){
        return "index.html";
    }

    @GetMapping("/get-started")
    public String getstarted(){
        return "get-started.html";
    }

}
