const path = require('path');
const fs = require('fs');

const economic_data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/economic.json'), 'utf8'));
const environment_data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/environmental.json'), 'utf8'));
const social_data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/social.json'), 'utf8'));

let maxKPIAchievedValues = [];
let sustainabilityKPIAchieved = [];

// console.log(economic_data['maxKPIAchievedValues'].length);
// console.log(environment_data['maxKPIAchievedValues'].length);
// console.log(social_data['maxKPIAchievedValues'].length);

maxKPIAchievedValues = economic_data['maxKPIAchievedValues'].concat(environment_data['maxKPIAchievedValues']).concat(social_data['maxKPIAchievedValues']);
sustainabilityKPIAchieved = economic_data['sustainabilityKPIAchieved'].concat(environment_data['sustainabilityKPIAchieved']).concat(social_data['sustainabilityKPIAchieved']);

// console.log(maxKPIAchievedValues);
// console.log(sustainabilityKPIAchieved);

let ca_pa = document.querySelector("#ca-pa");

let ra_btn_form = document.querySelector('#ra-btn-form');
let gr_btn_from = document.querySelector('#gr-btn-form');
let ec_tb = document.querySelector('#ec-tb').children[1];
let en_tb = document.querySelector('#en-tb').children[1];
let sl_tb = document.querySelector('#sl-tb').children[1];
let ec_hdr = document.querySelector('#ec-hdr');
let en_hdr = document.querySelector('#en-hdr');
let sl_hdr = document.querySelector('#sl-hdr');


//print functionality
const p_btn = document.querySelector("#p_btn");
p_btn.addEventListener('click', () => {
    window.print();
});

let option = 'economic';
let option2 = 'bar';

gr_btn_from.addEventListener('change', () => {
    // console.log("graph shape changed");
    option2 = document.querySelector('input[name=graph-shape]:checked').value;
    draw_graph(option, option2);
});

ra_btn_form.addEventListener('change', () => {
    // console.log("graph type changed");
    option = document.querySelector("input[name=graph-type]:checked").value;
    draw_graph(option, option2);
    show_heading(option);
    show_table(option);
    show_total_sustainability(option);
});

function draw_graph(type, shape) {
    let canvas;
    let ctx;
    switch (type) {
        case 'economic':
            while (ca_pa.firstChild) {
                ca_pa.removeChild(ca_pa.firstChild);
            }
            canvas = document.createElement('canvas');
            ca_pa.appendChild(canvas);
            ctx = canvas.getContext('2d');
            if (shape == 'bar') draw_economic_data(economic_data, ctx);
            else if (shape == 'doughnut') draw_economic_data_as_pie(economic_data, ctx);
            break;
        case 'environmental':
            while (ca_pa.firstChild) {
                ca_pa.removeChild(ca_pa.firstChild);
            }
            canvas = document.createElement('canvas');
            ca_pa.appendChild(canvas);
            ctx = canvas.getContext('2d');
            if (shape == 'bar') draw_environment_data(environment_data, ctx);
            else if (shape == 'doughnut') draw_environment_data_as_pie(environment_data, ctx);
            break;
        case 'social':
            while (ca_pa.firstChild) {
                ca_pa.removeChild(ca_pa.firstChild);
            }
            canvas = document.createElement('canvas');
            ca_pa.appendChild(canvas);
            ctx = canvas.getContext('2d');
            if (shape == 'bar') draw_social_data(social_data, ctx);
            else if (shape == 'doughnut') draw_social_data_as_pie(social_data, ctx);
            break;
        case 'total':
            while (ca_pa.firstChild) {
                ca_pa.removeChild(ca_pa.firstChild);
            }
            canvas = document.createElement('canvas');
            ca_pa.appendChild(canvas);
            ctx = canvas.getContext('2d');
            draw_total_data(sustainabilityKPIAchieved, maxKPIAchievedValues, ctx);
            break;
        default:
            break;
    }
}

