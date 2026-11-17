import { collection, addDoc, updateDoc, deleteDoc, getDocs, onSnapshot, orderBy, query, doc, serverTimestamp }
  from "firebase/firestore";
import { db } from "../lib/Firebase";

const colecao = collection(db,"contatos");

export async function criarContato(nome, email, telefone) {
    await addDoc(colecao, {
        nome,
        email,
        telefone,
        criadoEm: serverTimestamp(),
    });
}
export async function listarContatos() {
     const resultado = await getDocs(colecao);
         return resultado.docs.map((d) => ({
                id: d.id,
                ...d.data(),
  }));
}
export async function alternarContato(id, feita) {
    await updateDoc(doc(db, "contatos", id), {
        feita: !feita,
  });
}
export async function removerContato(id) {
  await deleteDoc(doc(db, "contatos", id));
}
export function ouvirContatos(aoMudar) {
  const q = query(colecao, orderBy("criadoEm"));
  return onSnapshot(q, (resultado) => {
     const lista = resultado.docs.map((d) => ({
         id: d.id, ...d.data(),
    }));
    aoMudar(lista);
  });
}