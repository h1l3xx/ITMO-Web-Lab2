function validateR() {
    let value = document.getElementById("R_input");
    let r = value.value.replace(',', '.');
    if (!checkNum(r) || parseFloat(r) < 1 || parseFloat(r) > 4) {


        value.setCustomValidity("Указанное значение должно быть между 1 и 4.");

        value.reportValidity();


        return false;
    } else {
        value.setCustomValidity("");
        value.reportValidity();

        return true;
    }

}

function checkNum(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}
function validateY() {
    let value = document.getElementById("Y_input");
    let y = value.value.replace(',', '.');
    if (!checkNum(y) || parseFloat(y) > 3 || parseFloat(y) < -5) {


        value.setCustomValidity("Указанное значение должно быть между -5 и 3.");

        value.reportValidity();


        return false;
    } else {
        value.setCustomValidity("");
        value.reportValidity();

        return true;
    }

}