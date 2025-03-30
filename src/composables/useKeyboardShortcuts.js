import { onMounted, onUnmounted } from 'vue'

export function useKeyboardShortcuts(actions) {
  const handleKeydown = (event) => {
    // Don't trigger shortcuts when typing in input fields
    if (['input', 'textarea', 'select'].includes(event.target.tagName.toLowerCase())) {
      return
    }

    // Handle keyboard shortcuts
    if (event.ctrlKey || event.metaKey) {
      switch (event.key.toLowerCase()) {
        case 'e':
          event.preventDefault()
          actions.export?.()
          break
        case 'p':
          event.preventDefault()
          actions.preview?.()
          break
        case 'd':
          event.preventDefault()
          actions.delete?.()
          break
        case 'i':
          event.preventDefault()
          actions.edit?.()
          break
      }
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