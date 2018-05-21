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

const fields = document.querySelectorAll("#main-form input[type=number]");
//const be_tb_clr = document.querySelector("input[name=be-tb-clr]");

document.querySelector('#btn-sbm').addEventListener('click', () => {
    //clear the arrays
    environmentalData['BenchmarkYearValues'].length = 0;
    environmentalData['TargetYearValues'].length = 0;
    environmentalData['CurrentYearValues'].length = 0;

    fields.forEach((elem, index) => {
        if (index % 3 == 0) environmentalData['BenchmarkYearValues'].push(elem.value);
        else if (index % 3 == 1) environmentalData['TargetYearValues'].push(elem.value);
        else environmentalData['CurrentYearValues'].push(elem.value);
    });

//    benchmarkPercentage = be_tb_clr.value / 100;
    // console.log(environmentalData['BenchmarkYearValues']);

    loopControl = environmentalData['BenchmarkYearValues'].length;

    //ask for reason
    for (let i = 0; i < loopControl; i++) {
        if (i < 8) {
            targetAchievedFromBaselineYear.push(Math.abs(environmentalData['BenchmarkYearValues'][i] - environmentalData['CurrentYearValues'][i]));
        }
        else {
            targetAchievedFromBaselineYear.push(Math.abs(environmentalData['CurrentYearValues'][i] - environmentalData['BenchmarkYearValues'][i]));
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

    // console.log(KPIValuesAchieved.length,maxKPIAchievedValues.length,maxNormalizedKPIValuesAchieved.length,normalizedKPIValuesAchieved.length);
    

    environmentalData['normalizedKPIValuesAchieved'] = normalizedKPIValuesAchieved;
    environmentalData['maxNormalizedKPIValuesAchieved'] = maxNormalizedKPIValuesAchieved;
    environmentalData['sustainabilityKPIAchieved'] = KPIValuesAchieved;
    environmentalData['maxKPIAchievedValues'] = maxKPIAchievedValues;
    environmentalData['percentageOfTargetValueAchieved'] = percentageOfTargetValueAchieved;
//    environmentalData['benchmarkPercentage'] = benchmarkPercentage;

    // console.log(environmentalData);
    fs.writeFile(path.join(__dirname, 'data/environmental.json'), JSON.stringify(environmentalData, null, 4), () => {
        let el = document.querySelectorAll("form");
        for (i = 0; i < el.length; ++i) {
            if (el[i].checkValidity() === false) {
                return;
            }
        }
        window.location.assign("socialInd.html");
    });

    //write the fields data to local storage for retreiving later
    localStorage.setItem('en_av','true');
    const it = document.querySelectorAll('input[name]');
    it.forEach((element)=>{
        localStorage.setItem(element.getAttribute('name'),element.value);
    });
});

//fill the fields with previous data if available
function fill_page(){
    if(Boolean(localStorage.getItem('en_av')) == true){
        const it = document.querySelectorAll('input[name]');
        it.forEach((element)=>{
            element.value = localStorage.getItem(element.getAttribute('name'));
        })
    }
}
fill_page();

var print_btn = document.querySelector("#p_btn");
print_btn.addEventListener('click',()=>{
    window.print();
});