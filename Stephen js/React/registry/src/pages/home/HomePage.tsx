import type { HomeLoaderResult } from "./homeLoader";
import { useLoaderData } from "react-router-dom";

export default function HomePage() {
  const { featuredPackages } = useLoaderData() as HomeLoaderResult;

  return <div>Home Page</div>;
}
