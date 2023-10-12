package com.main.weblab2.servlets;

import com.main.weblab2.utils.Dot;
import com.main.weblab2.utils.Result;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.*;
@WebServlet(name = "CheckAreaServlet", value = "/controller/check")
public class CheckAreaServlet extends HttpServlet {
    public LinkedList<Dot> list = new LinkedList<>();

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        request.setAttribute("Dots", list);
        getServletContext().getRequestDispatcher("/table.jsp").forward(request, response);
    }
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{
        String x = request.getParameter("X");
        String y = request.getParameter("Y");
        String r = request.getParameter("R");

        Result result = Result.MISS;

        if (validate(x, y, r)){
            if (checker(Double.parseDouble(x), Double.parseDouble(y), Double.parseDouble(r))){
                result = Result.HIT;
            }
        }else{
            result = Result.INCORRECT_DATA;
        }

        Dot dot = new Dot();
        if (result == Result.HIT || result == Result.MISS){
            dot.setDot(Double.parseDouble(x), Double.parseDouble(y), Double.parseDouble(r), result);
        }else{
            dot.setDot(0, 0, 0, result);
        }

        list.add(dot);

        request.setAttribute("Dots", list);

        response.getWriter().write(x + " " + y + " " + r + " " + setColor(result));

    }
    private static boolean checkFirst(double x, double y, double r){
        return x * x + y * y <= r * r;
    }
    private static boolean checkFourth(double x, double y, double r){
        return x - r / 2 - y <= 0;
    }
    private static boolean checkThird(double x, double y, double r){
        return Math.abs(x) <= r && Math.abs(y) <= r / 2;
    }
    private boolean checker(double x, double y, double r){
        if (x >= 0 && y >= 0){
            return checkFirst(x, y, r);
        } else if (x >= 0 && y <= 0) {
            return checkFourth(x, y, r);
        } else if (x <= 0 && y <= 0) {
            return checkThird(x, y, r);
        }else{
            return false;
        }
    }
    private static boolean validate(String x, String y, String r){
        try {
            Double.parseDouble(x);
            Double.parseDouble(y);
            double R = Double.parseDouble(r);

            return !(R <= 0);
        }catch (Exception e){
            return false;
        }
    }
    private static String setColor(Result result){
        if (result == Result.HIT) {
            return "green";
        } else {
            return "red";
        }
    }
}