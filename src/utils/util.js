export class FormUpdate {

    constructor(this_) {
        this.this_ = this_;
    }

    atualizaValorCampoInput = (campo, valor) => {

        let novoCampo = campo;
    
        novoCampo["valor"] = valor;
        this.this_.setState({ novoCampo })
    
        //console.log({ ...this.state, campo })
    
      }
    
    atualizaValorCheckbox = (campo, filho) => {
        
        let novoCampo = campo;
        let selecionados = []
        campo.options.map((valor)=>{
              let check = document.getElementById(valor.id);
              if (check.checked == true) {
                 selecionados.push({id:valor.id, valor:valor.valor})
              }
        });
        novoCampo["valores"] = selecionados;
        this.this_.setState({novoCampo})
        console.log(novoCampo)
    }
    
    atualizaValorCampoRadio = (campo,filho) => {
        let novoCampo = campo;
    
        let index = document.getElementById(filho.id).value;
        let valor = filho.valor;
    
        novoCampo["index"] = index;
        novoCampo["valor"] = valor;
    
        this.this_.setState({novoCampo})
        console.log(novoCampo)
    }
    
    atualizaValorCampoSelect = (campo) => {
    
        let novoCampo = campo;
    
        let x = document.getElementById(novoCampo.id).selectedIndex;
        let y = document.getElementById(novoCampo.id).options;
        //alert("Index: " + y[x].index + " is " + y[x].value);
    
        novoCampo["index"] = y[x].index;
        novoCampo["valor"] = y[x].value;
        novoCampo["idDetail"] = y[x].id;
    
        this.this_.setState({novoCampo})
        console.log(JSON.stringify(novoCampo))
    
    }

    atualizaDomComponentes() {
        this.this_.state.formulario.map((valor)=>{
    
          if (valor.tipo === "radio") {
            let radio = document.getElementById(valor.index);
            radio.checked = true
          } else if (valor.tipo === "checkbox") {
              valor.valores.map((valor) => {
              let check = document.getElementById(valor.id);
              check.checked = true
            });
          } else if (valor.tipo === "select") {
            document.getElementById(valor.id).selectedIndex = valor.index;
          }
        });
      }

}