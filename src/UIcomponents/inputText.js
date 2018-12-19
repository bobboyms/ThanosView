import React from "react";

const NativeInputText = ({componente, atualizaValorCampoInput}) => {
    return(
      <div className="form-group col-sm-4">
        <label >{componente.label}</label>
        <input type={componente.tipo} placeholder={componente.placeholder} value={componente.valor} className="form-control form-control-lg" id={componente.id} onChange={(e) => {
            atualizaValorCampoInput(componente,e.target.value)
      }} />
      </div>
    )
}

export default NativeInputText;