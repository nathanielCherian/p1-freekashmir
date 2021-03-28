package com.freekashmir.demo.Model;

import com.freekashmir.demo.Database.Column;
import com.freekashmir.demo.Database.Table;

public class Model {
    public Table classes;
    public Table projects;

    public Model(){
        classes = new Table("Classes")
                .addColumn(new Column("id", Column.INTEGER).isPrimaryKey())
                .addColumn(new Column("classCode", Column.VARCHAR).isUnique().isNotNull())
                .addColumn(new Column("teacherName", Column.VARCHAR).isNotNull())
                .create();

        projects = new Table("Projects")
                .addColumn(new Column("id", Column.INTEGER).isPrimaryKey())
                .addColumn(new Column("studentName", Column.VARCHAR).isNotNull())
                .addColumn(new Column("grade", Column.INTEGER))
                .addColumn(new Column("classCode", Column.VARCHAR).isNotNull().isForeignKey("Classes", "classCode", Column.CASCADE))
                .create();

    }

    public static void main(String[] args) {
        Model model = new Model();
        model.classes.createRow(new Object[]{null, "f134f", "Mrs. Teacher"});
        model.projects.createRow(new Object[]{null, "test"});
        System.out.println(model.classes.getFullTableJSON());
    }

}
