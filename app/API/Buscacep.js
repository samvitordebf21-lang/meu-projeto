"use client";

import { useState } from "react";
export default function BuscaCep() {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState(null);

  async function buscar(e) {
        e.preventDefault();
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        setEndereco(await res.json());
  }

  return (
    <>
      <form onSubmit={buscar}>
            <input value={cep} onChange={(e) => setCep(e.target.value)} />
            <button type="submit">Buscar</button>
      </form>
           {endereco && !endereco.erro && (
  <div>
    {endereco.logradouro && <p>Rua: {endereco.logradouro}</p>}
    {endereco.bairro && <p>Bairro: {endereco.bairro}</p>}
    <p>Cidade: {endereco.localidade}/{endereco.uf}</p>
  </div>
)}
    </>
  );
}
