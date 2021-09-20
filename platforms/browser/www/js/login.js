function login(usuario, senha){

        var username = usuario ;
        var password = senha ;
        var ok = 0 ;  
                      
        localStorage.setItem('login_username', username);
        localStorage.setItem('login_password', password);

        $('#logar').hide();

      $.ajax({
        type: 'POST',
        timeout: 5000,
         url : server+ '/' + url_auth,
        cache: false,
        data: {
          'login'  : username,
          'password'  : password,
        },
        success:function(ret){
          //Se retornar um token valido de acesso
         
          if(ret.result.token){
            auth_check  = 1 ;
            $('#login_success').show();
             $('#login_error').hide();
              $('#logar').show();
              $('#progress').hide();
            
             //Armazenando o token
            localStorage.setItem('token',ret.result.token);
            //console.log(ret.token);
            setarOnesignal(username);
            setTimeout(direcionar, 1000, eco_home_page+'?token='+ret.result.token);
            

          }
          else{
             $('#login_error').show();
              $('#login_success').hide();
            $('#logar').show();
            $('#progress').hide();
            
            auth_check = -1 ;
          
          }
          //Se o login der certo, chama a funcao acoes novamente,
          //para carregar a lista de tarefas do usuarios, caso tenha dado falha antes
          //buscaAcoes();
        
        },
        error: function (e){
          $('#login_error').show();
           $('#login_success').hide();
          $('#logar').show();
          $('#progress').hide();
        },
        dataType:'json',
        async: true
    }); 

    return ;
}


function deslogar(){
        showModal('show');
        document.addEventListener('deviceready', function () {
          
          window.plugins.OneSignal.deleteTag("user");
        
        }, false);

        
        setTimeout(direcionar, 2000, './index.html');

        return false ;

    }



function direcionar(url){

  window.location.href = url ;
}