import { ResponseBuilder, Kv } from "@fermyon/spin-sdk";

interface Joke {
    id: string;
    value: string;
}

export async function handler(req: Request, res: ResponseBuilder) {
    const requestUrl = new URL(req.url);
    const query = requestUrl.searchParams.get('query') || '';    
    const apiUrl = `https://api.chucknorris.io/jokes/search?query=${query}`;

    if (query === '') {
        res.status(400);
        res.send('No search query specified.');
        return;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === 404) {
        res.status(404);
        res.send('No jokes found.');
        return;
    }

    let store = Kv.open("jokes");
    await data.result.forEach((joke: Joke) => {
        console.log(`Caching joke ${joke.id} and value ${joke.value}`);
        store.set(joke.id, joke.value);
    });

    res.send(`Found and cached ${data.total} jokes.`);
}
