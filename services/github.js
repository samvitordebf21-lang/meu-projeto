import { cacheLife } from "next/cache";
import { buscarRepositorios } from "@/lib/github";

export async function obterRepositoriosComCache() {
  "use cache";
  cacheLife("hours");

  return await buscarRepositorios();
}