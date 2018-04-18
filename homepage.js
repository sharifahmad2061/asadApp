mp_nxt = document.querySelector("#mp-nxt");
form1 = document.querySelector(".needs-validation");
mp_nxt.addEventListener("click", () => {
    if (form1.checkValidity() === false) {
        form1.classList.add('was-validated');
    }
});