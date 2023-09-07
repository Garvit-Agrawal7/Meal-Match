import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended:true }));

const API_URL = "https://www.themealdb.com/api/json/v1/1/"

app.get("/", async (req, res) => {
    res.render("index.ejs")
});

app.post("/", async (req, res) => {
    const dishName = req.body.dish;
    let ingredients = [];
    if (req.body.submit) {
        try {
            const response = await axios.get(`${API_URL}search.php?s=${dishName}`)
            const result = response.data.meals[0].strInstructions
            const meal = response.data.meals[0];
            for (let i = 1; i <= 19; i++) {
                const ingredientKey = `strIngredient${i}`;
                const measureKey = `strMeasure${i}`;
                const ingredientValue = meal[ingredientKey];
                const measureValue = meal[measureKey];
                if (ingredientValue) {
                    let ingredient = `${ingredientValue}: ${measureValue}`;
                    ingredients.push(ingredient)
                }
            }
            res.render("index.ejs", {
                dish: dishName,
                recipe: result,
                ingredients: ingredients
            })
        } catch (error) {
            res.status(404)
        }
    } else if (req.body.random) {
        try {
            const response = await axios.get(`${API_URL}random.php`)
            const result = response.data.meals[0].strInstructions;
            const randDish = response.data.meals[0].strMeal;
            const meal = response.data.meals[0];
            for (let i = 1; i <= 19; i++) {
                const ingredientKey = `strIngredient${i}`;
                const measureKey = `strMeasure${i}`;
                const ingredientValue = meal[ingredientKey];
                const measureValue = meal[measureKey];
                if (ingredientValue) {
                    let ingredient = `${ingredientValue}: ${measureValue}`;
                    ingredients.push(ingredient)
                }
            }
            res.render("index.ejs", {
                dish: randDish,
                recipe: result,
                ingredients: ingredients
            })
        } catch (error) {
            res.status(404)
        }
    }
});

app.listen(port)