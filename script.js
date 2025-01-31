function calculateRisk() { 
    // Verificar que todos los campos estén completos
    const fields = [
        "age", "ecog", "stageIV", "treatment", "ascites", "parp", "residual", "complicationsGreaterGrade3"
    ];

    let allFieldsFilled = true;
    fields.forEach(field => {
        const value = document.getElementById(field).value;
        if (!value) {
            allFieldsFilled = false;
        }
    });

    if (!allFieldsFilled) {
        alert('Please complete all fields before calculating the risk.');
        return;
    }

    function safeParse(value) {
        return isNaN(parseFloat(value)) ? 0 : parseFloat(value);
    }

    // Obtener valores de los inputs
    const values = {
        age: safeParse(document.getElementById("age").value),
        ecog: safeParse(document.getElementById("ecog").value),
        stageIV: safeParse(document.getElementById("stageIV").value),
        treatment: safeParse(document.getElementById("treatment").value),
        ascites: safeParse(document.getElementById("ascites").value),
        parp: safeParse(document.getElementById("parp").value),
        residual: safeParse(document.getElementById("residual").value),
        complicationsGreaterGrade3: safeParse(document.getElementById("complicationsGreaterGrade3").value)
    };

    // Coeficientes de regresión de Cox para OS y PFS
    const coefficientsOS = {
        age: 0.305,
        ecog: 0.232,
        ascites: 0.281,
        stageIV: 0.136,
        treatment: 0.245,
        residual: 0.542,
        complicationsGreaterGrade3: 0.449,
        parp: -0.708
    };

    const coefficientsPFS = {
        age: 0.098,
        ecog: 0.127,
        ascites: 0.210,
        stageIV: 0.169,
        treatment: 0.269,
        residual: 0.469,
        complicationsGreaterGrade3: 0.287,
        parp: -0.749
    };

    function calculateRiskScore(values, coefficients) {
        let riskScore = 0;
        for (const key in coefficients) {
            riskScore += (values[key] || 0) * coefficients[key];
        }
        return riskScore;
    }

    function calculateHR(riskScore) {
        return parseFloat(Math.exp(riskScore).toFixed(4)); // Asegurar precisión
    }

    function calculateHazardRatios(values) {
        const osRiskScore = calculateRiskScore(values, coefficientsOS);
        const pfsRiskScore = calculateRiskScore(values, coefficientsPFS);

        const hrOS = calculateHR(osRiskScore);
        const hrPFS = calculateHR(pfsRiskScore);

        document.getElementById("osHR").textContent = `HR (OS): ${hrOS}`;
        document.getElementById("pfsHR").textContent = `HR (PFS): ${hrPFS}`;
    }

    // Llamar a la función para calcular HRs con valores actualizados
    calculateHazardRatios(values);
}


