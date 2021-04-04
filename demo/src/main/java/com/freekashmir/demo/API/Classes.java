package com.freekashmir.demo.API;

import com.freekashmir.demo.Database.Table;
import com.freekashmir.demo.MainRESTController;
import com.freekashmir.demo.Security.Groups;
import com.freekashmir.demo.Security.Security;
import org.json.simple.JSONArray;
import org.json.simple.JSONAware;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

public class Classes {

    public static Table classes = MainRESTController.model.classes;

    public static JSONArray getClasses(JSONObject params){
        if(!params.isEmpty()){
            return classes.getTableWithParams(params);
        }
        return classes.getFullTableJSON();
    }

    public static JSONObject createClass(JSONObject object){
        if(!Security.authenticate(object, Groups.ADMIN)) return null; //fail

        String code = Util.generateCode(5);
        String className = (String) object.get("className");
        String classSlug = (String) object.get("classSlug");
        String teacherName = (String) object.get("teacherName");

        classes.createRow(new Object[]{null, code, className, classSlug, teacherName});

        JSONObject response = new JSONObject();
        response.put("classCode", code);
        response.put("classSlug", classSlug);
        response.put("completed", true);
        return response;
    }

    public static JSONObject checkCode(JSONObject object){
        Boolean isValid = Security.authenticate(object, Groups.ADMIN);
        JSONObject response = new JSONObject();
        response.put("valid", isValid);
        return response;
    }

}
