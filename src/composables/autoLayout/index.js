import { ref } from 'vue'

const scale = ref(1)
let preFontsize = 16

export const setDocumentFontSize = () => {
  const screenHeight = window.innerHeight
  const screenWidth = window.innerWidth
  const designWidth = 1920
  const designHeight = 1080
  const widthScale = Number((screenWidth / designWidth).toFixed(3))
  const heightScale = Number((screenHeight / designHeight).toFixed(3))
  const newFontSize = Math.round(16 * Math.min(widthScale, heightScale))

  if (preFontsize !== newFontSize) {
    preFontsize = newFontSize
    scale.value = Math.min(widthScale, heightScale)
  }

  document.documentElement.style.fontSize = `${newFontSize}px`
}

window.addEventListener('resize', setDocumentFontSize)

export const changeValueByScale = (value) => {
  let sValue = scale.value

  if (scale.value < 0.5) {
    sValue = Math.max(scale.value - 0.05, 0.1)
  }

  return value * sValue
}
