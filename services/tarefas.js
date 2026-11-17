import { db } from "@/lib/Firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

export async function criarTarefa(texto) {
  const limpo = texto.trim();

  if (!limpo) throw new Error("Escreva a tarefa.");
  if (limpo.length > 200) throw new Error("Máximo de 200 letras.");

     await addDoc(collection(db, "tarefas"), {
         texto: limpo,
         feita: false,
         criadaEm: serverTimestamp(),
  });
}

export async function alternarTarefa(id, feitaAtual) {
  await updateDoc(doc(db, "tarefas", id), { feita: !feitaAtual });
}

export async function removerTarefa(id) {
  await deleteDoc(doc(db, "tarefas", id));
}

export function ouvirTarefas(aoMudar) {
     const consulta = query(collection(db, "tarefas"), orderBy("criadaEm"));
      return onSnapshot(consulta, (snapshot) => {
         aoMudar(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}