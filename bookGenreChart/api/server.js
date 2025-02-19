import { config } from "dotenv";
import { Client } from "@notionhq/client";
import express from "express";
import path from "path";

config();

const keyID = process.env.NOTION_API_KEY;
const dbID = process.env.NOTION_BOOKGENRES_DATABASE_ID;
const app = express();
const port = 3000;
const notion = new Client({ auth: keyID });

//app.use(express.static('public'));

export default async function handler(req, res) {
    if (req.method === "GET" && req.url === "/bookGenreChart") {
        const response = await queryDB(dbID);
        const pages = response.results;

        const genreCounts = pages.reduce((acc, genre) => {
            acc[genre.properties.Name.title[0].text.content] = genre.properties.Finished.formula.number;
            return acc;
        }, {});

        res.status(200).json(genreCounts);
      
     // res.status(200).json({ message: "Hello from the server!" });
    } else {
      res.status(404).json({ error: "Not found" });
    }
  }

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/bookGenreChart', async (req, res) => {
    const response = await queryDB(dbID);
    const pages = response.results;

    const genreCounts = pages.reduce((acc, genre) => {
        acc[genre.properties.Name.title[0].text.content] = genre.properties.Finished.formula.number;
        return acc;
    }, {});

    res.json(genreCounts);
});

app.get('/rawGenreData', async (req, res) => {
    const response = await queryDB(dbID);
    const pages = response.results;

    res.json(pages);
});

async function queryDB(dbIB) {
    console.log("Querying DB " + dbIB + "...");

    const response = await notion.databases.query({
        database_id: dbIB
    });

    console.log("Done querying");

    return response;
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});