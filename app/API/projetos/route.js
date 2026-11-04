import { projetos } from "../../Componentes/Dados";
export async function GET() {
return Response.json(projetos);
}