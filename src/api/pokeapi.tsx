
export const getPokemon = async () => {
    return fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
        .then(res => {
            if(!res.ok){
                throw new Error('Network response was not ok');
            }
            console.log('res: ' + JSON.stringify(res));
            return res.json();

        })
        .then(data => {
            console.log('data: ' + JSON.stringify(data.results));
            return data.results;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });

}

export const getDetails = async (url:string) => {
    return fetch(url)
        .then(res => {
            if(!res.ok){
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('There was a problem fetching pokemon details:', error);
        });

}