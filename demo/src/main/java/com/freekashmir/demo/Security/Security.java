package com.freekashmir.demo.Security;

import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

public class Security {

    public static ResponseEntity<Object> FAILED_AUTH_RESPONSE = new ResponseEntity<Object>("failed authentication.", HttpStatus.FORBIDDEN);

    private static ArrayList<String> validAdmins = new ArrayList<>() {{
        add("d2653ff7cbb2d8ff129ac27ef5781ce68b2558c41a74af1f2ddca635cbeef07d");
    }};

    public static byte[] getSHA(String input) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        return md.digest(input.getBytes(StandardCharsets.UTF_8));
    }

    public static String toHexString(byte[] hash) {
        BigInteger number = new BigInteger(1, hash);
        StringBuilder hexString = new StringBuilder(number.toString(16));
        while (hexString.length() < 32) {
            hexString.insert(0, '0');
        }
        return hexString.toString();
    }

    public static boolean verifySignature(String sig, ArrayList<String> group){
        try {
            byte[] sigHex = getSHA(sig);
            String hash = toHexString(sigHex);
            if(group.contains(hash)) return true;
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return false;
    }

    public static boolean authenticate(JSONObject object, ArrayList<String> group){
        String authcode = (String) object.get("auth");
        if(authcode == null) return false;
        return verifySignature(authcode, group);
    }

    public static void main(String[] args) {
        System.out.println(verifySignature("password", validAdmins));
    }


}
