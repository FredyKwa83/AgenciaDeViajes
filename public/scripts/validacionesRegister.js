window.addEventListener("load", () =>{

    let formulario = document.querySelector('form');
    formulario.addEventListener('submit', function(evento){
        evento.preventDefault();

        let nombreLibro = document.getElementById('name');
          
        let error1 = document.getElementById('error1') 

        if(nombreLibro.value === ""){
            error1.innerText = 'campo vacio';
        }else if (typeof(nombreLibro.value) !== "string"){
            error1.innerHTML = '<p> el tipo de dato ingresado no corresponde con los datos solicitados </p>';
        }

        formulario.submit()
    })

})


