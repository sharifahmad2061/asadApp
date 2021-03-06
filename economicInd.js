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

let benchmarkPercentage;

let targetAchievedFromBaselineYear = [];
let percentageOfTargetValueAchieved = [];
let valueAssignedForTargetAchieved = [];
let KPIValuesAchieved = [];
let maxKPIAchievedValues = [];
let maxNormalizedKPIValuesAchieved = [];
let normalizedKPIValuesAchieved = [];

const fields = document.querySelectorAll("#main-form input[type=number]");
const be_tb_clr = document.querySelector("input[name=be-tb-clr]");

document.querySelector('#btn-sbm').addEventListener('click', () => {
    //clear the arrays
    economicData['BenchmarkYearValues'].length = 0;
    economicData['TargetYearValues'].length = 0;
    economicData['CurrentYearValues'].length = 0;


    fields.forEach((elem, index) => {
        if (index % 3 == 0) economicData['BenchmarkYearValues'].push(elem.value);
        else if (index % 3 == 1) economicData['TargetYearValues'].push(elem.value);
        else economicData['CurrentYearValues'].push(elem.value);
    });

    benchmarkPercentage = be_tb_clr.value / 100;

    // console.log(economicData['BenchmarkYearValues'], economicData['TargetYearValues'], economicData['CurrentYearValues']);

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

    // console.log(KPIValuesAchieved.length,maxKPIAchievedValues.length,maxNormalizedKPIValuesAchieved.length,normalizedKPIValuesAchieved.length);

    economicData['normalizedKPIValuesAchieved'] = normalizedKPIValuesAchieved;
    economicData['maxNormalizedKPIValuesAchieved'] = maxNormalizedKPIValuesAchieved;
    economicData['sustainabilityKPIAchieved'] = KPIValuesAchieved;
    economicData['maxKPIAchievedValues'] = maxKPIAchievedValues;
    economicData['percentageOfTargetValueAchieved'] = percentageOfTargetValueAchieved;
    economicData['benchmarkPercentage'] = benchmarkPercentage;

    // console.log(economicData);
    fs.writeFile(path.join(__dirname, 'data/economic.json'), JSON.stringify(economicData, null, 4), () => {
        let el = document.querySelectorAll("form");
        for (i = 0; i < el.length; ++i) {
            if (el[i].checkValidity() === false) {
                return;
            }
        }
        window.location.assign("environmentInd.html");
    });

    //write the fields data to local storage for retreiving later
    localStorage.setItem('ec_av','true');
    const it = document.querySelectorAll('input[name]');
    it.forEach((element)=>{
        localStorage.setItem(element.getAttribute('name'),element.value);
    });
});

//fill the fields with previous data if available
function fill_page(){
    if(Boolean(localStorage.getItem('ec_av')) == true){
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

// window.onbeforeunload = function(){
//     localStorage.clear();
// }