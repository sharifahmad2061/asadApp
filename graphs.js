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

let option = 'economic';
let option2 = 'bar';

gr_btn_from.addEventListener('change', () => {
    // console.log("graph shape changed");
    option2 = document.querySelector('input[name=graph-shape]:checked').value;
    draw_graph(option,option2);
});

ra_btn_form.addEventListener('change', () => {
    // console.log("graph type changed");
    option = document.querySelector("input[name=graph-type]:checked").value;
    draw_graph(option,option2);
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
            draw_total_data(sustainabilityKPIAchieved,maxKPIAchievedValues, ctx);
            break;
        default:
            break;
    }
}

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
function draw_economic_data_as_pie(data, ctx) {
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["X1", "X2", "X3", "X4", "X5", "X6", "X7", "X8", "X9", "X10", "X11", "X12", "X13", "X14"],
            datasets: [{
                label: 'normalized KPI',
                data: data['normalizedKPIValuesAchieved'],
                backgroundColor: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D', '#80B300', '#809900', '#E6B3B3', '#6680B3']
            }, {
                label: 'max normalized KPI',
                data: data['maxNormalizedKPIValuesAchieved'],
                backgroundColor: ['#66991A', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC', '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', '#66664D', '#991AFF', '#E666FF'],
            }]
        }
    });
}


function draw_environment_data(data, ctx) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["X15", "X16", "X17", "X18", "X19", "X20", "X21", "X22", "X23", "X24", "X25"],
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

function draw_environment_data_as_pie(data, ctx) {
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["X15", "X16", "X17", "X18", "X19", "X20", "X21", "X22", "X23", "X24", "X25"],
            datasets: [{
                label: 'normalized KPI',
                data: data['normalizedKPIValuesAchieved'],
                backgroundColor: ["#4DB3FF", "#1AB399", "#E666B3", "#33991A", "#CC9999", "#B3B31A", "#00E680", "#4D8066", "#809980", "#E6FF80", "#1AFF33"]
            }, {
                label: 'max normalized KPI',
                data: data['maxNormalizedKPIValuesAchieved'],
                backgroundColor: ["#999933", "#FF3380", "#CCCC00", "#66E64D", "#4D80CC", "#9900B3", "#E64D66", "#4DB380", "#FF4D4D", "#99E6E6", "#6666FF"]
            }]
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

function draw_social_data_as_pie(data, ctx) {
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["X26", "X27", "X28", "X29", "X30", "X31", "X32", "X33", "X34", "X35", "X36", "X37", "X38"],
            datasets: [{
                label: 'normalized KPI',
                data: data['normalizedKPIValuesAchieved'],
                backgroundColor: ["#4DB3FF", "#1AB399", "#E666B3", "#33991A", "#CC9999", "#B3B31A", "#00E680", "#4D8066", "#809980", "#E6FF80", "#1AFF33", "#809980", "#E6FF80", "#1AFF33"],
            }, {
                label: 'max normalized KPI',
                data: data['maxNormalizedKPIValuesAchieved'],
                backgroundColor: ["#999933", "#FF3380", "#CCCC00", "#66E64D", "#4D80CC", "#9900B3", "#E64D66", "#4DB380", "#FF4D4D", "#99E6E6", "#6666FF", "#FF4D4D", "#99E6E6", "#6666FF"],
            }]
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
                backgroundColor: '#3F51B5',
                borderWidth: 1
            }, {
                label: 'max KPI Achieved',
                data: arr2,
                backgroundColor: '#2196F3',
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

draw_graph(option,option2);
// ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D', '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC', '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399', '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933', '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF']