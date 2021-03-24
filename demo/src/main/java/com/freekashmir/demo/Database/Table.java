package com.freekashmir.demo.Database;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;

public class Table {

    private ArrayList<Column> columns = new ArrayList<>();
    private String tableName;
    private SQLiteController controller;
    private String[] columnNames;

    public Table(String tableName){
        this.tableName = tableName;
        this.controller = new SQLiteController();

        turnOnForeignKey();
    }

    public void turnOnForeignKey(){
        System.out.println("turning on foreign keys...");
        this.controller.executeCommand("PRAGMA foreign_keys = ON;\n");
    }

    public Table create(){
        controller.createTable(tableName, columns.toArray(new Column[columns.size()]));
        columnNames = new String[columns.size()];
        for(int i=0;i<columnNames.length;i++){
            columnNames[i] = columns.get(i).getName();
        }
        return this;
    }

    public Table addColumn(Column column){
        columns.add(column);
        return this;
    }

    public void createRow(Object[] data){

        /*
        Add validation here
        - data length
        - value type
         */

        if(data.length != columnNames.length) return;

        ArrayList<String> dataVals = new ArrayList<>();
        ArrayList<String> specifiedCols = new ArrayList<>();
        for(int i=0;i<data.length;i++){
            if(data[i] == null){
                //dataVals[i] = "null";
                continue;
            }
            System.out.println("'%s'".formatted(data[i].toString()));
            dataVals.add("'%s'".formatted(data[i].toString()));
            specifiedCols.add(columnNames[i]);
        }

        controller.addRow(this.tableName, specifiedCols.toArray(new String[specifiedCols.size()]), dataVals.toArray(new String[dataVals.size()]));
    }

    public void deleteRow(int columnIndex, Object value){
        String c = columnNames[columnIndex];
        controller.deleteRowByColumn(this.tableName, c, value.toString());
    }

    public Object[][] getFullTable(){
        ResultSet rs = controller.getTable(tableName);
        ArrayList<Object[]> fullTable = new ArrayList<>();
        try{
            while (rs.next()){
                Object[] row = new Object[columns.size()];
                for(int i=0;i<columns.size();i++){
                    row[i] = rs.getObject(i+1);
                }
                fullTable.add(row);
            }
            return fullTable.toArray(Object[][]::new);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return null;
    }

    public JSONArray getFullTableJSON(){
        ResultSet rs = controller.getTable(tableName);
        try {
            JSONArray result = resultSetToJSON(rs);
            return result;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return null;
    }



    public JSONArray getRowsByColumn(String columnName, Object searchValue){
        String value = "'%s'".formatted(searchValue.toString());
        if(searchValue instanceof Number){
            value = searchValue.toString(); //handle numeric values
        }

        ResultSet rs = controller.getRowByQuery(tableName, columnName, value);

        try {
            JSONArray result = resultSetToJSON(rs);
            return result;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return null;
    }


    public JSONArray resultSetToJSON(ResultSet rs) throws SQLException {
        JSONArray json = new JSONArray();

        ResultSetMetaData rsmd = rs.getMetaData();
        while(rs.next()) {
            int numColumns = rsmd.getColumnCount();
            JSONObject obj = new JSONObject();

            for (int i=1; i<numColumns+1; i++) {
                String column_name = rsmd.getColumnName(i);
                System.out.println(rsmd.getColumnTypeName(i));

                switch( rsmd.getColumnType( i ) ) {
                    case java.sql.Types.ARRAY:
                        obj.put(column_name, rs.getArray(column_name));     break;
                    case java.sql.Types.BIGINT:
                        obj.put(column_name, rs.getInt(column_name));       break;
                    case java.sql.Types.BOOLEAN:
                        obj.put(column_name, rs.getBoolean(column_name));   break;
                    case java.sql.Types.BLOB:
                        obj.put(column_name, rs.getBlob(column_name));      break;
                    case java.sql.Types.DOUBLE:
                        obj.put(column_name, rs.getDouble(column_name));    break;
                    case java.sql.Types.FLOAT:
                        obj.put(column_name, rs.getFloat(column_name));     break;
                    case java.sql.Types.INTEGER:
                        obj.put(column_name, rs.getInt(column_name));       break;
                    case java.sql.Types.NVARCHAR:
                        obj.put(column_name, rs.getNString(column_name));   break;
                    case java.sql.Types.VARCHAR:
                        obj.put(column_name, rs.getString(column_name));    break;
                    case java.sql.Types.TINYINT:
                        obj.put(column_name, rs.getInt(column_name));       break;
                    case java.sql.Types.SMALLINT:
                        obj.put(column_name, rs.getInt(column_name));       break;
                    case java.sql.Types.DATE:
                        obj.put(column_name, rs.getDate(column_name));      break;
                    case java.sql.Types.TIMESTAMP:
                        obj.put(column_name, rs.getTimestamp(column_name)); break;
                    default:
                        obj.put(column_name, rs.getObject(column_name));    break;
                }

            }

            json.add(obj);
        }

        return json;
    }


    public void executeRawCommand(String command){
        controller.executeCommand(command);
    }


}
