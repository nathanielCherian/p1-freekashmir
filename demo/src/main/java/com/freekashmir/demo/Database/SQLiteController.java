package com.freekashmir.demo.Database;

import java.io.File;
import java.sql.*;
import java.util.ArrayList;

public class SQLiteController implements SQLCommands, SQLQueries{

    //Tester method
    public static void main(String[] args) {
        SQLiteController sq = new SQLiteController();

        Column id = new Column("id", "integer").isPrimaryKey().isAutoIncrement();
        Column name = new Column("name", "TEXT").isNotNull().isUnique();
        Column[] cs = {id, name};

        sq.createTable("tableName", cs);
        //sq.addRow("tableName", new String[]{"'0'", "'Nathaniel'"});
        ResultSet rs = sq.getTable("tableName");

        try{
            while (rs.next()){
                System.out.println(rs.getObject("id") + " " + rs.getObject("name"));
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

    }

    private Connection dbConnection;
    private String url = "jdbc:sqlite:" + System.getProperty("java.io.tmpdir") + File.separator + "database.db";

    public SQLiteController(){
        connectToDB();
    }

    private void connectToDB(){
        try{
            dbConnection = DriverManager.getConnection(url);
            System.out.println("Connected to database @ " + url);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
            System.out.println("Database does not exist. Creating new one...");
            createDB();
        }
    }

    public void createDB(){

        try(Connection conn = DriverManager.getConnection(url)){
            if(conn != null){
                DatabaseMetaData meta = conn.getMetaData();
                System.out.println("drivername " + meta.getDriverName());
                System.out.println("New Database Created @ " + url);
                dbConnection = conn;
            }

        }catch (SQLException e){
            e.printStackTrace();
        }
    }


    @Override
    public void createTable(String tableName, Column[] columns) {

        ArrayList<String> cms = new ArrayList<>();
        ArrayList<String> etcs = new ArrayList<>();
        for(int i=0;i<columns.length;i++){
            cms.add(columns[i].toString());
            if(!columns[i].getEtcData().equals("")) etcs.add(columns[i].getEtcData());
        }
        cms.addAll(etcs);
        String cmData = String.join(", \n", cms);

        String command = """
                CREATE TABLE IF NOT EXISTS %s (
                    %s
                );
                """.formatted(tableName, cmData);

        executeCommand(command);
    }


    @Override
    public ResultSet getTable(String tableName) {
        String query = "SELECT * FROM %s".formatted(tableName);
        return executeQuery(query);
    }

    @Override
    public ResultSet getRowByQuery(String tableName, String columnName, String value) {
        //numeric values must not be in quotes
        String query = "SELECT * FROM %s WHERE %s=%s".formatted(tableName, columnName, value);
        return executeQuery(query);
    }

    @Override
    public void deleteTable(String tableName) {

    }


    @Override
    public void addRow(String tableName, String[] columnNames, String[] values) {
        String command = """
                INSERT INTO %s (%s)
                VALUES (%s);
                """.formatted(tableName, String.join(", ", columnNames), String.join(", ", values));
        executeCommand(command);
    }

    @Override
    public void deleteRowByColumn(String tableName, String columnName, String targetValue) {
        String command = """
                DELETE FROM %s
                WHERE %s = %s;
                """.formatted(tableName, columnName, targetValue);
        executeCommand(command);
    }


    public void executeCommand(String command){
        System.out.println("execute command: \n" + command);
        try{
            Statement statement = dbConnection.createStatement();
            statement.execute(command);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    private ResultSet executeQuery(String query){
        System.out.println("execute query: \n" + query);
        try{
            Statement statement = dbConnection.createStatement();
            return statement.executeQuery(query);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return null;
    }

}
