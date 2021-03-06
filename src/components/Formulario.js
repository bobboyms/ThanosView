import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';

import Select from '../UIcomponents/select'
import Checkbox from '../UIcomponents/checkbox'
import Radio from '../UIcomponents/radio'
import NativeInputText from '../UIcomponents/inputText'
import Button from '../UIcomponents/button'
import { FormUpdate } from "../utils/util";
import { CarService } from "../service/CarService";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext';
import { FormService } from "../service/FormServices";


class Formulario extends React.Component {

  constructor(props) {
    
    super(props)

    this.formService = new FormService();

    this.carservice = new CarService()

    this.formUpdate = new FormUpdate(this)

    this.state = {

      alertas:[],
      formulario : {

            id_formulario:"1234212334",
            
            evento_atual:"",

            componentes: [
                          {tipo:"text", type:"str", id:1, valor:"", placeholder:"Aqui voce vai digitar seu nome", label: "Digite seu nome",
                          func: eval("(valor)=> {if (valor.trim().length == 0) {return false;}return true;}"),
                          msgErro:"Campo nome nao pode ser vazio"},
                  
                          {tipo:"text", type:"str", id:2, valor:"kalho doido", placeholder:"", label: "Digite seu email",
                          func: (valor)=> {
                  
                            if (valor.trim().length == 0) {
                              return false;
                            }
                  
                          return true;
                  
                          }, msgErro:"Campo email nao pode ser vazio"},
                          {tipo:"password",type:"str", id:3, valor:"", placeholder:"", label: "Digite sua senha"},
                          {tipo:"select",id:4, label:"Selecione alguma coisa", index:"2", idDetail:"opt3", valor:"03", 
                                        options:[
                                                {valor:"01", id:"opt1"},
                                                {valor:"02", id:"opt2"}, 
                                                {valor:"03", id:"opt3"}]
                          },
                          {tipo:"text",type:"str", id:5, valor:"", placeholder:"", label: "Digite seu telefone"},
                          {tipo:"text",type:"str", id:6, valor:"", placeholder:"", label: "Digite seu sobre nome"},
                          
                          {tipo:"radio", id:7, valor:"", index:"rd3", idDetail:"rd3", label: "Selecione RADIO", 
                                        options:[
                                                {valor:"abacaxi", id:"rd1"},
                                                {valor:"abobora", id:"rd2"}, 
                                                {valor:"cebola", id:"rd3"}]
                        },
                        {tipo:"checkbox", id:8, valores:[{valor:"morango", id:"ch1"},{valor:"abacaxi", id:"ch3"}],label: "Selecione Checkbox", 
                                        options:[
                                                {valor:"morango", id:"ch1"},
                                                {valor:"banana", id:"ch2"}, 
                                                {valor:"abacaxi", id:"ch3"}]
                        },
                        
                        
                        {tipo:"dataTable", id:9,
                              items: [], 
                              loading: true,
                              first: 0,
                              rows: 10,
                              totalRecords: 0,
                        },

                        {tipo:"button", id:10, evento:"eventoSoma", label: "Digite sua senha"}
            ]

      }       
   }


  }



  validaAntesDeSalvar() {

    const { formulario } = this.state;

    let alertas = [];

    formulario.map((valor)=>{

      if (valor.func != undefined) {
        console.log(valor.func)
        let validou = valor.func(valor.valor);

        if (validou == false) {
           document.getElementById(valor.id).style = "border-color: red";
           console.log(valor.msgErro);
           alertas.push(valor.msgErro)
        } else {
           document.getElementById(valor.id).style = "border-color: none";
        }
        
      }

    });

    this.setState({alertas})

  }

  resetaFormulario() {
    
    const { componentes } = this.state.formulario;

    componentes.map((valor) => {
      
      if (valor.tipo === "text" || valor.tipo === "password") {
          let valorNovo = valor;
          valorNovo.valor = ""
          this.setState({valorNovo})
          document.getElementById(valor.id).style = "border-color: none";
      } else if (valor.tipo === "radio") {
          let novoValor = valor;  
          novoValor.index = null;
          novoValor.valor = ""
          this.setState({novoValor})

          valor.options.map((valor) => {
              document.getElementById(valor.id).checked = false
          })
          //console.log(novoValor)
      } else if (valor.tipo === "checkbox") {
          let novoValor = valor;  
          novoValor.valores = [];
          this.setState({novoValor})

          valor.options.map((valor) => {
              document.getElementById(valor.id).checked = false
          })
      } else if (valor.tipo === "select") {
          document.getElementById(valor.id).selectedIndex = 0;
      }
    });

    let alertas = []
    this.setState({alertas})
  }

