interface I_MenuItem {
  title: string
  link: string
  children?: I_MenuItem[]
}

const menuItems: I_MenuItem[] = [
  {
    title: 'Товары',
    link: 'products'
  },
  {
    title: 'Выйти',
    link: 'logout'
  }
]

export default menuItems
