import icons from 'url:../../img/icons.svg'

export default class View {
    _data

    render(data) {
        this._data = data
        const markup = this._generateMarkup()        
        this._parentElement.innerHTML = ""
        this._parentElement.insertAdjacentHTML("afterbegin", markup)
    }

    renderSpinner() {
        const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
        `
        this._parentElement.innerHTML = ""
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }
}