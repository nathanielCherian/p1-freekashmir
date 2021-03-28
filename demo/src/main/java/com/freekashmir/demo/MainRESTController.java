package com.freekashmir.demo;

import com.freekashmir.demo.API.Classes;
import com.freekashmir.demo.API.Students;
import com.freekashmir.demo.API.Util;
import com.freekashmir.demo.Model.Model;
import com.freekashmir.demo.Security.Security;
import org.json.simple.JSONArray;
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

    public static Model model = new Model();

    @GetMapping("/classes")
    public ResponseEntity<Object> getClasses(){
        JSONObject object = new JSONObject();
        JSONArray response = Classes.getClasses();
        return new ResponseEntity<Object>(response, HttpStatus.OK);
    }

    @GetMapping("/classes/{id}")
    public ResponseEntity<Object> getClassById(@PathVariable(value="id") Long classId){
        JSONObject object = new JSONObject();
        object.put("classID", classId);
        return new ResponseEntity<Object>(object, HttpStatus.OK);
    }

    @PostMapping("/classes") //create class
    public ResponseEntity<Object> classes__create(@RequestBody String data) {
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



    // ------------------------- STUDENTS ----------------------------

    @GetMapping("/students")
    public ResponseEntity<Object> getStudents(@RequestParam(value = "id", required = false) Integer id,
                                              @RequestParam(value = "grade", required = false) Integer grade){
        JSONObject object = new JSONObject();
        if(id!= null) object.put("id", id.intValue());
        if(grade!= null) object.put("grade", grade.intValue());
        JSONArray response = Students.getStudents(object);
        return new ResponseEntity<Object>(response, HttpStatus.OK);
    }

    @PostMapping("/students") //create class
    public ResponseEntity<Object> students__create(@RequestBody String data) {
        JSONObject inputObject = Util.parseJSON(data);
        JSONObject responseObject = Students.createStudent(inputObject);
        return new ResponseEntity<Object>(responseObject, HttpStatus.OK);
    }

    @PostMapping("/students/checkClassCode") //create class
    public ResponseEntity<Object> students__checkClassCode(@RequestBody String data) {
        JSONObject inputObject = Util.parseJSON(data);
        JSONObject responseObject = Students.checkClassCode(inputObject);
        return new ResponseEntity<Object>(responseObject, HttpStatus.OK);
    }

}
