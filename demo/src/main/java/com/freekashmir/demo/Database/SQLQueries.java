package com.freekashmir.demo.Database;

import java.sql.ResultSet;

public interface SQLQueries {
    ResultSet getTable(String tableName);
    ResultSet getRowByQuery(String tableName, String columnName, String value);
}
