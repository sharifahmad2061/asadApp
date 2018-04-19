const path = require('path');
const fs = require('fs');

mp_nxt = document.querySelector("#mp-nxt");
form1 = document.querySelector(".needs-validation");

let data = {};

mp_nxt.addEventListener("click", () => {
    if (form1.checkValidity() === false) {
        form1.classList.add('was-validated');
        return;
    }
    else{
        data['name'] = document.querySelector("input[name=name]").value;
        data['designation'] = document.querySelector("input[name=designation]").value;
        data['industry'] = document.querySelector("input[name=industry]").value;
        data['address'] = document.querySelector("input[name=address]").value;
        data['contact'] = document.querySelector("input[name=contact]").value;
        data['capacity'] = document.querySelector("#cem-cap").value;
        // console.log(data);

        fs.writeFileSync(path.join(__dirname, 'data/user_data.json'),JSON.stringify(data,null,4));

        window.location.href = "economicInd.html";
    }
});