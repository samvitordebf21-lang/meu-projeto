import { projetos } from "../../Componentes/Dados";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return projetos.map((p) => ({ id: String(p.id) }));
}

export default async function Projeto({ params }) {
  const { id } = await params;
  const projeto = projetos.find((p) => p.id === Number(id));

  if (!projeto) notFound();

  return (
    <main>
      <h1>{projeto.titulo}</h1>
    </main>
  );
}