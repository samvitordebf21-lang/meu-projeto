"use client";
import { useState } from "react";

export default function Cartao({titulo, descricao, tecnologias}) {
     const [curtidas, setCurtidas] = useState(0);
     const [aberto, setAberto] = useState(false);
     return(
      <div className="cartao">
         <h2><strong>{titulo}</strong></h2>
         <button onClick={()=> setAberto(!aberto)}>
            {aberto ? "Esconder" : "Ver detalhes"}
         </button>
         { aberto && <p>{descricao}</p>}

         <p>Tecnologias: {tecnologias}</p>

         <button onClick={()=> setCurtidas(curtidas + 1)}>
         {curtidas} curtidas
         </button>

      </div>
     
    
   );
}