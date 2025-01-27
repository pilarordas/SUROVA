function calculateRisk() { 
    // Verificar que todos los campos estén completos
    const fields = [
        "age", "race", "ecog", "ca125", "ascites", "stageIV", "grade", "treatment"
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

    // Coefficients for Relapse, Progression, or Death Risk (PFS) (Logistic Regression)
    const pfsCoefficients = {
        intercept: -0.459,
        age: -0.038,
        race: 0.019,
        ecog: 0.042,
        ca125: -0.010,
        stageIV: 0.413,
        treatment: 0.486,
        ascites: 0.390,
        grade: 0.833 // New variable
    };

    // Get values from inputs
    const age = parseFloat(document.getElementById("age").value) || 0;
    const race = parseFloat(document.getElementById("race").value) || 0;
    const ecog = parseFloat(document.getElementById("ecog").value) || 0;
    const stageIV = parseFloat(document.getElementById("stageIV").value) || 0;
    const treatment = parseFloat(document.getElementById("treatment").value) || 0;
    const ascites = parseFloat(document.getElementById("ascites").value) || 0;
    const grade = parseFloat(document.getElementById("grade").value) || 0;
    const ca125 = parseFloat(document.getElementById("ca125").value) || 0;


    // Logistic regression formula for PFS Risk
    const pfsLogit = pfsCoefficients.intercept +
        pfsCoefficients.age * age +
        pfsCoefficients.race * race +
        pfsCoefficients.ecog * ecog +
        pfsCoefficients.stageIV * stageIV +
        pfsCoefficients.treatment * treatment +
        pfsCoefficients.ascites * ascites +
        pfsCoefficients.grade * grade +
        pfsCoefficients.ca125 * ca125

    const pfsProbability = 1 / (1 + Math.exp(-pfsLogit));
    document.getElementById("resultPFS").textContent = (pfsProbability * 100).toFixed(2) + "%";

    // Categorize risk for Mortality
    let mortalityCategory;
    if (pfsProbability < 0.33) mortalityCategory = "Low";
    else if (pfsProbability < 0.5) mortalityCategory = "Moderate";
    else if (pfsProbability < 1) mortalityCategory = "High";
    else pfsProbability = "Very High";

    document.getElementById("categoryMortality").textContent = mortalityCategory;

    // Update traffic light
    const trafficLightContainer = document.getElementById("traffic-light");
    trafficLightContainer.innerHTML = ""; 
    const img = document.createElement("img");
    img.alt = `${mortalityCategory} risk traffic light`;
    
    if (mortalityCategory === "Low") {
        img.src = "semaforo_green.jpg";
    } else if (mortalityCategory === "Moderate") {
        img.src = "semaforo_yellow.jpg";
    } else if (mortalityCategory === "High") {
        img.src = "semaforo_red.jpg";
    }
    
    img.style.width = "50px";
    img.style.height = "auto";
    trafficLightContainer.appendChild(img);

}


