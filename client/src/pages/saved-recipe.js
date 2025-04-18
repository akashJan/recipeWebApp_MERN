import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';

export const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const userID = useGetUserID();

    useEffect(() => {
        const fetchSavedRecipes = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
            } catch (err) {
                console.error(err)
            }
        };

        fetchSavedRecipes();
    }, [userID]);

    return (
        <div>
            <h1>Saved Recipes</h1>
            <ul>
                {savedRecipes.map((recipe) => (
                    <li key={recipe._id}>
                        <div>
                            <h2>{recipe.name}</h2>
                        </div>
                        <div className='instruction'>
                            <p>{recipe.instruction}</p>
                        </div>
                        <img src={recipe.imgUrl} alt={recipe.name} style={{ maxWidth: '100%' }} />
                        <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

