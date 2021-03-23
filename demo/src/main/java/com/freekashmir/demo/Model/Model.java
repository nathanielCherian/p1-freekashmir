package com.freekashmir.demo.Model;

import com.freekashmir.demo.Database.Column;
import com.freekashmir.demo.Database.Table;

public class Model {
    Table classes;
    Table projects;

    public Model(){
        classes = new Table("Classes")
                .addColumn(new Column("id", Column.INTEGER).isPrimaryKey())
                .addColumn(new Column("classCode", Column.STRING).isUnique().isNotNull())
                .addColumn(new Column("teacherName", Column.STRING))
                .create();

        projects = new Table("Projects")
                .addColumn(new Column("id", Column.INTEGER).isPrimaryKey())
                .addColumn(new Column("studentName", Column.STRING))
                .create();

    }

    public static void main(String[] args) {
        Model model = new Model();
        model.classes.createRow(new Object[]{null, "00001", "Mrs. Teacher"});
        System.out.println(model.classes.getFullTableJSON());
    }

}
