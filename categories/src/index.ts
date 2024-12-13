import { ResponseBuilder, Kv } from "@fermyon/spin-sdk";

const CATEGORY_KEY = "categories";

export async function handler(req: Request, res: ResponseBuilder) {
    let store = Kv.openDefault();

    const requestUrl = new URL(req.url);
    const refreshParam = requestUrl.searchParams.get('refresh');
    const refresh = refreshParam === 'true';
    if (refresh) {
        console.log("Refresh flag set. Deleting cached data.");
        await store.delete(CATEGORY_KEY);
    }
    
    if (store.exists(CATEGORY_KEY)) {
        console.log("Categories already in default K/V store. Returning cached data.");
        let categories = await store.getJson(CATEGORY_KEY);
        res.send(categories);
        return;
    }

    console.log("Fetching categories from Chuck Norris API.");
    const apiUrl = `https://api.chucknorris.io/jokes/categories`;
    const response = await fetch(apiUrl);
    const categories = await response.json();

    console.log("Storing categories in default K/V store.");
    await store.setJson(CATEGORY_KEY, categories);
    res.send(categories);
}
