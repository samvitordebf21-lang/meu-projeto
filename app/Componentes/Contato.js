"use client";
import { useState } from "react";

export default function Contato() {
  const [nome, setNome] = useState("");
  const [aviso, setAviso] = useState("");

  async function enviar(e) {
    e.preventDefault();

    if (nome.trim().length < 3) {
      setAviso("Digite seu nome completo.");
      return;
    }

    try {
      
      const res = await fetch("/API/contato", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome }),
      });

      
      if (!res.ok) {
        const { erro } = await res.json();
        setAviso(erro);
        return;
      }

      
      setAviso(`Obrigado, ${nome}!`);
      setNome("");
    } catch {
      
      setAviso("Não foi possível enviar. Tente de novo.");
    }
  }

  return (
    <>
      <form onSubmit={enviar}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome completo"
        />
        <button type="submit">Enviar</button>
      </form>

      <p>{aviso}</p>
    </>
  );
}