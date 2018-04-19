window.addEventListener("load", () => {
    var form1 = document.querySelector('.needs-validation');
    let btn_sbm = document.querySelector('#btn-sbm');
    // Loop over them and prevent submission
    btn_sbm.addEventListener('click', function (event) {
        if (form1.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        form1.classList.add('was-validated');
    }, false);
}, false);
