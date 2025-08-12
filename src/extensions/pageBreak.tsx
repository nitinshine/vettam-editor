import { Node, Command } from '@tiptap/core'

export const PageBreak = Node.create({
  name: 'pageBreak',
  group: 'block',
  selectable: true,

  parseHTML() {
    return [{ tag: 'div[data-page-break]' }]
  },
  renderHTML() {
    return ['div', { 'data-page-break': '', style: 'page-break-after: always;' }, 0]
  },
  addCommands() {
    return {
      ...this.parent?.(),
      insertPageBreak:
        (): Command =>
        ({ commands }) => {
          return commands.insertContent({ type: this.name })
        },
    }
  },
})