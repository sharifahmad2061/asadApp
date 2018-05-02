const path = require("path");
const fs = require("fs");

const economicEffectOnEnvironmental = 0.313686673;
const socialEffectOnEnvironmental = 0.277982026;

let environmentalData = {
    BenchmarkYearValues: [],
    TargetYearValues: [],
    CurrentYearValues: []
}
let environmentalEigenValues = [
    0.096130952,
    0.092857143,
    0.098214286,
    0.094642857,
    0.092857143,
    0.091369048,
    0.091071429,
    0.088988095,
    0.085416667,
    0.083630952,
    0.084821429
]


const overallEnvironmentalEigenValue = 0.333244326;


let loopControl;
let targetAchievedFromBaselineYear = [];
let percentageOfTargetValueAchieved = [];
let valueAssignedForTargetAchieved = [];
let KPIValuesAchieved = [];
let maxKPIAchievedValues = [];
let maxNormalizedKPIValuesAchieved = [];
let normalizedKPIValuesAchieved = [];

const fields = document.querySelectorAll("input[type=number]");

document.querySelector('#btn-sbm').addEventListener('click', () => {
    fields.forEach((elem, index) => {
        if (index % 3 == 0) environmentalData['BenchmarkYearValues'].push(elem.value);
        else if (index % 3 == 1) environmentalData['TargetYearValues'].push(elem.value);
        else environmentalData['CurrentYearValues'].push(elem.value);
    });

    loopControl = environmentalData['BenchmarkYearValues'].length;

    for (let i = 0; i < loopControl; i++) {
        if (i < 8) {
            targetAchievedFromBaselineYear.push(environmentalData['BenchmarkYearValues'][i] - environmentalData['CurrentYearValues'][i]);
        }
        else {
            targetAchievedFromBaselineYear.push(environmentalData['CurrentYearValues'][i] - environmentalData['BenchmarkYearValues'][i]);
        }
    }

    for (let i = 0; i < loopControl; i++) {
        percentageOfTargetValueAchieved.push(targetAchievedFromBaselineYear[i] / Math.abs(environmentalData['TargetYearValues'][i] - environmentalData['BenchmarkYearValues'][i]));
    }

    for (let i = 0; i < loopControl; i++) {
        if (percentageOfTargetValueAchieved[i] > 1)
            valueAssignedForTargetAchieved.push(1);
        else
            valueAssignedForTargetAchieved.push(percentageOfTargetValueAchieved[i]);
    }

    for (let i = 0; i < loopControl; i++) {
        let KPIAchieved = valueAssignedForTargetAchieved[i] * environmentalEigenValues[i] * 100 * overallEnvironmentalEigenValue * economicEffectOnEnvironmental * socialEffectOnEnvironmental;
        KPIValuesAchieved.push(KPIAchieved);
    }

    let sumOfMaxKPI = 0;

    for (let i = 0; i < loopControl; i++) {
        let maxKPIValue = 100 * environmentalEigenValues[i] * overallEnvironmentalEigenValue * economicEffectOnEnvironmental * socialEffectOnEnvironmental;
        maxKPIAchievedValues.push(maxKPIValue);
        sumOfMaxKPI += maxKPIValue;
    }

    //calculating normalized max KPI achieved --step 9
    for (let i = 0; i < loopControl; i++) {
        let maxNormalizedKPIValue = (100 / sumOfMaxKPI) * maxKPIAchievedValues[i];
        maxNormalizedKPIValuesAchieved.push(maxNormalizedKPIValue);
    }

    //calculating normalized KPI values --step 10
    for (let i = 0; i < loopControl; i++) {
        let normalizedKPIValue = (maxNormalizedKPIValuesAchieved[i] / maxKPIAchievedValues[i]) * KPIValuesAchieved[i];
        normalizedKPIValuesAchieved.push(normalizedKPIValue);
    }

    environmentalData['normalizedKPIValuesAchieved'] = normalizedKPIValuesAchieved;
    environmentalData['maxNormalizedKPIValuesAchieved'] = maxNormalizedKPIValuesAchieved;

    // console.log(environmentalData);
    fs.writeFile(path.join(__dirname, 'data/environmental.json'), JSON.stringify(environmentalData, null, 4), () => {
        let el = document.querySelectorAll("form");
        for (i = 0; i < el.length; ++i) {
            if (el[i].checkValidity() === false) {
                return;
            }
        }
        window.location.replace("socialInd.html");
    });
});