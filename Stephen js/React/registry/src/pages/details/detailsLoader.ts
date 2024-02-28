import type { Params } from "react-router-dom";
import { getPackage } from "../../api/queries/getPackage";

interface LoaderArgs {
  params: Params;
}

export async function detailsLoader({ params }: LoaderArgs) {
  const { name } = params;

  if (!name) {
    throw new Error("Name must be provided");
  }

  const details = await getPackage(name);

  return {
    details,
  };
}



import getpackeg from ../ ../ apie queris get package


import type {Params} from reactrouter dom


interface LoaderAergs {
    params: Params
}

export asycn fjicotn ftailloader({params}: LoaderArgs) {
    searchLoader

    
    
return 'data'
}