  componentDidMount = () => {
      //this.carservice.getCarsLarge().then(data => this.setState({cars: data}));
    this.formUpdate.atualizaDomComponentes();

    const { componentes } = this.state.formulario;

    componentes.map((componente)=> {

      if (componente.tipo == "dataTable") {
        this.iniciaValoresDataTable(componente)
      }

    });

  }

  iniciaValoresDataTable = (componente) => {
    
    console.log("aki")
/** *
    this.formService.procesaDadosDataTable(componente).then(data => {
        
          componente.datasource = data;

          componente["totalRecords"] = data.length,
          componente["items"] = componente.datasource.slice(0, componente.rows),
          componente["loading"] = false

          this.setState({componente});
      });
      **/

  }

  onPage = (event, componente) => {

      componente["loading"] = true;  
      this.setState({
        componente
      });

      // delay of a backend call
      const startIndex = event.first;
      //const endIndex = event.first + componente.rows;
      
      //console.log(startIndex)
      //console.log(endIndex)

      componente["first"] = startIndex,
      //componente["items"] = componente.datasource.slice(startIndex, endIndex),
      //componente["loading"] = false

      this.setState({
          componente
      });

      this.processaDadosNoServidor("eventoSubtrai")

      componente["loading"] = false;  
      this.setState({
        componente
      });
  }

  

  atualizaValorCampoInput = (campo, valor) => {
      this.formUpdate.atualizaValorCampoInput(campo,valor);
  }

  atualizaValorCheckbox = (campo, filho) => {
      this.formUpdate.atualizaValorCheckbox(campo,filho);
  }

  atualizaValorCampoRadio = (campo,filho) => {
      this.formUpdate.atualizaValorCampoRadio(campo,filho);
  }

  atualizaValorCampoSelect = (campo) => {
      this.formUpdate.atualizaValorCampoSelect(campo)
  }

  selectionChange = (dado) => {
      console.log(dado)
  }

  processaDadosNoServidor = (nome) => {

      this.formService.processaDadosNoServidor(this,nome);
  }

  // - - - -- - - - - -- - - - -- - - - -- - -- -

  // onLazyLoad = (event) => {
  //   console.log("On Lazy load event", event);
  //       let self = this;
  //       this.setState({ loading: true });
  //       this.carservice.getCarsLazy(event)
  //           .then(function (resItems) {
  //               console.log("Headers", resItems.headers);
  //               //get total record count from response header
  //               var totalRecords = resItems.headers['x-result-count'];
  //               //load items into local array
  //               self.setState({ totalRecords: Number(totalRecords), loading: false, items: resItems.data });
  //           }).catch(function (error) {
  //               console.log(error);
  //           });

  // }

  onModelFilterChange = (event) => {
      console.log(event.target.value);
      console.log(event.target.name);

        // if (this.state.filterTimerId) {
        //     clearTimeout(this.state.filterTimerId);
        // }
        // let context = this;
        // let filterValue = event.target.value;
        // var filterTimerId = setTimeout(() => {
        //     //following line sets defined filter and triggers onLazyLoad function
        //     context.dt.filter(filterValue, 'model', 'contains');
        //     context.setState({ filterTimerId: null });
        // }, 1000);
        // this.setState({ filterTimerId: filterTimerId });
  }

  // colorColumnTemplate(rowData, column) {
  //     //car color column template goes here
  // }

  // - - - - -- - - -- - - - -- -- - - - -- - - -

