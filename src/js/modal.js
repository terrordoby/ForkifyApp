import { API_URl } from "./config"

export const state = {
    recipe: {},
    search: {
        results: [],
        page: 1,
        searchResultsPerPage: 10,
    },
    bookmarks: []
}

export const loadRecipe = async (id) => {
    try {
        const res =  await fetch(`${API_URl}/${id ||"5ed6604591c37cdc054bc886"}`)
        const {data} = await res.json()
        const {recipe} = data
        state.recipe = {recipe}

        const recipeBookmark = state.bookmarks?.some((bookmark) => bookmark.recipe.id === recipe.id)
        if (recipeBookmark) {
            recipe.bookmarked = true;
        } else {
            recipe.bookmarked = false;
        }

        if (!res.ok) throw new Error(`${data.message} ${res.status}`)
    } catch (e) {
        console.log("error : ", e)
    }

    
}

export async function searchRecipes(query) {
    try {
        const res = await fetch(`${API_URl}?search=${query}}`)
        const {data : {recipes}} = await res.json()
        state.search.results = recipes
    } catch (e) {
        console.log(e)
    }
}

export function searchResultsPerPage(page = 1) {

    state.search.page = page
    const start = (page -1) * 10
    const end = page * 10

    return state.search.results.slice(start, end)
}

export function updateServingsRecipe(newServing) {
    const {recipe} = state.recipe
    recipe.ingredients.forEach((ing) => (
        ing.quantity = (ing.quantity * newServing) / recipe.servings
    ))
    recipe.servings = newServing
}

export function addRecipeBookmark(recipe) {
    state.bookmarks.push(recipe)
    state.recipe.recipe.bookmarked = true;
}

export function deleteRecipeBookmark(recipe) {
    const indexRecipe = state.bookmarks.findIndex((bookmark) => bookmark.recipe.id === recipe.recipe.id )
    
    state.bookmarks.splice(indexRecipe, 1)  
 
    if(recipe.recipe.id === state.recipe.recipe.id) {
        if (indexRecipe >= 0) {
            state.recipe.recipe.bookmarked = false;
        }
    }
}
