"use client";
import { useState } from "react";
import { criarContato, listarContatos, alternarContato, removerContato, ouvirContatos} from "@/services/contato";
import { useEffect} from "react";


export default function Contato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [aviso, setAviso] = useState("");
  const [contatos, setContatos] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    try {
      return ouvirContatos(setContatos, (err) => {
        if (err) {
          console.error("Erro ao ouvir contatos:", err);
          setErro("Não foi possível carregar os contatos.");
        }
      });
    } catch (err) {
      console.error("Erro ao ouvir contatos:", err);
      setErro("Não foi possível carregar os contatos.");
    }
  }, []);

async function adicionar(e) {
  e.preventDefault();
  if (!nome.trim()|| !email.trim() || !telefone.trim()) {
    setAviso("todos os campos são obrigatórios. ");
    return;
  }

  try {
    setErro("");
    await criarContato(nome.trim(), email.trim(), telefone.trim());
    setNome("");
    setEmail("");
    setTelefone("");
  } catch (err) {
    console.error("Erro ao adicionar contato:", err);
    setErro("Não foi possível adicionar o contato.");
  }
}

async function alternar(id, feita) {
  try {
    setErro("");
    await alternarContato(id, feita);
  } catch (err) {
    console.error("Erro ao alternar contato:", err);
    setErro("Não foi possível alternar o contato.");
  }
}

async function remover(id) {
  try {
    setErro("");
    await removerContato(id);
  } catch (err) {
    console.error("Erro ao remover contato:", err);
    setErro("Não foi possível remover o contato.");
  }
}


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
      <form onSubmit={adicionar} className="linha">
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