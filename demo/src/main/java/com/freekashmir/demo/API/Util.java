package com.freekashmir.demo.API;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class Util {

    private static JSONParser parser = new JSONParser();

    public static JSONObject parseJSON(String s){
        try{
            return (JSONObject) parser.parse(s);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

}
