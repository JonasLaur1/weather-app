export function showNotification(
  message: string,
  type: 'success' | 'error'
): void {
  let container = document.getElementById('notification-container')
  if (!container) {
    container = document.createElement('div')
    container.id = 'notification-container'
    container.style.position = 'fixed'
    container.style.top = '1rem'
    container.style.right = '1rem'
    container.style.zIndex = '1000'
    document.body.appendChild(container)
  }

  const notif = document.createElement('div')
  notif.className = `notification is-${type}`
  notif.textContent = message
  notif.style.marginBottom = '0.5rem'

  const deleteBtn = document.createElement('button')
  deleteBtn.className = 'delete'
  deleteBtn.onclick = () => container!.removeChild(notif)
  notif.appendChild(deleteBtn)

  container.appendChild(notif)

  setTimeout(() => {
    if (notif.parentElement === container) {
      container.removeChild(notif)
    }
  }, 3000)
}