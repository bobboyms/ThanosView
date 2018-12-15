import React from "react";

const Radio = ({componente, atualizaValorCampoRadio}) => {
    return(
      <div className="form-group col-sm-4">
        <label >{componente.label}</label>
        {componente.options.map((valor, index)=> {
              return(
                    <div key={valor.id.toString()} className="form-check">
                      <input className="form-check-input" type="radio" name="exampleRadios" id={valor.id} value={valor.id} 
                        onClick={() => {
                          atualizaValorCampoRadio(componente,valor)
                      }}/>
                      <label className="form-check-label" htmlFor="exampleRadios1">
                        {valor.valor}
                      </label>
                    </div>
              );
        })}
            
      </div>
    )
  }

export default Radio;
