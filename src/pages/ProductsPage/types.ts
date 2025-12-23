export interface I_Product {
  id?: number
  title: string
  description: string
  price: number
  priceDiscounted?: number | null
  image: string | File | null
}

export const emptyProduct: I_Product = {
  title: '',
  description: '',
  price: 0,
  priceDiscounted: null,
  image: null
}
