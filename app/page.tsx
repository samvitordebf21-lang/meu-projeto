import Cabecalho from "./Componentes/Cabecalho"
import Cartao from "./Componentes/Cartao"
import {projetos} from "./Componentes/Dados"
import Secao from "./Componentes/Secao"
import Contato from "./Componentes/Contato"
import Tarefas from "./Componentes/Tarefas"
import Link from "next/link"
import GitHub from "./github/page"

export default function Home () {
   return (
    <main className="pagina-inicial">
      <nav className="navegacao" aria-label="Navegação principal">
        <Link href="/">Inicio</Link>
        <Link href="/projetos">Projetos</Link>
        <Link href="/contato">Contato</Link>
      </nav>

      <header className="apresentacao">
        <span className="etiqueta">Portfólio · 2026</span>
        <Cabecalho/>
        <p>Estudante de desenvolvimento web, criando projetos e aprendendo a cada etapa.</p>
      </header>

      <Secao titulo="Sobre mim">
        <p>Estou aprendendo e construindo projetos com tecnologias web.</p>
      </Secao>

      <Secao titulo="Meus projetos">
        <div className="grade-projetos">
          {projetos.map((p) => (
            <Cartao key={p.id} {...p}/>
          ))}
        </div>
      </Secao>

      <Secao titulo="Contato">
        <Contato/>
      </Secao>

      <Secao titulo="Tarefas">
        <Tarefas/>
      </Secao>

      <Secao titulo="GitHub">
        <GitHub/>
      </Secao>
    </main>
  );
}