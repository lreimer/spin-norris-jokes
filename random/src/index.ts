import { ResponseBuilder } from "@fermyon/spin-sdk";

export async function handler(req: Request, res: ResponseBuilder) {
    const requestUrl = new URL(req.url);
    const category = requestUrl.searchParams.get('category') || '';

    const apiUrl = `https://api.chucknorris.io/jokes/random`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log(`Received random joke ${JSON.stringify(data)}`);
    res.send(data.value);
}
