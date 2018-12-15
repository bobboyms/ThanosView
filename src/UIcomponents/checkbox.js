import React from "react";

const Checkbox = ({componente, atualizaValorCheckbox}) => {
    return(
      <div className="form-group col-sm-4">
        <label >{componente.label}</label>
        {componente.options.map((valor, index)=> {
              return(
                    <div key={valor.id.toString()} className="form-check">
                      <input className="form-check-input" type="checkbox" id={valor.id} value={valor.id} 
                        onClick={() => {
                          atualizaValorCheckbox(componente, valor)
                      }}/>
                      <label className="form-check-label">
                        {valor.valor}
                      </label>
                    </div>
              );
        })}
            
      </div>
    )
}

export default Checkbox;