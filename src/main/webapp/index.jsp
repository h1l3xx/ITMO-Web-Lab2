<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ru-RU">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="css/index.css" type="text/css"/>
  <title>Лабораторная работа №2</title>
</head>
<body>
<header>
  <h1>Маликов Александр. P3222 Вариант: 66032</h1>
</header>
<div>
  <label for="X_input" class="label">Введите X:</label>
  <table id="X_input">
    <tr>
      <td><label><input name="X" type="radio" value="-5">-5</label></td>
      <td><label><input name="X" type="radio" value="-4">-4</label></td>
      <td><label><input name="X" type="radio" value="-3">-3</label></td>
    </tr>
    <tr>
      <td><label><input name="X" type="radio" value="-2">-2</label></td>
      <td><label><input name="X" type="radio" value="-1">-1</label></td>
      <td><label><input name="X" type="radio" value="0">0</label></td>
    </tr>
    <tr>
      <td><label><input name="X" type="radio" value="1">1</label></td>
      <td><label><input name="X" type="radio" value="2">2</label></td>
      <td><label><input name="X" type="radio" value="3">3</label></td>
    </tr>
  </table>
</div>
<div>
  <canvas id="graph" width="400" height="400" class="graph"></canvas>
</div>
<div>
  <label for="Y_input" class="label">
    Введите Y:
  </label><br>
  <input type="text" id="Y_input" maxlength="16">
</div>
<div>
  <label for="R_input" class="label">
    Введите R:
  </label><br>
  <input type="text" id="R_input" maxlength="16">
</div>
<div>
  <button id="checkButton"><label>Проверить</label></button>
</div>
<div>
  <button id="clearButton"><label>Очистить</label></button>
</div>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="js/Canvas.js"></script>
<script src="js/Dot.js"></script>
<script src="js/Validator.js"></script>
<script src="js/main.js"></script>
</body>
</html>