import * as model from './modal'
import  PaginationView  from './views/PaginationView';
import RecipeView from './views/RecipeView';
import ResultView from './views/ResultView';
import SearchView from './views/SearchView';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async function() {
  try {
    RecipeView.renderSpinner()
    const id = window.location.hash?.slice(1)
    
    await model.loadRecipe(id)
    RecipeView.render(model.state.recipe)

  } catch (e) {
    console.log(e)
  }
}

async function showSearchResult() {
  try {
    const query = SearchView.getQuery()
    if (!query) return
    ResultView.renderSpinner()
    await model.searchRecipes(query)
    ResultView.render(model.searchResultsPerPage(1))
    PaginationView.render(model.state.search)
  } catch (e) {
    console.log(e)
  }
}

const controlPaginationButtons = function(value) {
  ResultView.render(model.searchResultsPerPage(value))
  PaginationView.render(model.state.search)
}

async function init() {
  RecipeView.addHandlerEvents(showRecipe)
  SearchView.addHandleEvent(showSearchResult)
  PaginationView.addEventClickHanlder(controlPaginationButtons)
}

init()