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
        data['name'] = document.querySelector(".form-group>input[name=name]").value;
        data['designation'] = document.querySelector(".form-group>input[name=designation]").value;
        data['industry'] = document.querySelector(".form-group>input[name=industry]").value;
        data['address'] = document.querySelector(".form-group>input[name=address]").value;
        data['contact'] = document.querySelector(".form-group>input[name=contact]").value;
        data['capacity'] = document.querySelector("#cem-cap").value;
        // console.log(data);

        fs.writeFileSync(path.join(__dirname, 'data/user_data.json'),JSON.stringify(data,null,4));

        window.location.href = "economicInd.html";
    }
});