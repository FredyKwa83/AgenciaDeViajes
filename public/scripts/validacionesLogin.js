window.addEventListener("load", () =>{

  let formulario = document.querySelector('form');
  formulario.addEventListener('submit', function(evento){
      evento.preventDefault();

      let userName = document.getElementById('user');
      let password = document.getElementById('password');
        
      let error1 = document.getElementById('error1')
      let error2 = document.getElementById('error2')

      if(userName.value == ""){
          error1.innerText = 'campo vacio';
      }
      if(password.value == ""){
          error2.innerText ='campo vacio';
      }
      formulario.submit()
  })

})
