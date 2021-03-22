package com.freekashmir.demo.Database;

public interface SQLCommands {
    void createTable(String tableName, Column[] columns);
    void deleteTable(String tableName);

    void addRow(String tableName, String[] columnNames, String[] values);
    void deleteRowByColumn(String tableName, String columnName, String targetValue);

}