  renderizaComponente() {
    
    const { componentes } = this.state.formulario;

    if (componentes != undefined || componentes != null) {
      let arComponentes = componentes.map((valor, index)=>{
                    
        if (valor.tipo === "text") {
          return(<NativeInputText key={index} 
            atualizaValorCampoInput={this.atualizaValorCampoInput}
            componente={valor} />);
        } else if (valor.tipo === "select") {
          return (<Select key={index}
            atualizaValorCampoSelect={this.atualizaValorCampoSelect}
            componente={valor}/>);
        } else if (valor.tipo === "password") {
          return(<NativeInputText key={index} 
            atualizaValorCampoInput={this.atualizaValorCampoInput}
            componente={valor} />);
        } else if (valor.tipo === "radio") {
          return(<Radio key={index}
            atualizaValorCampoRadio={this.atualizaValorCampoRadio}
            componente={valor} />);
        } else if (valor.tipo === "checkbox") {
          return(<Checkbox key={index}
            atualizaValorCheckbox={this.atualizaValorCheckbox}
            componente={valor} />);
        } else if (valor.tipo === "button") {
          return (<Button key={index} 
            componente={valor}
            processaDadosNoServidor={this.processaDadosNoServidor} />)
        } else if (valor.tipo === "dataTable") {
          return(
            <TableData key={index}
              componente={valor}
              onPage={this.onPage}
              onModelFilterChange={this.onModelFilterChange} 
            />
          );
        }
        
      })
  
      return(arComponentes);

    } else {
      return (<h1>NENHUM FOMULÁRIO</h1>)
    }
    
  }

  render() {

    const { alertas } = this.state;

      return(
        <div className="card card-w-title">
            <h1><b>FORMULARIO TESTE - {this.state.formulario.id_formulario}</b></h1>
            <div className="row">
                {alertas.map((valor, index)=>{
                  return(
                    <div key={index} className="alert alert-danger alert-fixed col-sm-12" role="alert" id="#myModal">
                        {valor} 
                    </div>
                  );
                })}
                {this.renderizaComponente()}
              </div>
           <h1>{this.state.texto}</h1>
          
          <button className="btn btn-success" onClick={() => {
            console.log(this.state)
          }}>
            VER FORMULARIO
          </button>

          <br />

          <button className="btn btn-success" onClick={() => {
            this.validaAntesDeSalvar();
          }}>
            VALIDAR ANTES DE SALVAR
          </button>

          <button className="btn btn-success" onClick={() => {
            this.resetaFormulario();
          }}>
            RESETA FORMULARIO
          </button>

          <button className="btn btn-success" onClick={() => {
            //this.setState(JSON.parse('{"formulario":[{"id":"01","tipo":"text","valor":"","placeholder":"","label":"Digite seu nome"},{"id":"02","tipo":"text","valor":"","placeholder":"","label":"Digite seu telefone"}]}'))
            
            axios.get(`http://127.0.0.1:5000/main/obter_formulario`)
                .then(res => {
                const formulario = res.data;

                console.log(formulario)

                this.setState(formulario);
            })
          
          }}>
            CONSTRUIR
          </button>

          <button className="btn btn-success" onClick={() => {
            //this.setState(JSON.parse('{"formulario":[{"id":"01","tipo":"text","valor":"","placeholder":"","label":"Digite seu nome"},{"id":"02","tipo":"text","valor":"","placeholder":"","label":"Digite seu telefone"}]}'))
            
            //const { formulario } = this.state;            
          
          }}>
            ENVIAR PARA O SERVIDOR
          </button>



        </div>
      )
  }
}


const TableData = ({componente, iniciaValores, onPage, onModelFilterChange }) => {

                  let modelFilter = <InputText name="modelo" style={{ width: '100%' }} className="ui-column-filter"
                                               onChange={onModelFilterChange} />
                  let table = 
                              <div className="form-group col-sm-12">
                                  <DataTable value={componente.items} paginator={true} rows={componente.rows} totalRecords={componente.totalRecords}
                                        lazy={true} first={componente.first} onPage={(e) =>{
                                          onPage(e, componente);
                                        }} loading={componente.loading}>
                                        <Column field="id" header="id" />
                                        <Column field="vin" header="Vin" />
                                        <Column field="year" header="Year" />
                                        <Column field="brand" header="Brand" 
                                                filter={true} filterElement={modelFilter} filterMatchMode="contains" />
                                        <Column field="color" header="Color" />
                                    </DataTable>
                              </div>  
  return(table)

    
}

export default Formulario;