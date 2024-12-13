import { ResponseBuilder } from "@fermyon/spin-sdk";

export async function handler(req: Request, res: ResponseBuilder) {
    const requestUrl = new URL(req.url);
    const query = requestUrl.searchParams.get('query') || '';    
    const apiUrl = `https://api.chucknorris.io/jokes/search?query=${query}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log(`Received ${JSON.stringify(data)}`);
    if (data.status === 404) {
        res.status(404);
        res.send('No joke found.');
        return;
    }

    // TODO handle total count and result array properly
    res.send(data.total);
}