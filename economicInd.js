const path = require("path");
const fs = require("fs");

const enviornmentalEffectOnEconomic = 0.334284162;
const socialEffectOnEconomic = 0.420955882;
let economicData = {
    BenchmarkYearValues: [],
    TargetYearValues: [],
    CurrentYearValues: []
}
let economicEigenValues = [
    0.073313098, 0.077982722, 0.069110437, 0.066542143, 0.076815316, 0.066542143, 0.077749241, 0.06981088, 0.072145692, 0.075881392, 0.066542143, 0.07167873, 0.075414429, 0.060471632
]

const overallEconomicEigenValue = 0.341476;

let targetAchievedFromBaselineYear = [];
let percentageOfTargetValueAchieved = [];
let valueAssignedForTargetAchieved = [];
let KPIValuesAchieved = [];
let maxKPIAchievedValues = [];
let maxNormalizedKPIValuesAchieved = [];
let normalizedKPIValuesAchieved = [];

const fields = document.querySelectorAll("input[type=number]");

document.querySelector('#btn-sbm').addEventListener('click', () => {
    console.log("Iam executed");
    fields.forEach((elem, index) => {
        if (index % 3 == 0) economicData['BenchmarkYearValues'].push(elem.value);
        else if (index % 3 == 1) economicData['TargetYearValues'].push(elem.value);
        else economicData['CurrentYearValues'].push(elem.value);
    });
    // console.log(BenchmarkYearValues, TargetYearValues, CurrentYearValues);

    for (let i = 0; i < economicData['BenchmarkYearValues'].length; i++) {
        if (i == 6 || i == 10 || i == 12) {
            targetAchievedFromBaselineYear.push(economicData['BenchmarkYearValues'][i] - economicData['CurrentYearValues'][i]);
        }
        else {
            targetAchievedFromBaselineYear.push(economicData['CurrentYearValues'][i] - economicData['BenchmarkYearValues'][i]);
        }
    }

    for (let i = 0; i < economicData['BenchmarkYearValues'].length; i++) {
        percentageOfTargetValueAchieved.push(targetAchievedFromBaselineYear[i] / Math.abs(economicData['TargetYearValues'][i] - economicData['BenchmarkYearValues'][i]));
    }

    for (let i = 0; i < economicData['BenchmarkYearValues'].length; i++) {
        if (percentageOfTargetValueAchieved[i] > 1)
            valueAssignedForTargetAchieved.push(1);
        else
            valueAssignedForTargetAchieved.push(percentageOfTargetValueAchieved[i]);
    }

    for (let i = 0; i < economicData['BenchmarkYearValues'].length; i++) {
        let KPIAchieved = valueAssignedForTargetAchieved[i] * economicEigenValues[i] * 100 * overallEconomicEigenValue * enviornmentalEffectOnEconomic * socialEffectOnEconomic;
        KPIValuesAchieved.push(KPIAchieved);
    }

    let sumOfMaxKPI = 0;

    for (let i = 0; i < economicData['BenchmarkYearValues'].length; i++) {
        let maxKPIValue = 100 * economicEigenValues[i] * overallEconomicEigenValue * enviornmentalEffectOnEconomic * socialEffectOnEconomic;
        maxKPIAchievedValues.push(maxKPIValue);
        sumOfMaxKPI += maxKPIValue;
    }

    //calculating normalized max KPI achieved --step 9
    for (let i = 0; i < economicData['BenchmarkYearValues'].length; i++) {
        let maxNormalizedKPIValue = (100 / sumOfMaxKPI) * maxKPIAchievedValues[i];
        maxNormalizedKPIValuesAchieved.push(maxNormalizedKPIValue);
    }

    //calculating normalized KPI values --step 10
    for (let i = 0; i < economicData['BenchmarkYearValues'].length; i++) {
        let normalizedKPIValue = (maxNormalizedKPIValuesAchieved[i] / maxKPIAchievedValues[i]) * KPIValuesAchieved[i];
        normalizedKPIValuesAchieved.push(normalizedKPIValue);
    }

    economicData['normalizedKPIValuesAchieved'] = normalizedKPIValuesAchieved;
    economicData['maxNormalizedKPIValuesAchieved'] = maxNormalizedKPIValuesAchieved;
    economicData['sustainabilityKPIAchieved'] = KPIValuesAchieved;
    economicData['maxKPIAchievedValues'] = maxKPIAchievedValues;

    // console.log(economicData);
    fs.writeFile(path.join(__dirname, 'data/economic.json'), JSON.stringify(economicData, null, 4), () => {
        let el = document.querySelectorAll("form");
        for (i = 0; i < el.length; ++i) {
            if (el[i].checkValidity() === false) {
                return;
            }
        }
        window.location.replace("environmentInd.html");
    });
});

