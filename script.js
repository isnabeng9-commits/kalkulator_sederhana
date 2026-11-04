let expression = "";

// Menampilkan angka atau operasi di layar
function updateDisplay() {
    document.getElementById("result").value = expression || "0";
}

// Menambahkan angka
function appendNumber(number) {
    if (expression === "Error") {
        expression = "";
    }

    expression += number;
    updateDisplay();
}

// Menambahkan operator matematika
function appendOperator(operator) {
    if (expression === "" || expression === "Error") {
        if (operator === "-") {
            expression = "-";
        } else {
            return;
        }
    } else {
        // Mengganti operator terakhir jika operator ditekan berulang
        if (/[+\-*/%]$/.test(expression)) {
            expression = expression.slice(0, -1);
        }

        expression += operator;
    }

    updateDisplay();
}

// Menghapus seluruh angka
function clearDisplay() {
    expression = "";
    document.getElementById("history").textContent = "";
    updateDisplay();
}

// Menghapus satu angka terakhir
function deleteNumber() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

// Menghitung hasil
function calculate() {
    try {
        if (expression === "") return;

        // Mencegah perhitungan jika diakhiri operator
        if (/[+\-*/%]$/.test(expression)) {
            return;
        }

        // Memastikan hanya karakter matematika yang diperbolehkan
        if (!/^[0-9+\-*/%.]+$/.test(expression)) {
            throw new Error("Input tidak valid");
        }

        let originalExpression = expression;

        // Menghitung hasil
        let result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Tidak dapat dihitung");
        }

        document.getElementById("history").textContent =
            originalExpression + " =";

        expression = String(Number(result.toFixed(10)));
        updateDisplay();

    } catch (error) {
        expression = "Error";
        updateDisplay();
    }
}
