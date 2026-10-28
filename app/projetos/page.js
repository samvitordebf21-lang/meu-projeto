import Cartao from "../Componentes/Cartao"
import {projetos} from "../Componentes/Dados"

export default function Projetos() {
return (

     <main>
     <h1>Meus projetos</h1>
         <p>Tudo o que já construí.</p>
         {projetos.map((p)=> (
         <Cartao key={p.id} {...p}/>
      ))}
     </main>
 );

}