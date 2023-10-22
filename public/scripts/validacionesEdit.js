window.addEventListener("load", () =>{

    let formulario = document.querySelector('form');
    formulario.addEventListener('submit', function(evento){
        evento.preventDefault();

        let nombreLibro = document.getElementById('name');
          
        let error1 = document.getElementById('error1')
        let error2 = document.getElementById('error2')
        let error3 = document.getElementById('error3')
        let error4 = document.getElementById('error4')
        let error5 = document.getElementById('error5')

        if(nombreLibro.value == ""){
            error1.innerText = 'campo vacio';
        }else if (typeof(nombreLibro.value) !== "string"){
            error1.innerHTML = '<p> el tipo de dato ingresado no corresponde con los datos solicitados </p>';
        }

        let precioLibro = document.getElementById('price');
        if(precioLibro.value == ""){
            error2.innerText ='campo vacio';
        }

        let descuentoLibro = document.getElementById('discount');
        if(descuentoLibro.value == ""){
            error3.innerText ='campo vacio';            
        }

        let generoLibro = document.getElementById('category');
        if(generoLibro.value == ""){
            error4.innerText ='seleccione un género';
        }

        let descripcionLibro = document.getElementById('description');
        if(descripcionLibro.value == ""){
            error5.innerText ='campo vacio';
        }else if (typeof(nombreLibro.value) !== "string"){
            error5.innerHTML = '<p> el tipo de dato ingresado no corresponde con los datos solicitados </p>';
        } 
    })

})
