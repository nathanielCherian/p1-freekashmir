package com.freekashmir.demo;

import com.freekashmir.demo.API.Classes;
import com.freekashmir.demo.API.Util;
import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MainRESTController {

    @GetMapping("/classes")
    public ResponseEntity<Object> getClasses(){
        JSONObject object = new JSONObject();
        object.put("name", "nathan");
        return new ResponseEntity<Object>(object, HttpStatus.OK);
    }

    @GetMapping("/classes/{id}")
    public ResponseEntity<Object> getClassById(@PathVariable(value="id") Long classId){
        JSONObject object = new JSONObject();
        object.put("classID", classId);
        return new ResponseEntity<Object>(object, HttpStatus.OK);
    }

    @PostMapping("/classes")
    public ResponseEntity<Object> postBody(@RequestBody String data) {
        JSONObject inputObject = Util.parseJSON(data);
        JSONObject responseObject = Classes.createClass(inputObject);
        if(responseObject == null) return new ResponseEntity<Object>(null, HttpStatus.FAILED_DEPENDENCY);
        return new ResponseEntity<Object>(responseObject, HttpStatus.OK);
    }


}
