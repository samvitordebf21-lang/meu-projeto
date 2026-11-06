import { collection, addDoc, updateDoc, deleteDoc, getDocs, onSnapshot, orderBy, query, doc, serverTimestamp }
  from "firebase/firestore";
import { db } from "./Firebase";

const colecao = collection(db, "tarefas");

export async function criarTarefa(texto) {
    await addDoc(colecao, {
            texto,
            feita: false,
            criadaEm: serverTimestamp(),
  });
}
export async function listarTarefas() {
     const resultado = await getDocs(colecao);
         return resultado.docs.map((d) => ({
                id: d.id,
                ...d.data(),
  }));
}
export async function alternarTarefa(id, feita) {
    await updateDoc(doc(db, "tarefas", id), {
        feita: !feita,
  });
}
export async function removerTarefa(id) {
  await deleteDoc(doc(db, "tarefas", id));
}
export function ouvirTarefas(aoMudar) {
  const q = query(colecao, orderBy("criadaEm"));
  return onSnapshot(q, (resultado) => {
     const lista = resultado.docs.map((d) => ({
         id: d.id, ...d.data(),
    }));
    aoMudar(lista);
  });
}
