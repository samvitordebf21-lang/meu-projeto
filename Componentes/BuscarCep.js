"use client";
import { useState } from "react";
import { consultarEndereco } from "@/services/buscaCep";

export default function BuscarCep() {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState(null);
  const [aviso, setAviso] = useState("");

  async function buscar(e) {
    e.preventDefault();
    try {
      setEndereco(await consultarEndereco(cep));
      setAviso("");
    } catch (erro) {
      setEndereco(null);
      setAviso(erro.message);
    }
  }

  return (
    <>
      <form onSubmit={buscar}>
        <input value={cep} onChange={(e) => setCep(e.target.value)} />
        <button type="submit">Buscar</button>
      </form>

      {aviso && <p style={{ color: "red" }}>{aviso}</p>}

      {endereco && (
        <div>
          {endereco.logradouro && <p>Rua: {endereco.logradouro}</p>}
          {endereco.bairro && <p>Bairro: {endereco.bairro}</p>}
          <p>Cidade: {endereco.localidade}/{endereco.uf}</p>
        </div>
      )}
    </>
  );
}