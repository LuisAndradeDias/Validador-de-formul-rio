class ValidaFormulario{
  constructor(){
    this.formulario = document.querySelector('.formulario');
    this.eventos();
  }

  eventos() {
    this.formulario.addEventListener('submit', e => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const camposValidos = this.camposSaoValidos();
    const senhasValidas = this.senhasSaoValidas();
    if (camposValidos && senhasValidas) {
      alert('Formulário sendo enviado..')
    }
  }
  
  camposSaoValidos(){
    let valid = true;

    for(let errorText of this.formulario.querySelectorAll('.error-text')) {
      errorText.remove();
    }

    for(let campo of this.formulario.querySelectorAll('.validar')) {
      const label = campo.previousElementSibling.innerText;
      campo.style.color = 'green';

      if(!campo.value){
        this.criaErro(campo, `O campo "${label}" não pode estar vazio`)
        campo.style.color = 'red';
        valid = false
      }

      if(campo.classList.contains('cpf')) {
        if(!this.validaCPF(campo)){ 
          valid = false;
          campo.style.color = 'red';
        }
      }

      if(campo.classList.contains('usuario')) {
        if(!this.validaUsuario(campo)){ 
          valid = false;
          campo.style.color = 'red';
        }
      }
    }
    return valid
  }
  senhasSaoValidas(){
    let valid = true;
    const senha = this.formulario.querySelector('.senha');
    const repetirSenha = this.formulario.querySelector('.repetir-senha');

    if(senha.value !== repetirSenha.value){
      valid = false;
      this.criaErro(senha, 'o Campo "Senha" e "Repetir senha" precisam ser iguais');
      this.criaErro(repetirSenha, 'o Campo "Senha" e "Repetir senha" precisam ser iguais');
      senha.style.color = 'red';
      repetirSenha.style.color = 'red';
    }
    if(senha.value.length < 6 || senha.value.length > 12) {
      valid = false;
      this.criaErro(senha, 'Senha precisa estar entre 6 e 12 caracteres.');
      senha.style.color = 'red';
      repetirSenha.style.color = 'red';
    }

    return valid;
  }
  validaUsuario(campo){
    const usuario = campo.value;
    let valid = true

    if (usuario.length < 3 || usuario.length > 12){
      this.criaErro(campo, 'Nome de usuário precisar ter entre 3 e 12 caracteres.');
      valid = false;
    }
    if(!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.criaErro(campo, 'Nome de usuário precisar conter apenas letras e/ou números.');
      valid = false;
    }
    return valid
  }
  validaCPF(campo) {
    const cpf = new ValidaCPF(campo.value);

    if(!cpf.valida()) {
      this.criaErro(campo, 'CPF inválido.');
      return false;
    }
    return true;
  }

  criaErro(campo, msg){
    let div = document.createElement('div');
    div.innerText = msg;
    div.classList.add('error-text');
    campo.insertAdjacentElement('afterend', div);
  }

}
const valida = new ValidaFormulario();