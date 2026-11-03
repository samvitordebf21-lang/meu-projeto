async function buscarCep(cep) {
  try {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!res.ok) throw new Error("CEP inválido");
    const dados = await res.json();
    if (dados.erro) throw new Error("CEP não existe");
    return dados;
  } catch (erro) {
    alert(erro.message);
  }
}