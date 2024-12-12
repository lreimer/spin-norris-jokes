import { ResponseBuilder } from "@fermyon/spin-sdk";

export async function handler(req: Request, res: ResponseBuilder) {
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

    console.log(`Received random joke ${JSON.stringify(data)}`);
    if (data.status === 404) {
        res.status(404);
        res.send('No joke found.');
        return;
    }
    res.send(data.value);
}
