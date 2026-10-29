"use client";
import { useState } from "react";

export default function Contato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [aviso, setAviso] = useState("");

  function enviar(e) {
    e.preventDefault();

    if (nome.trim().length < 3) {
      setAviso("Digite seu nome completo.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setAviso("Digite um e-mail válido.");
      return;
    }

    const apenasNumeros = telefone.replace(/\D/g, "");
    if (apenasNumeros.length < 10 || apenasNumeros.length > 11) {
      setAviso("Digite um telefone válido com DDD.");
      return;
    }

    setAviso(`Obrigado, ${nome}!`);
    setNome("");
    setEmail("");
    setTelefone("");
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

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu e-mail"
        />

        <input
          type="tel"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          placeholder="Seu telefone com DDD"
        />

        <button type="submit">Enviar</button>
      </form>

      <p>{aviso}</p>
    </>
  );
}