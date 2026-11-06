"use client";
import { useState, useEffect } from "react";
import {
  criarTarefa,
  alternarTarefa,
  removerTarefa,
  ouvirTarefas,
} from "../../lib/Tarefas";

export default function ListaTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    try {
     
      return ouvirTarefas(setTarefas, (err) => {
        console.error("Erro ao ouvir tarefas:", err);
        setErro("Não foi possível carregar as tarefas.");
      });
    } catch (err) {
      console.error("Erro ao iniciar listener:", err);
      setErro("Não foi possível carregar as tarefas.");
    }
  }, []);

  const faltam = tarefas.filter((t) => !t.feita).length;

  async function adicionar(e) {
    e.preventDefault();
    if (!novaTarefa.trim()) return;

    try {
      setErro("");
      await criarTarefa(novaTarefa.trim());
      setNovaTarefa("");
    } catch (err) {
      console.error("Erro ao criar tarefa:", err);
      setErro("Não foi possível adicionar a tarefa.");
    }
  }

  async function alternar(t) {
    try {
      setErro("");
      await alternarTarefa(t.id, t.feita);
    } catch (err) {
      console.error("Erro ao atualizar tarefa:", err);
      setErro("Não foi possível atualizar a tarefa.");
    }
  }

  async function remover(id) {
    try {
      setErro("");
      await removerTarefa(id);
    } catch (err) {
      console.error("Erro ao remover tarefa:", err);
      setErro("Não foi possível remover a tarefa.");
    }
  }

  return (
    <div className="tarefas">
      <form onSubmit={adicionar} className="linha">
        <input
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          placeholder="Nova tarefa"
          aria-label="Nova tarefa"
        />
        <button type="submit" className="primario">Adicionar</button>
      </form>

      {erro && (
        <p className="erro" role="alert">
          {erro}
        </p>
      )}

      <ul>
        {tarefas.map((t) => (
          <li key={t.id} className={t.feita ? "feita" : ""}>
            <label>
              <input
                type="checkbox"
                checked={t.feita}
                onChange={() => alternar(t)}
              />
              {t.texto}
            </label>
            <button onClick={() => remover(t.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <p className="contador" aria-live="polite">
        {faltam === 0
          ? "Tudo feito! ;D"
          : faltam === 1
          ? "Falta 1 tarefa"
          : `Faltam ${faltam} tarefas`}
      </p>
    </div>
  );
}