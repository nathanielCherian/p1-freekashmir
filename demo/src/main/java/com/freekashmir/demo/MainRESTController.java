package com.freekashmir.demo;

import com.freekashmir.demo.API.Classes;
import com.freekashmir.demo.API.Util;
import com.freekashmir.demo.Security.Security;
import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600) //remove in production
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


    //Example API
    @PostMapping("/classes") //create class
    public ResponseEntity<Object> classes_create(@RequestBody String data) {
        JSONObject inputObject = Util.parseJSON(data);
        JSONObject responseObject = Classes.createClass(inputObject);
        if(responseObject == null) return Security.FAILED_AUTH_RESPONSE; //Indicates auth needed for this request
        return new ResponseEntity<Object>(responseObject, HttpStatus.OK);
    }

    @PostMapping("/classes/checkPassword")
    public ResponseEntity<Object> classes__checkPassword(@RequestBody String data) {
        JSONObject inputObject = Util.parseJSON(data);
        JSONObject responseObject = Classes.checkCode(inputObject);
        return new ResponseEntity<Object>(responseObject, HttpStatus.OK);
    }


    @PostMapping("/students") //create class
    public ResponseEntity<Object> students__create(@RequestBody String data) {
        JSONObject inputObject = Util.parseJSON(data);
        JSONObject responseObject = Classes.createClass(inputObject);
        if(responseObject == null) return Security.FAILED_AUTH_RESPONSE; //Indicates auth needed for this request
        return new ResponseEntity<Object>(responseObject, HttpStatus.OK);
    }

}
