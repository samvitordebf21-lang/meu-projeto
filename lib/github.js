export async function buscarRepositorios() {
  const res = await fetch(
    "https://api.github.com/users/samvitordebf21-lang/repos"
  );

  if (!res.ok) {
    throw new Error("Não foi possível carregar os repositórios.");
  }

  return res.json();
}