import { onMounted, onUnmounted } from 'vue'

export function useKeyboardNav(options) {
  const {
    onNext,
    onPrevious,
    onEscape,
    isEnabled = true
  } = options

  const handleKeydown = (event) => {
    if (!isEnabled) return

    switch (event.key) {
      case 'Tab':
        if (event.shiftKey) {
          onPrevious && onPrevious()
        } else {
          onNext && onNext()
        }
        break
      case 'Enter':
        if (!event.target.tagName.match(/^(textarea|button|select)$/i)) {
          event.preventDefault()
          onNext && onNext()
        }
        break
      case 'Escape':
        onEscape && onEscape()
        break
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })

  return {
    handleKeydown
  }
}