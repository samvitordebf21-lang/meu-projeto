export async function buscarCep(cep) {
  const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  if (!res.ok) throw new Error("CEP inválido");
  return res.json();
}