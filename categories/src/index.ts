import { ResponseBuilder } from "@fermyon/spin-sdk";

export async function handler(req: Request, res: ResponseBuilder) {
    const apiUrl = `https://api.chucknorris.io/jokes/categories`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log(`Received categories ${JSON.stringify(data)}`);
    res.send(data);
}