function draw_economic_data(data, ctx) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Revenue through sale of product", "increase in market share", "revenue through investment in other products", "revenue from other sources", "new export markets", "revenue through carbon credits", "op cost of cement production", "cost of borrowing money", "alternative fuels", "heat capture", "implications of physical or regulatory activity", "cost of investment in community", "cost of taxes to the government", "value of tax credits and reliefs"],
            datasets: [{
                label: 'Achieved',
                data: data['normalizedKPIValuesAchieved'],
                backgroundColor: '#B664F0',
                borderWidth: 1
            }, {
                label: 'Target',
                data: data['maxNormalizedKPIValuesAchieved'],
                backgroundColor: '#E32481',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        autoSkip: false
                    }
                }]
            }
        }
    });
}
function draw_economic_data_as_pie(data, ctx) {
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ["Revenue through sale of product", "increase in market share", "revenue through investment in other products", "revenue from other sources", "new export markets", "revenue through carbon credits", "op cost of cement production", "cost of borrowing money", "alternative fuels", "heat capture", "implications of physical or regulatory activity", "cost of investment in community", "cost of taxes to the government", "value of tax credits and reliefs"],
            datasets: [{
                label: 'Achieved',
                data: data['normalizedKPIValuesAchieved'],
                backgroundColor: 'rgba(182, 100, 240,0.1)',
                borderColor: '#B664F0'
            }, {
                label: 'Target',
                data: data['maxNormalizedKPIValuesAchieved'],
                backgroundColor: 'rgba(227, 36, 129,0.1)',
                borderColor: '#E32481'
            }]
        }
    });
}


function draw_environment_data(data, ctx) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["electricity consumption", "electricity from non renewable sources", "CO2 emissions", "heat captured", "Air emissions of SOX", "Air emissions of NOX", "Emissions of particulate matters", "grievances about environment impact", "grievances addressed about environment impact", "grievances resolved about environment impact", "emp suggesstions implemented"],
            datasets: [{
                label: 'Achieved',
                data: data['normalizedKPIValuesAchieved'],
                backgroundColor: '#B664F0',
                borderWidth: 1
            }, {
                label: 'Target',
                data: data['maxNormalizedKPIValuesAchieved'],
                backgroundColor: '#E32481',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        autoSkip: false
                    }
                }]
            }
        }
    });
}

function draw_environment_data_as_pie(data, ctx) {
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ["electricity consumption", "electricity from non renewable sources", "CO2 emissions", "heat captured", "Air emissions of SOX", "Air emissions of NOX", "Emissions of particulate matters", "grievances about environment impact", "grievances addressed about environment impact", "grievances resolved about environment impact", "emp suggesstions implemented"],
            datasets: [{
                label: 'Achieved',
                data: data['normalizedKPIValuesAchieved'],
                backgroundColor: 'rgba(182, 100, 240,0.1)',
                borderColor: "#B664F0"
            }, {
                label: 'Target',
                data: data['maxNormalizedKPIValuesAchieved'],
                backgroundColor: 'rgba(227, 36, 129,0.1)',
                borderColor: "#E32481"
            }]
        }
    });
}

function draw_social_data(data, ctx) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["days of lost work reported", "work related injuries", "Occupational illnesses", "absence rate", "work related fatalities", "workers with high risk of diseases", "emp hired in age group of 20 & 40", "female employees", "emp turn over for age group of 20 & 40", "life insurance", "health coverage", "disability coverage", "parental leave"],
            datasets: [{
                label: 'Achieved',
                data: data['normalizedKPIValuesAchieved'],
                backgroundColor: '#B664F0',
                borderWidth: 1
            }, {
                label: 'Target',
                data: data['maxNormalizedKPIValuesAchieved'],
                backgroundColor: '#E32481',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        autoSkip: false
                    }
                }]
            }
        }
    });
}

function draw_social_data_as_pie(data, ctx) {
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ["days of lost work reported", "work related injuries", "Occupational illnesses", "absence rate", "work related fatalities", "workers with high risk of diseases", "emp hired in age group of 20 & 40", "female employees", "emp turn over for age group of 20 & 40", "life insurance", "health coverage", "disability coverage", "parental leave"],
            datasets: [{
                label: 'Achieved',
                data: data['normalizedKPIValuesAchieved'],
                backgroundColor: 'rgba(182, 100, 240,0.1)',
                borderColor: "#B664F0"
            }, {
                label: 'Target',
                data: data['maxNormalizedKPIValuesAchieved'],
                backgroundColor: 'rgba(227, 36, 129,0.1)',
                borderColor: "#E32481"
            }]
        }
    });
}

function draw_total_data(arr1, arr2, ctx) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Revenue through sale of product", "increase in market share", "revenue through investment in other products", "revenue from other sources", "new export markets", "revenue through carbon credits", "op cost of cement production", "cost of borrowing money", "alternative fuels", "heat capture", "implications of physical or regulatory activity", "cost of investment in community", "cost of taxes to the government", "value of tax credits and reliefs", "electricity consumption", "electricity from non renewable sources", "CO2 emissions", "heat captured", "heat captured", "Air emissions of SOX", "Air emissions of NOX", "Emissions of particulate matters", "grievances about environment impact", "grievances addressed about environment impact", "grievances resolved about environment impact", "emp suggesstions implemented", "days of lost work reported", "work related injuries", "Occupational illnesses", "absence rate", "work related fatalities", "workers with high risk of diseases", "emp hired in age group of 20 & 40", "female employees", "emp turn over for age group of 20 & 40", "life insurance", "health coverage", "disability coverage", "parental leave"],
            datasets: [{
                label: 'sustainability KPI Achieved',
                data: arr1,
                backgroundColor: '#B664F0',
                borderWidth: 1
            }, {
                label: 'max KPI Achieved',
                data: arr2,
                backgroundColor: '#E32481',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        autoSkip: false
                    }
                }]
            }
        }
    });
}

