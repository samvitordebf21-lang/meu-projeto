import { cacheLife } from "next/cache";

export default async function GitHub() {
  "use cache";
  cacheLife("hours");

  const res = await fetch(
    "https://api.github.com/users/samvitordebf21-lang/repos"
  );

  if (!res.ok) {
    return <p>Não foi possível carregar os repositórios.</p>;
  }

  const repos = await res.json();

  return (
    <ul>
      {repos.map((r) => (
        <li key={r.id}>{r.name}</li>
      ))}
    </ul>
  );
}