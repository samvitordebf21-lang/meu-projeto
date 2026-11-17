export default function TarefaItem({ tarefa, onAlternar, onRemover }) {
  return (
    <li>
      {tarefa.feita ? <s>{tarefa.texto}</s> : tarefa.texto}
      <button onClick={onAlternar}>Feita</button>
      <button onClick={onRemover}>Remover</button>
    </li>
  );
}