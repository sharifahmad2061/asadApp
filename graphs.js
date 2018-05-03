const path = require('path');
const fs = require('fs');

const economic_data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/economic.json'), 'utf8'));
const environment_data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/environmental.json'), 'utf8'));
const social_data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/social.json'), 'utf8'));

let maxKPIAchievedValues = [];
let sustainabilityKPIAchieved = [];

maxKPIAchievedValues = economic_data['maxKPIAchievedValues'].concat(environment_data['maxKPIAchievedValues']).concat(social_data['maxKPIAchievedValues']);
sustainabilityKPIAchieved = economic_data['sustainabilityKPIAchieved'].concat(environment_data['sustainabilityKPIAchieved']).concat(social_data['sustainabilityKPIAchieved']);

console.log(maxKPIAchievedValues);
console.log(sustainabilityKPIAchieved);

let ca_pa = document.querySelector("#ca-pa");

let ra_btn_form = document.querySelector('#ra-btn-form');
let option;

ra_btn_form.addEventListener('change', () => {
    option = document.querySelector("input[name=graph-type]:checked").value;
    if (option == "economic") {
        while (ca_pa.firstChild) {
            ca_pa.removeChild(ca_pa.firstChild);
        }
        let canvas = document.createElement('canvas');
        let w = document.createAttribute('width');
        w.value = 800;
        let h = document.createAttribute('height');
        h.value = 500;
        canvas.setAttributeNode(w);
        canvas.setAttributeNode(h);
        console.log(canvas);
        ca_pa.appendChild(canvas);
        let ctx = canvas.getContext('2d');
        draw_economic_data(economic_data, ctx);
    } else if (option == "environmental") {
        while (ca_pa.firstChild) {
            ca_pa.removeChild(ca_pa.firstChild);
        }
        let canvas = document.createElement('canvas');
        let w = document.createAttribute('width');
        w.value = 800;
        let h = document.createAttribute('height');
        h.value = 500;
        canvas.setAttributeNode(w);
        canvas.setAttributeNode(h);
        console.log(canvas);
        ca_pa.appendChild(canvas);
        let ctx = canvas.getContext('2d');
        draw_environment_data(environment_data, ctx);
    } else if (option == "total") {
        while (ca_pa.firstChild) {
            ca_pa.removeChild(ca_pa.firstChild);
        }
        let canvas = document.createElement('canvas');
        let w = document.createAttribute('width');
        w.value = 800;
        let h = document.createAttribute('height');
        h.value = 500;
        canvas.setAttributeNode(w);
        canvas.setAttributeNode(h);
        console.log(canvas);
        ca_pa.appendChild(canvas);
        let ctx = canvas.getContext('2d');
        draw_total_data(sustainabilityKPIAchieved,maxKPIAchievedValues,ctx);
    } else {
        while (ca_pa.firstChild) {
            ca_pa.removeChild(ca_pa.firstChild);
        }
        let canvas = document.createElement('canvas');
        let w = document.createAttribute('width');
        w.value = 800;
        let h = document.createAttribute('height');
        h.value = 500;
        canvas.setAttributeNode(w);
        canvas.setAttributeNode(h);
        console.log(canvas);
        ca_pa.appendChild(canvas);
        let ctx = canvas.getContext('2d');
        draw_social_data(social_data, ctx);
    }
});

function draw_economic_data(data, ctx) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["X1", "X2", "X3", "X4", "X5", "X6", "X7", "X8", "X9", "X10", "X11", "X12", "X13", "X14"],
            datasets: [{
                label: 'normalized KPI',
                data: data['normalizedKPIValuesAchieved'],
                backgroundColor: '#FFB74D',
                borderWidth: 1
            }, {
                label: 'max normalized KPI',
                data: data['maxNormalizedKPIValuesAchieved'],
                backgroundColor: '#00E676',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function draw_environment_data(data, ctx) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["X15", "X16", "X17", "X18", "X18", "X19", "X20", "X21", "X22", "X23", "X24", "X25"],
            datasets: [{
                label: 'normalized KPI',
                data: data['normalizedKPIValuesAchieved'],
                backgroundColor: '#26A69A',
                borderWidth: 1
            }, {
                label: 'max normalized KPI',
                data: data['maxNormalizedKPIValuesAchieved'],
                backgroundColor: '#00BCD4',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function draw_social_data(data, ctx) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["X26", "X27", "X28", "X29", "X30", "X31", "X32", "X33", "X34", "X35", "X36", "X37", "X38"],
            datasets: [{
                label: 'normalized KPI',
                data: data['normalizedKPIValuesAchieved'],
                backgroundColor: '#F06292',
                borderWidth: 1
            }, {
                label: 'max normalized KPI',
                data: data['maxNormalizedKPIValuesAchieved'],
                backgroundColor: '#3F51B5',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function draw_total_data(arr1, arr2, ctx) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["X1", "X2", "X3", "X4", "X5", "X6", "X7", "X8", "X9", "X10", "X11", "X12", "X13", "X14", "X15", "X16", "X17", "X18", "X18", "X19", "X20", "X21", "X22", "X23", "X24", "X25", "X26", "X27", "X28", "X29", "X30", "X31", "X32", "X33", "X34", "X35", "X36", "X37", "X38"],
            datasets: [{
                label: 'sustainability KPI Achieved',
                data: arr1,
                backgroundColor: '#F06292',
                borderWidth: 1
            }, {
                label: 'max KPI Achieved',
                data: arr2,
                backgroundColor: '#3F51B5',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}