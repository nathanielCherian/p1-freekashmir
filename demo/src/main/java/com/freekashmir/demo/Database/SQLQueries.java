package com.freekashmir.demo.Database;

import java.sql.ResultSet;

public interface SQLQueries {
    ResultSet getTable(String tableName);
    ResultSet getRowsByQuery(String tableName, String columnName, String value);
    ResultSet getRowsByQuery(String tableName, String columnName, String value, int results);
    ResultSet getRowsByQuery(String tableName, String[] params);

}
