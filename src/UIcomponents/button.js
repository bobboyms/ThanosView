import React from "react";

const Button = ({componente, processaDadosNoServidor}) => {
    return(
      <div className="form-group col-sm-4">
        <button type="button" className="btn btn-primary" onClick={() => {
          processaDadosNoServidor(componente.evento)
        }}>{componente.label}</button>
      </div>)
  }

export default Button;
