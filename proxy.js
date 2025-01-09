import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 4000;

app.use(cors());

app.get("/proxy", async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) {
        return res.status(400).send("URL faltante en la solicitud.");
    }

    try {
        const response = await fetch(targetUrl);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.text();
        res.send(data);
    } catch (error) {
        console.error("Error al obtener el feed RSS:", error);
        res.status(500).send("Error al obtener el feed RSS.");
    }
});

app.listen(PORT, () => {
    console.log(`Proxy funcionando en http://localhost:${PORT}`);
});
