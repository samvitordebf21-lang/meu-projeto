"use client";
import { useState } from "react";

export default function ListaTarefas() {
  const [tarefas, setTarefas] = useState([
    { id: 1, texto: "Terminar o portfólio", feita: false },
    { id: 2, texto: "Estudar Next.js", feita: true },
    { id: 3, texto: "Enviar currículo", feita: false },
  ]);
  const [novaTarefa, setNovaTarefa] = useState("");

  // Desafio: quantas tarefas ainda faltam
  const faltam = tarefas.filter((t) => !t.feita).length;

  function adicionar(e) {
    e.preventDefault();
    if (!novaTarefa.trim()) return;
    setTarefas([...tarefas, { id: Date.now(), texto: novaTarefa.trim(), feita: false }]);
    setNovaTarefa("");
  }

  function alternar(id) {
    setTarefas(tarefas.map((t) => (t.id === id ? { ...t, feita: !t.feita } : t)));
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

      <ul>
        {tarefas.map((t) => (
          <li key={t.id} className={t.feita ? "feita" : ""}>
            <label>
              <input type="checkbox" checked={t.feita} onChange={() => alternar(t.id)} />
              {t.texto}
            </label>
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