import axios from 'axios';

const processaDadosNoServidor = (this_, nome) => {

    this_.state.formulario.evento_atual = nome;
    
    const formulario = {
      formulario: this_.state.formulario
    }

    axios.post(`http://127.0.0.1:5000/main/enviar_formulario`, formulario)
        .then(res => {
          const formulario = res.data;
          console.log(formulario)
          this_.setState(formulario);        
    })
  }

  export default processaDadosNoServidor;