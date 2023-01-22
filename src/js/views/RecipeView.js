import icons from 'url:../../img/icons.svg'
import View from './View';

class RecipeView extends View {
    _parentElement =  document.querySelector('.recipe');


    _generateMarkup() {
        return `
        <figure class="recipe__fig">
          <img src=${this._data.recipe.image_url} alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}_icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${this._data.recipe.cooking_time}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${this._data.recipe.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings" data-updateTo=${this._data.recipe.servings -1}>
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings" data-updateTo=${this._data.recipe.servings + 1}>
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark${this._data.recipe.bookmarked === true ? '-fill' : ''}"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">       
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this._data.recipe.ingredients.map(ing => {
            return `<li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${ing.quantity ?? 0}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ing.unit}</span>
              ${ing.description}
            </div>
          </li>
          `
          }).join("")}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">The Pioneer Woman</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}_icon-arrow-right"></use>
            </svg>
          </a>
        </div>      
        `
    }

    addEventHandlerBookmark(handler) {
      this._parentElement.addEventListener('click', (e) => {
        const btnBookmark = e.target.closest('.btn--round')
        if (!btnBookmark) return 
        handler()
      })
    } 

    addHandlerEvents(handler) {
      window.addEventListener('hashchange', handler)
      window.addEventListener('load', handler)
    }

    addHandlerUpdateServings(handler) {
      this._parentElement.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn--tiny')
        if (!btn) return 
        const numberRecipes = btn.dataset.updateto
         if (+numberRecipes > 0) handler(+numberRecipes)
      })
    }
}

export default new RecipeView();