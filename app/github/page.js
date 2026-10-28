
export default async function GitHub() {
  const res = await fetch(
    "https://api.github.com/users/mvmendoncas/repos"
  );
  const repos = await res.json();

  return (
    <ul>
      {repos.map((r) => <li key={r.id}>{r.name}</li>)}
    </ul>
  );
}