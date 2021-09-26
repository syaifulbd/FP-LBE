import React from "react";
import Recipe from "./Recipe";
import { Link } from "react-router-dom";

const PreviewRecipe = (recipe) => {

    return (
        <div className="recipe">
            <h1>{recipe.recipe.label}</h1>
            <img src={recipe.recipe.image} alt="Photos of food"/>
            <button Link to = "/detail" onClick={() => recipe.handleDetail(recipe.label)} href="">View Detail</button>
        </div>
    )
}

export default PreviewRecipe;