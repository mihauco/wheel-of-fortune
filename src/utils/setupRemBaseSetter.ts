let styleElement: null | HTMLStyleElement = null

function setRemBase() {
  const app = document.querySelector('.app')

  if (app) {
    const appWidth = app.clientWidth
    const remBase = 0.0125 * appWidth

    document.documentElement.style.fontSize = `${remBase}px`

    if (!styleElement) {
      styleElement = document.createElement('style')
      document.head.appendChild(styleElement)
    }

    styleElement.innerHTML = `html{font-size: ${remBase}px;}`
  }
}

function setupRemBaseSetter() {
  setRemBase()
  window.addEventListener('resize', setRemBase)
}

export default setupRemBaseSetter