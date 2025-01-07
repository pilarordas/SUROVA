function calculateRisk() { 
    // Verificar que todos los campos estén completos
    const fields = [
        "age", "ecog", "stageIV", "treatment", "ascites", "parp", "residual", "complications", "complicationsGreaterGrade3"
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

    // Coefficients
    const coefficients = {
        intercept: 0,
        age: 0.283, // Updated value
        ecog: 0.212, // Updated value
        stageIV: 0.102, // Updated value
        treatment: 0.250, // Updated value
        ascites: 0.279, // Updated value
        parp: -0.698, // Updated value
        residual: 0.532, // Updated value
        complications: 0.302, // Updated value
        complicationsGreaterGrade3: 1.176 // New variable
    };
    
    // Get values from inputs
    const age = parseFloat(document.getElementById("age").value) || 0;
    const ecog = parseFloat(document.getElementById("ecog").value) || 0;
    const stageIV = parseFloat(document.getElementById("stageIV").value) || 0;
    const treatment = parseFloat(document.getElementById("treatment").value) || 0;
    const ascites = parseFloat(document.getElementById("ascites").value) || 0;
    const parp = parseFloat(document.getElementById("parp").value) || 0;
    const residual = parseFloat(document.getElementById("residual").value) || 0;
    const complications = parseFloat(document.getElementById("complications").value) || 0;
    const complicationsGreaterGrade3 = parseFloat(document.getElementById("complicationsGreaterGrade3").value) || 0;
    
    // Logistic regression formula
    const logit = coefficients.intercept +
        coefficients.age * age +
        coefficients.ecog * ecog +
        coefficients.stageIV * stageIV +
        coefficients.treatment * treatment +
        coefficients.ascites * ascites +
        coefficients.parp * parp +
        coefficients.residual * residual +
        coefficients.complications * complications +
        coefficients.complicationsGreaterGrade3 * complicationsGreaterGrade3;
    
    const probability = 1 / (1 + Math.exp(-logit));
    document.getElementById("result").textContent = (probability * 100).toFixed(2) + "%";

    // Categorize risk
    let category;
    if (probability < 0.5) category = "Low";
    else if (probability < 0.7) category = "Moderate";
    else if (probability < 0.8) category = "High";
    else category = "Very High";

    document.getElementById("category").textContent = category;
}
