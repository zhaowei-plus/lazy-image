class LazyImg extends HTMLElement {

  static get observedAttributes() {
    return ['width', 'height', 'src']
  }

  constructor() {
    super()

    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.innerHTML = `
      <style>
        img {
          border: 1px solid red;
          display: block;
          background-image: url(./images/loading.gif);
          background-repeat: no-repeat;
          background-position: center;
          border-color: transparent;
        }
      </style>
      <img data-src=${this.src}>
    `
  }

  connectedCallback() {
    console.log('连接到DOM文档时被调用')
  }

  disconnectedCallback() {
    console.log('文档DOM断开连接时被调用')
  }

  get width() {
    return this.getAttribute('width')
  }

  get height() {
    return this.getAttribute('height')
  }

  get src() {
    return this.getAttribute('src')
  }

  render() {
    const img = this.shadowRoot.querySelector('img')
    console.log('render:', img)
    if (img) {
      // img.style.width = this.width + 'px'
      // img.style.height = this.height + 'px'
      img.setAttribute('data-src', this.src)
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`属性： ${name} 发生变化，值: [${oldValue} ${newValue}]`, typeof newValue)
    if (['width', 'height'].includes(name)) {
      // img.style = 
    }
    this.render()
  }
}

window.customElements.define('lazy-img', LazyImg)