package com.freekashmir.demo.API;

import com.freekashmir.demo.Security.Groups;
import com.freekashmir.demo.Security.Security;
import org.json.simple.JSONObject;

public class Classes {

    public static JSONObject createClass(JSONObject object){
        if(!Security.authenticate(object, Groups.ADMIN)) return null; //fail
        JSONObject response = new JSONObject();
        String name = (String) object.get("name");

        response.put("completed", true);
        return response;
    }

}
