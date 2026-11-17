import { buscarCep } from "@/lib/viacep";

export async function consultarEndereco(cepDigitado) {
  const cep = cepDigitado.replace(/\D/g, ""); 

  if (cep.length !== 8) throw new Error("O CEP precisa ter 8 números.");

  const dados = await buscarCep(cep);
  if (dados.erro) throw new Error("CEP não existe");

  return dados;
}