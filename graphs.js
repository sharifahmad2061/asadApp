// const path = require('path');
// const fs = require('fs');

// const economic_data = fs.readFileSync(path.join(__dirname,'data/economic.json'),'utf8');
// const environment_data = fs.readFileSync(path.join(__dirname,'data/environment.json'),'utf8');
// const social_data = fs.readFileSync(path.join(__dirname,'data/social.json'),'utf8');

let ra_btn_form = document.querySelector('#ra-btn-form');
let option;
ra_btn_form.addEventListener('change',()=>{
    option = document.querySelector("input[name=graph-type]:checked").value;
    
});

// var ctx = document.querySelector("#myChart").getContext('2d');
// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ["X1", "X2", "X3", "X4", "X5", "X6", "X7", "X8", "X9", "X10", "X11", "X12", "X13", "X14"],
//         datasets: [{
//             label: 'normalized KPI',
//             data: normalizedKPIValuesAchieved,
//             backgroundColor: 'rgba(153, 102, 255, 0.2)',
//             borderWidth: 1
//         }, {
//             label: 'max normalized KPI',
//             data: maxNormalizedKPIValuesAchieved,
//             backgroundColor:'rgba(75, 192, 192, 0.2)',
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// });