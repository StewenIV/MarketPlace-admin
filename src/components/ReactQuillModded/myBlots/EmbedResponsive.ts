import { Quill } from 'react-quill-new'

// Явно типизируем импорты из Quill
const BlockEmbed = Quill.import('blots/block/embed') as any
const Link = Quill.import('formats/link') as any

/**
 * Модифицированный YouTube embed для адаптивности 16:9
 */
class EmbedResponsive extends BlockEmbed {
  static blotName = 'embed-responsive'
  static tagName = 'DIV'
  static className = 'embed-responsive'

  static create(value: string) {
    const node = super.create(value) as HTMLElement
    node.classList.add('embed-responsive-16by9')

    const child = document.createElement('iframe')
    child.setAttribute('frameborder', '0')
    child.setAttribute('allowfullscreen', 'true')

    // Используем метод sanitize у Link, теперь TS не будет ругаться
    child.setAttribute('src', Link.sanitize(value))
    child.classList.add('embed-responsive-item')

    node.appendChild(child)

    return node
  }

  static value(domNode: HTMLElement) {
    const iframe = domNode.querySelector('iframe')
    return iframe ? iframe.getAttribute('src') : null
  }
}

export default EmbedResponsive