function populate_tables() {
    economic_data['percentageOfTargetValueAchieved'].forEach((element, index) => {
        ec_tb.children[index].children[2].innerHTML = (element * 100).toFixed(2);
        ec_tb.children[index].children[3].innerHTML = element >= economic_data['benchmarkPercentage'] ? 'target achieved' : 'needs improvement';
    });
    environment_data['percentageOfTargetValueAchieved'].forEach((element, index) => {
        en_tb.children[index].children[2].innerHTML = (element * 100).toFixed(2);
        en_tb.children[index].children[3].innerHTML = element >= economic_data['benchmarkPercentage'] ? 'target achieved' : 'needs improvement';
    });
    social_data['percentageOfTargetValueAchieved'].forEach((element, index) => {
        sl_tb.children[index].children[2].innerHTML = (element * 100).toFixed(2);
        sl_tb.children[index].children[3].innerHTML = element >= economic_data['benchmarkPercentage'] ? 'target achieved' : 'needs improvement';
    });
}

function show_table(type) {
    switch (type) {
        case 'economic':
            ec_tb.parentElement.classList.remove('hidden');
            en_tb.parentElement.classList.add('hidden');
            sl_tb.parentElement.classList.add('hidden');
            break;
        case 'environmental':
            en_tb.parentElement.classList.remove('hidden');
            ec_tb.parentElement.classList.add('hidden');
            sl_tb.parentElement.classList.add('hidden');
            break;
        case 'social':
            ec_tb.parentElement.classList.add('hidden');
            en_tb.parentElement.classList.add('hidden');
            sl_tb.parentElement.classList.remove('hidden');
            break;
        default:
            ec_tb.parentElement.classList.add('hidden');
            en_tb.parentElement.classList.add('hidden');
            sl_tb.parentElement.classList.add('hidden');
            break;
    }
}

function show_heading(type) {
    switch (type) {
        case 'economic':
            ec_hdr.classList.remove('hidden');
            en_hdr.classList.add('hidden');
            sl_hdr.classList.add('hidden');
            break;
        case 'environmental':
            en_hdr.classList.remove('hidden');
            ec_hdr.classList.add('hidden');
            sl_hdr.classList.add('hidden');
            break;
        case 'social':
            ec_hdr.classList.add('hidden');
            en_hdr.classList.add('hidden');
            sl_hdr.classList.remove('hidden');
            break;
        default:
            ec_hdr.classList.add('hidden');
            en_hdr.classList.add('hidden');
            sl_hdr.classList.add('hidden');
            break;
    }
}


function reducer(total, item) {
    console.log(item);
    if (item > 0) return total + item;
    else return total;
}


function show_total_sustainability(type) {
    let desc = document.querySelector("#desc");
    let val = document.querySelector("#val");
    switch (type) {
        case 'economic':
            desc.textContent = "Total Economic Sustainability = ";
            val.textContent = (economic_data['normalizedKPIValuesAchieved'].reduce(reducer, 0)).toFixed(2) + " %";
            break;
        case 'environmental':
            desc.textContent = "Total Environmental Sustainability = ";
            val.textContent = (environment_data['normalizedKPIValuesAchieved'].reduce(reducer, 0)).toFixed(2) + " %";
            break;
        case 'social':
            desc.textContent = "Total social Sustainability = ";
            val.textContent = (social_data['normalizedKPIValuesAchieved'].reduce(reducer, 0)).toFixed(2) + " %";
            break;
        case 'total':
            desc.textContent = "Accumulated Sustainability = ";
            let temp = economic_data['normalizedKPIValuesAchieved'].reduce(reducer, 0) + environment_data['normalizedKPIValuesAchieved'].reduce(reducer, 0) + social_data['normalizedKPIValuesAchieved'].reduce(reducer, 0);
            temp /= 300;
            temp *= 100;
            val.textContent = temp.toFixed(2) + " %";
        default:
            break;
    }
}

draw_graph(option, option2);
populate_tables();
show_heading(option);
show_table(option);
show_total_sustainability(option);