//4th column is maxKPIAchievedValues
//obtain all maxKPI values for the three json files and then calculate 5th column for overall normalized values.
//then I need the second column which is obtained from the combinedKPI file

const path = require('path');
const fs = require('fs');

const economic_data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/economic.json'), 'utf8'));
const environment_data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/environmental.json'), 'utf8'));
const social_data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/social.json'), 'utf8'));

