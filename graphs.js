const path = require('path');
const fs = require('fs');

const economic_data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/economic.json'), 'utf8'));
const environment_data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/environmental.json'), 'utf8'));
const social_data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/social.json'), 'utf8'));

let ctx = document.querySelector("#myChart").getContext('2d');
let chart;

let ra_btn_form = document.querySelector('#ra-btn-form');
let option;
ra_btn_form.addEventListener('change', () => {
    option = document.querySelector("input[name=graph-type]:checked").value;
    if (option == "economic") {
        draw_economic_data(economic_data,ctx);
    } else if (option == "environmental") {
        draw_environment_data(environment_data,ctx);
    } else {
        draw_social_data(social_data,ctx);
    }
});

function draw_economic_data(data, ctx, chart) {
    if(chart){
        chart.destroy();
    }
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["X1", "X2", "X3", "X4", "X5", "X6", "X7", "X8", "X9", "X10", "X11", "X12", "X13", "X14"],
            datasets: [{
                label: 'normalized KPI',
                data: data['normalizedKPIValuesAchieved'],
                backgroundColor: 'rgba(153, 102, 255, 0.8)',
                borderWidth: 1
            }, {
                label: 'max normalized KPI',
                data: data['maxNormalizedKPIValuesAchieved'],
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
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

function draw_environment_data(data, ctx, chart) {
    if(chart){
        chart.destroy();
    }
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["X15", "X16", "X17", "X18", "X18", "X19", "X20", "X21", "X22", "X23", "X24", "X25"],
            datasets: [{
                label: 'normalized KPI',
                data: data['normalizedKPIValuesAchieved'],
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderWidth: 1
            }, {
                label: 'max normalized KPI',
                data: data['maxNormalizedKPIValuesAchieved'],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
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

function draw_social_data(data, ctx, chart) {
    if(chart){
        chart.destroy();
    }
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["X26", "X27", "X28", "X29", "X30", "X31", "X32", "X33", "X34", "X35", "X36", "X37", "X38"],
            datasets: [{
                label: 'normalized KPI',
                data: data['normalizedKPIValuesAchieved'],
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderWidth: 1
            }, {
                label: 'max normalized KPI',
                data: data['maxNormalizedKPIValuesAchieved'],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
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