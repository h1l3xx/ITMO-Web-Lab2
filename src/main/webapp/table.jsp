<%@ page import="com.main.weblab2.Dot" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="java.util.LinkedList" %>
<%@ page contentType="text/html;charset=UTF-8"%>

<!doctype html>
<html lang="ru-RU">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Лабораторная работа №2</title>
</head>
<body>

        <%
            PrintWriter outer = response.getWriter();

            outer.println("<div class='table'>");
            outer.println("<div>");
            outer.println("<button id='back'><label>Назад</label></button>");
            outer.println("</div>");
            outer.println("<div class='grid-table'>");
            outer.println("<div class='grid-row'>");
            outer.println("<div>");
            outer.println("X");
            outer.println("</div>");
            outer.println("<div>Y</div><div>R</div><div>Результат</div></div>");


            LinkedList<Dot> dots = (LinkedList<Dot>) request.getAttribute("Dots");
            for (Dot dot : dots) {
                outer.println("<div class='grid-row'>");
                outer.println("<div>" + dot.x + " </div>");
                outer.println("<div>" + dot.y + " </div>");
                outer.println("<div>" + dot.r + " </div>");
                String shoot = "Промах";
                if (dot.shoot) {
                    shoot = "Попадание";
                    outer.println("<div class='success'>" + shoot + " </div>");
                } else {
                    outer.println("<div class='lose'>" + shoot + " </div>");
                }
                outer.println("</div>");
            }
            outer.println("</div>");
            outer.println("</div>");
        %>
</body>
<style>
    *{
        font-family: 'Arial', fantasy;
        font-size: 27px;
    }

    body {
        display: inline;
        width: 100%;
        margin: 0 auto;
        background-color: #605CB1;
        color: #91FD7E;
    }
    header{
        font-family: serif;
        color: #91FD7E;
        font-size: 2.5em;
        text-align: center;
    }

    table{
        border-collapse: separate;
        border: none;
        width: 300px;
    }

    .grid-table {
        display: flex;
        flex-direction: column;
        text-align: center;
    }

    .grid-row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    .lose {
        color: #FF0000;
    }
    .success {
        color : #91FD7E;
    }
    button {
        display: flex;
        margin-left: 48%;
        margin-top: 20px;
        margin-bottom: 20px;
        background-color: #605CB1;
        border: 2px solid #91FD7E;


        text-align: center;
        color: #91FD7E;
        width: auto;
        padding: 0.5em;
        height: auto;
        border-radius: 15px;
    }


    button:hover{
        background-color: #91FD7E;
        border: 2px solid #605CB1;

        color: #605CB1;

    }
</style>
<script>
    document.getElementById("back").onclick = function (){
        window.history.go(-1)
    }
</script>
</html>
