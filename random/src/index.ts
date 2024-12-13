import { ResponseBuilder, Kv } from "@fermyon/spin-sdk";

interface Joke {
    id: string;
    value: string;
}

export async function handler(req: Request, res: ResponseBuilder) {
    let store = Kv.open("jokes");
    const keys = await store.getKeys();
    
    if (keys.length > 42) {   
        console.log(`Cache has ${keys.length} jokes, fetching a random one.`);     
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        res.send(store.get(randomKey) || 'No cached random joke found.');
        return;
    }

    const requestUrl = new URL(req.url);
    const category = requestUrl.searchParams.get('category') || '';

    var apiUrl = '';
    if (category === '') {
        apiUrl = `https://api.chucknorris.io/jokes/random`; 
    } else {
        apiUrl = `https://api.chucknorris.io/jokes/random?category=${category}`;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === 404) {
        res.status(404);
        res.send('No joke found.');
        return;
    }

    console.log(`Caching joke ${data.id} and value ${data.value}`);
    await store.set(data.id, data.value);
    res.send(data.value);
}
