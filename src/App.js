import React, {useEffect, useState} from 'react';
import './App.css';
import PreviewRecipe from './components/PreviewRecipe';
import Recipe from './components/Recipe';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  const APP_ID = "0abc56d7";
  const APP_KEY = "dccd7084a70d9f78fbd30fcc39751291";

  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState("")
  const [detail, setDetail] = useState(null)

  useEffect(() => {
    getRecipes();
  }, [query])

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    // console.log(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
    // console.log(search);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  const handleDetail = (id) => {
    const filterRecipe = recipes.filter(recipe => recipe.label == id)
    const newCurrentRecipe = filterRecipe.length > 0 ? filterRecipe[0] : null
    
    setDetail(newCurrentRecipe)
    console.log("handle Detail jalan")
  }

  return (
    <Router>
    <div className="App">
        <h1 className="App-title">Recipe Search</h1>
        <form className="search-form" onSubmit={getSearch} >
          <input className="search-bar" type="text" value={search} onChange={updateSearch} ></input>
          <button className="search-button" type="submit">Search</button>
        </form>
        
        {recipes.map(recipe => (
          <PreviewRecipe 
            key={recipe.recipe.label} 
            recipe={recipe.recipe}
            handleDetail={handleDetail}
          />
        ))}
        <Switch>
        <Route path="/detail">
        {console.log(detail)}
        {detail===null ? "" : <Recipe label={detail.recipe.label} calories={detail.recipe.calories} image={detail.recipe.image}/>}
        </Route>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
