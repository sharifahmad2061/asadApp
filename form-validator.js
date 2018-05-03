window.addEventListener("load", () => {
    var form1 = document.querySelectorAll('.needs-validation');
    let btn_sbm = document.querySelector('#btn-sbm');
    // Loop over them and prevent submission
    btn_sbm.addEventListener('click', function (event) {
        form1.forEach(element => {
            if (element.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            element.classList.add('was-validated');
        });
    }, false);
}, false);
