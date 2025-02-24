import { createContext,useEffect, useState } from "react"
import { getPokemon,getDetails } from "../api/pokeapi";

export const AppContext = createContext({});

export const AppProvider=({children}:any)=>{


    const [pokemons,setPokemons] = useState<{name:string;details:any}[]>([]);

    useEffect(()=>{
        //get pokemonList
        const fetchPokemonData = async ()=>{
            try{
                const pokemonList = await getPokemon();
                
                //get pokemonDetails
                const pokemonDetails = await Promise.all(
                    pokemonList.map(async (pokemon:any)=>{
                        const details = await getDetails(pokemon.url);
                        return{
                            name:pokemon.name,
                            image: details.sprites.back_default,
                            types: details.types.map((typeInfo:any)=>typeInfo.type.name),
                        }
                    })
                )

                setPokemons(pokemonDetails);

            }catch(error){
                console.log('Error fetching the pokemon api: ',error);
            }
        }

        fetchPokemonData();
    },[])

    return(
        <AppContext.Provider value={{pokemons}}>
            {children}
        </AppContext.Provider>
    )

}