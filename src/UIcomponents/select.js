import React from "react";

const Select = ({componente, atualizaValorCampoSelect}) => {

    return(
      <div className="form-group col-sm-4">
        <label htmlFor="exampleFormControlSelect1">{componente.label}</label>
        <select className="form-control form-control-lg" id={componente.id} onChange={
          () => {
             atualizaValorCampoSelect(componente)
          }
        }>
          {componente.options.map((valor, index)=> {
            return(
                  <option key={valor.id} value={valor.texto} id={valor.id}>
                    {valor.valor}
                  </option>);
          })}
  
        </select>
      </div>
    );

}

export default Select;
