import { Button } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import { I_Product } from '../types'
import {
  Wrapper,
  Image,
  ImagePlaceholder,
  PriceWrapper,
  PriceRegular,
  PriceRegularWhenDiscounted,
  PriceDiscounted,
  Title,
  Desc,
  ActionButtons
} from './styled'

interface I_ProductCardProps {
  product: I_Product
  imagePreviewUrl?: string | null
  isPreview?: boolean
  onEdit?: (product: I_Product) => void
  onDelete?: (id: number) => void
}

const ProductCard: React.FC<I_ProductCardProps> = ({
  product,
  imagePreviewUrl,
  isPreview = false,
  onEdit,
  onDelete
}) => {
  const { id, title, description, price, priceDiscounted, image } =
    product

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // плавная прокрутка
    })
  }

  // Определяем URL изображения
  const getImageSrc = () => {
    if (imagePreviewUrl) {
      return imagePreviewUrl
    }
    if (typeof image === 'string' && image) {
      return `${process.env.REACT_APP_API_URL}/images/products/${image}`
    }
    return null
  }

  const imageSrc = getImageSrc()

  return (
    <Wrapper>
      {imageSrc ? (
        <Image src={imageSrc} alt={title || 'Товар'} />
      ) : (
        <ImagePlaceholder>Нет изображения</ImagePlaceholder>
      )}

      <PriceWrapper>
        {priceDiscounted && priceDiscounted > 0 ? (
          <>
            <PriceDiscounted>{priceDiscounted} ₽</PriceDiscounted>
            <PriceRegularWhenDiscounted>
              {price} ₽
            </PriceRegularWhenDiscounted>
          </>
        ) : (
          <PriceRegular>{price || 0} ₽</PriceRegular>
        )}
      </PriceWrapper>

      <Title>{title || 'Название товара'}</Title>
      <Desc>{description || 'Описание товара'}</Desc>

      {!isPreview && id && (
        <ActionButtons>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {onEdit?.(product); scrollToTop()}}
            block
          >
            Изменить
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete?.(id)}
            block
          >
            Удалить
          </Button>
        </ActionButtons>
      )}
    </Wrapper>
  )
}

export default ProductCard
