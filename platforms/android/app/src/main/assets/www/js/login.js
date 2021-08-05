function login(usuario, senha){

        var username = usuario ;
        var password = senha ;
        var ok = 0 ;  
                      
        localStorage.setItem('login_username', username);
        localStorage.setItem('login_password', password);

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
            ons.notification.toast('Login efetuado com sucesso.', {timeout: 1000});
             //Armazenando o token
            localStorage.setItem('token',ret.result.token);
            //console.log(ret.token);
            setTimeout(direcionar, 1000, eco_home_page+'?token='+ret.result.token);

          }
          else{
            ons.notification.toast('Erro ao fazer login.', {timeout: 2000});
            $('#button').show();
            $('#progress').hide();
            
            auth_check = -1 ;
          
          }
          //Se o login der certo, chama a funcao acoes novamente,
          //para carregar a lista de tarefas do usuarios, caso tenha dado falha antes
          //buscaAcoes();
        
        },
        error: function (e){
          ons.notification.toast('Erro ao conectar.', {timeout: 2000});
          $('#button').show();
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