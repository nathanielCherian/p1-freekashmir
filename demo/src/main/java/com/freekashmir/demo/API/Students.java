package com.freekashmir.demo.API;

import com.freekashmir.demo.Security.Groups;
import com.freekashmir.demo.Security.Security;
import org.json.simple.JSONObject;

public class Students {

    public static JSONObject createStudent(JSONObject object){
        JSONObject response = new JSONObject();
        String classCode = (String) object.get("classCode");

        response.put("completed", true);
        return response;
    }

}
