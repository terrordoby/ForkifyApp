import View from "./View";
import icons from 'url:../../img/icons.svg'

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination')

    addEventClickHanlder(handler) {
        this._parentElement.addEventListener('click', (e) => {
           const btn = e.target.closest('.btn--inline')
            if (!btn) return 
            const goTo = +btn.dataset.goto
            handler(goTo)
        })
    }

    _generateMarkup() {
        const numsPage = Math.ceil(this._data.results.length / this._data.searchResultsPerPage)
        const currentPage = this._data.page
        
        if (currentPage === 1 && numsPage > 1) {
            return `
            <button data-goto=${currentPage + 1} class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `
        }

        if (currentPage !== numsPage && currentPage > 1 &&  numsPage > 1) {
            return ` 
            <button data-goto=${currentPage - 1} class="btn--inline pagination__btn--prev">
             <svg class="search__icon">
             <use href="${icons}#icon-arrow-left"></use>
             </svg>
            <span>Page ${currentPage - 1 }</span>
           </button>
           <button data-goto=${currentPage + 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
            <span>Page ${currentPage + 1 }</span>
           </button>     
            `
        }

        if (currentPage === numsPage) {
            return ` 
            <button data-goto=${currentPage - 1} class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentPage - 1 }</span>
            </button>          
            `
        }

        return ""
    }
}

export default new PaginationView()