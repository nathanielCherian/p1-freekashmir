package com.freekashmir.demo.API;

import com.freekashmir.demo.Database.Table;
import com.freekashmir.demo.MainRESTController;
import com.freekashmir.demo.Security.Groups;
import com.freekashmir.demo.Security.Security;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class Students {

    public static Table students = MainRESTController.model.projects;
    public static Table classes = MainRESTController.model.classes;

    public static JSONArray getStudents(JSONObject params){
        if(!params.isEmpty()){
            return students.getTableWithParams(params);
        }
         return students.getFullTableJSON();
    }

    public static JSONObject createStudent(JSONObject object){
        JSONObject response = new JSONObject();
        String classCode = (String) object.get("classCode");
        String name = (String) object.get("studentName");
        int gradeLevel = ((Long)object.get("grade")).intValue();

        students.createRow(new Object[]{null, name, gradeLevel, classCode});

        response.put("completed", true);
        return response;
    }

    public static JSONObject checkClassCode(JSONObject object){
        String classCode = (String) object.get("classCode");
        JSONArray arrs = classes.getRowsByColumn("classCode", classCode);
        JSONObject response = new JSONObject();
        if(arrs.size() == 1){
            response.put("class", (JSONObject)arrs.get(0));
            response.put("valid", true);
        }else{
            response.put("valid", false);
        }
        return response;
    }


    public static void main(String[] args) {
        JSONArray arr = classes.getRowsByColumn("classCode", "8V46R");
        System.out.println("arr " + arr);
    }

}
