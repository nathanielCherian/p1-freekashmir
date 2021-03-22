package com.freekashmir.demo.Database;

import java.util.ArrayList;

public class Column {

    public static String NULL = "NULL";
    public static String INTEGER = "INTEGER";
    public static String REAL = "REAL";
    public static String TEXT = "TEXT";
    public static String STRING = "STRING";
    public static String BLOB = "BLOB";

    public static String SET_NULL = "SET NULL";
    public static String SET_DEFAULT = "SET DEFAULT";
    public static String RESTRICT = "RESTRICT";
    public static String NO_ACTION = "NO ACTION";
    public static String CASCADE = "CASCADE";

    private ArrayList<String> columnData = new ArrayList<>();
    private ArrayList<String> etcData = new ArrayList<>();


    public Column(String name, String type){
        columnData.add(name);
        columnData.add(type);
    }

    public Column isPrimaryKey(){
        this.columnData.add("PRIMARY KEY");
        return this;
    }

    public Column isNotNull(){
        this.columnData.add("NOT NULL");
        return this;
    }

    public Column isUnique(){
        this.columnData.add("UNIQUE");
        return this;
    }

    public Column isAutoIncrement(){
        this.columnData.add("AUTOINCREMENT");
        return this;
    }

    public Column isForeignKey(String tableName, String columnName, String onUpdateDelete){
        this.etcData.add("FOREIGN KEY (%s) REFERENCES %s (%s) ON UPDATE %s ON DELETE %s".formatted(columnData.get(0), tableName, columnName, onUpdateDelete, onUpdateDelete));
        return this;
    }


    public String toString(){
        return String.join(" ", columnData);
    }

    public String getEtcData(){
        return String.join(" ", etcData);
    }

    public String getName(){
        return columnData.get(0);
    }

    //tester method
    public static void main(String[] args) {
        Column column1 = new Column("id", "integer").isPrimaryKey().isAutoIncrement();
        Column column = new Column("name", "TEXT").isNotNull().isUnique();
        Column[] cs = {column, column1};
        String[] c = new String[cs.length];
        for(int i=0;i<cs.length;i++){
            c[i] = cs[i].toString();
        }
        System.out.println(String.join(", \n", c));
    }
}
