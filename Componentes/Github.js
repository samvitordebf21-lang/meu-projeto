import { obterRepositoriosComCache } from "@/services/github";

export default async function GitHub() {
  try {
    const repos = await obterRepositoriosComCache();

    return (
      <ul>
        {repos.map((r) => (
          <li key={r.id}>{r.name}</li>
        ))}
      </ul>
    );
  } catch (error) {
    return <p>{error.message}</p>;
  }
}