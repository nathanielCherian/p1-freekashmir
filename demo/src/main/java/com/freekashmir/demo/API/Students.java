package com.freekashmir.demo.API;

import com.freekashmir.demo.Database.Table;
import com.freekashmir.demo.MainRESTController;
import com.freekashmir.demo.Security.Groups;
import com.freekashmir.demo.Security.Security;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class Students {

    public static Table students = MainRESTController.model.projects;

    public static JSONArray getStudents(){
        JSONArray projects = students.getFullTableJSON();
        return projects;
    }

    public static JSONObject createStudent(JSONObject object){
        JSONObject response = new JSONObject();
        String classCode = (String) object.get("classCode");
        String name = (String) object.get("name");
        int grade = ((Long)object.get("grade")).intValue();

        students.createRow(new Object[]{null, name});

        response.put("completed", true);
        return response;
    }

}
