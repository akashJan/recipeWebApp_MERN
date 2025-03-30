import React, { useState } from 'react'
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID.js';
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'


export const CreateRecipe = () => {
    const userID = useGetUserID();

    // eslint-disable-next-line no-unused-vars
    const [cookies, _] = useCookies(["access_token"]);

    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instruction: "",
        imgUrl: "",
        cookingTime: 0,
        userOwner: userID,
    });

    const navigate = useNavigate();


    const handleChange = (event) => {
        const { name, value } = event.target;
        setRecipe({ ...recipe, [name]: value })
    }

    const handleIngredientChange = (event, index) => {
        const { value } = event.target;
        const ingredients = [...recipe.ingredients];
        ingredients[index] = value;
        setRecipe({ ...recipe, ingredients })
    }

    const addIngredient = () => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] })
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/recipes", recipe,
                { headers: { authorization: cookies.access_token }, });
            alert("Recipe Created");
            navigate("/")
        } catch (err) {
            console.error("err", err);
        }
    };

    return (
        <div className="create-recipe">
            <h2>Create Recipe</h2>
            <form onSubmit={onSubmit} >
                <label htmlFor="name">Name</label>
                <input type="text" id='name' name='name' onChange={handleChange} />
                <label htmlFor="ingredients">Ingredients</label>
                {recipe.ingredients.map((ingredient, index) => (
                    <input key={index} type="text" name='ingredients' value={ingredient} onChange={(event) => handleIngredientChange(event, index)} />
                ))}
                <button onClick={addIngredient} type='button'> Add Ingredient</button>
                <label htmlFor="instruction">instruction</label>
                <textarea id='instruction' name='instruction' value={recipe.instruction} onChange={handleChange}> </textarea>
                <label htmlFor="imgUrl">Image URL</label>
                <input type="text" id='imgUrl' name='imgUrl' onChange={handleChange} />
                <label htmlFor="cookingTime">Cooking Time (minutes)</label>
                <input type="number" id='cookingTime' name='cookingTime' onChange={handleChange} />
                <button type='submit' style={{ margin: "10px", padding: "5px" }} > Create Recipe</button>
            </form>
        </div >
    )
}

