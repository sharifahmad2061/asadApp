const path = require("path");
const fs = require("fs");

const economicEffectOnSocial = 0.29200036;
const environmentalEffectOnSocial = 0.269084488;

let socialData = {
    BenchmarkYearValues: [],
    TargetYearValues: [],
    CurrentYearValues: []
}
let socialEigenValues = [
    0.077915377,
    0.075593395,
    0.077915377,
    0.074303406,
    0.077141383,
    0.072239422,
    0.074561404,
    0.069917441,
    0.079721362,
    0.083591331,
    0.08126935,
    0.074561404
]


const overallSocialEigenValue = 0.32527942;


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
        if (index % 3 == 0) socialData['BenchmarkYearValues'].push(elem.value);
        else if (index % 3 == 1) socialData['TargetYearValues'].push(elem.value);
        else socialData['CurrentYearValues'].push(elem.value);
    });

    loopControl = socialData['BenchmarkYearValues'].length;

    for (let i = 0; i < loopControl; i++) {
        if (i < 6) {
            targetAchievedFromBaselineYear.push(socialData['BenchmarkYearValues'][i] - socialData['CurrentYearValues'][i]);
        }
        else if (i > 6 && i < 9) {
            targetAchievedFromBaselineYear.push(socialData['CurrentYearValues'][i] - socialData['BenchmarkYearValues'][i]);
        }
        else {
            targetAchievedFromBaselineYear.push(socialData['CurrentYearValues'][i]);
        }
    }

    for (let i = 0; i < loopControl; i++) {
        if (i < 10) {
            percentageOfTargetValueAchieved.push(targetAchievedFromBaselineYear[i] / Math.abs(socialData['TargetYearValues'][i] - socialData['BenchmarkYearValues'][i]));
        } else {
            percentageOfTargetValueAchieved.push(socialData['CurrentYearValues'][i] / socialData['TargetYearValues'][i]);
        }
    }

    for (let i = 0; i < loopControl; i++) {
        if (percentageOfTargetValueAchieved[i] > 1)
            valueAssignedForTargetAchieved.push(1);
        else
            valueAssignedForTargetAchieved.push(percentageOfTargetValueAchieved[i]);
    }

    for (let i = 0; i < loopControl; i++) {
        let KPIAchieved = valueAssignedForTargetAchieved[i] * socialEigenValues[i] * 100 * overallSocialEigenValue * economicEffectOnSocial * environmentalEffectOnSocial;
        KPIValuesAchieved.push(KPIAchieved);
    }

    let sumOfMaxKPI = 0;

    for (let i = 0; i < loopControl; i++) {
        let maxKPIValue = 100 * socialEigenValues[i] * overallSocialEigenValue * economicEffectOnSocial * environmentalEffectOnSocial;
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

    socialData['normalizedKPIValuesAchieved'] = normalizedKPIValuesAchieved;
    socialData['maxNormalizedKPIValuesAchieved'] = maxNormalizedKPIValuesAchieved;
    socialData['sustainabilityKPIAchieved'] = KPIValuesAchieved;
    socialData['maxKPIAchievedValues'] = maxKPIAchievedValues;

    // console.log(socialData);
    fs.writeFile(path.join(__dirname, 'data/social.json'), JSON.stringify(socialData, null, 4), () => {
        let el = document.querySelectorAll("form");
        for (i = 0; i < el.length; ++i) {
            if (el[i].checkValidity() === false) {
                return;
            }
        }
        window.location.replace("graphs.html");
    });
});