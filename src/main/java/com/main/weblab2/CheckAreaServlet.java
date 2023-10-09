package com.main.weblab2;

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

        boolean result = false;

        if (validate(x, y, r)){
            result = checker(Float.parseFloat(x), Float.parseFloat(y), Float.parseFloat(r));
        }

        Dot dot = new Dot();
        dot.setDot(Float.parseFloat(x), Float.parseFloat(y), Float.parseFloat(r), result);
        list.add(dot);

        request.setAttribute("Dots", list);

        response.getWriter().write(x + " " + y + " " + r + " " + setColor(result));

    }
    private static boolean checkFirst(float x, float y, float r){
        return x * x + y * y <= r * r;
    }
    private static boolean checkFourth(float x, float y, float r){
        return x - r / 2 - y <= 0;
    }
    private static boolean checkThird(float x, float y, float r){
        return Math.abs(x) <= r && Math.abs(y) <= r / 2;
    }
    private boolean checker(float x, float y, float r){
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
            Float.parseFloat(x);
            Float.parseFloat(y);
            float R = Float.parseFloat(r);

            return !(R <= 0);
        }catch (Exception e){
            return false;
        }
    }
    private static String setColor(boolean result){
        if (result) {
            return "green";
        } else {
            return "red";
        }
    }
}