package com.freekashmir.demo.API;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.util.Random;

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

    private static String alphanumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static Random rand = new Random();
    public static String generateCode(int length){
        String code = "";
        for(int i=0;i<length;i++){
            code += alphanumeric.charAt(rand.nextInt(alphanumeric.length()));
        }
        return code;
    }

}
