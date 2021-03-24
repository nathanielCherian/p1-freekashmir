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

    public static JSONArray getClasses(){
        JSONArray response = classes.getFullTableJSON();
        return response;
    }

    public static JSONObject createClass(JSONObject object){
        if(!Security.authenticate(object, Groups.ADMIN)) return null; //fail
        String name = (String) object.get("name");
        String code = Util.generateCode(5);
        classes.createRow(new Object[]{null, code, name});

        JSONObject response = new JSONObject();
        response.put("classCode", code);
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
