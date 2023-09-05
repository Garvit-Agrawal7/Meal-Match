import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended:true }));

const API_URL = "https://www.themealdb.com/api/json/v1/1/"

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}search.php?s=Pasta`)
        const result = JSON.stringify(response.data.meals[0].strInstructions)
    } catch (error) {
        res.status(404)
    }
});

app.listen(port)