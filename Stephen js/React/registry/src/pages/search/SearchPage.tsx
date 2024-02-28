import type { SearchLoaderResult } from "./searchLoader";
import { useLoaderData } from "react-router-dom";

export default function SearchPage() {
  const data = useLoaderData() as SearchLoaderResult;

  console.log(data.searchResults);

  return <div>Search Page</div>;
}
