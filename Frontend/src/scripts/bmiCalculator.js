export function calculateBMI() {
    let number1 = parseFloat(document.getElementById("number1").value);
    let number2 = parseFloat(document.getElementById("number2").value);

    const resultElement = document.getElementById("result");

    if (isNaN(number1) || isNaN(number2)) {
        resultElement.innerText = "Błąd: Wprowadź poprawne liczby.";
        resultElement.style.color = "red";
        return;
    }

    if (number1 <= 0 || number2 <= 0) {
        resultElement.innerText = "Błąd: Waga i wzrost muszą być większe od zera.";
        resultElement.style.color = "red";
        return;
    }

    let bmi = (number1 / (number2 * number2)) * 10000;
    let roundedBMI = bmi.toFixed(2);
    resultElement.innerText = "BMI wynosi: " + roundedBMI;

    if (roundedBMI < 18.5) {
        resultElement.style.color = "red";
    } else if (roundedBMI >= 18.5 && roundedBMI < 25) {
        resultElement.style.color = "green";
    } else if (roundedBMI >= 25 && roundedBMI < 30) {
        resultElement.style.color = "yellow";
    } else {
        resultElement.style.color = "orange";
    }
}
