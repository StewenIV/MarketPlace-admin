import { useState, useCallback, useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { Button, Input, InputNumber, notification, Spin } from 'antd'
import { PlusOutlined, UploadOutlined, ReloadOutlined } from '@ant-design/icons'

import { get, post, del } from 'helpers/request'
import ProductCard from './ProductCard'
import { I_Product, emptyProduct } from './types'
import {
  PageWrapper,
  PageHeader,
  PageTitle,
  ContentWrapper,
  ProductsListSection,
  ProductFormSection,
  FormCard,
  FormTitle,
  PreviewSection,
  PreviewTitle,
  ProductsGrid,
  EmptyState,
  ImageUploadWrapper,
  ImagePreview,
  UploadPlaceholder,
  ButtonsRow
} from './styled'

const { TextArea } = Input

const ProductsPage: React.FC = () => {
  // Список товаров
  const [products, setProducts] = useState<I_Product[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Форма добавления/редактирования
  const [formData, setFormData] = useState<I_Product>(emptyProduct)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  // Загрузка списка товаров
  const loadProducts = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await get('/products')
      if (response.status === 'ok') {
        setProducts(response.data || [])
      }
    } catch (error) {
      notification.error({ message: 'Ошибка при загрузке товаров' })
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  // Обработчик изменения полей формы
  const handleInputChange = useCallback(
    (field: keyof I_Product, value: any) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
    },
    []
  )

  // Обработчик загрузки изображения
  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        setImageFile(file)

        // Создаем превью
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreviewUrl(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    },
    []
  )

  // Сброс формы
  const resetForm = useCallback(() => {
    setFormData(emptyProduct)
    setImageFile(null)
    setImagePreviewUrl(null)
    setEditingId(null)
  }, [])

  // Отправка формы
  const handleSubmit = useCallback(async () => {
    if (!formData.title.trim()) {
      notification.error({ message: 'Введите название товара' })
      return
    }
    if (!formData.price || formData.price <= 0) {
      notification.error({ message: 'Введите корректную цену' })
      return
    }
    if (!imageFile && !editingId) {
      notification.error({ message: 'Загрузите изображение товара' })
      return
    }

    setIsSubmitting(true)
    let update = false;

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('price', String(formData.price))

      if (formData.priceDiscounted && formData.priceDiscounted > 0) {
        formDataToSend.append(
          'priceDiscounted',
          String(formData.priceDiscounted)
        )
      }

      if (imageFile) {
        formDataToSend.append('image', imageFile)
      }

  

      let response
      if (editingId) {
        response = await fetch(
          `${process.env.REACT_APP_API_URL}/products/${editingId}`,
          {
            method: 'PUT',
            body: formDataToSend
          }
        ).then((res) => res.json())
        update = true;
      } else {
        response = await post('/products', formDataToSend)
      }

      if (response.status === 'ok') {
        notification.success({ message: update ? 'Товар успешно обновлен!' : 'Товар успешно добавлен!' })
        resetForm()
        loadProducts()
      } else {
        notification.error({
          message: 'Ошибка при добавлении товара',
          description: response.message || ''
        })
      }
    } catch (error) {
      notification.error({
        message: 'Ошибка при добавлении товара',
        description: String(error)
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, imageFile, editingId, resetForm, loadProducts])


  // Удаление товара
  const handleDelete = useCallback(
    async (id: number) => {
      try {
        const response = await del(`/products/${id}`)
        if (response.status === 'ok') {
          notification.success({ message: 'Товар удален' })
          loadProducts()
        }
      } catch (error) {
        notification.error({ message: 'Ошибка при удалении товара' })
      }
    },
    [loadProducts]
  )

  // Редактирование товара (заполняем форму)
  const handleEdit = useCallback((product: I_Product) => {
    setFormData(product)
    setEditingId(product.id || null)

    if (typeof product.image === 'string' && product.image) {
      setImagePreviewUrl(
        `${process.env.REACT_APP_API_URL}/images/products/${product.image}`
      )
    }
  }, [])

  // Данные для превью карточки
  const previewProduct = useMemo(
    () => ({
      ...formData,
      id: 0
    }),
    [formData]
  )

  return (
    <PageWrapper>
      <Helmet>
        <title>Управление товарами - MW Marketplace Admin</title>
      </Helmet>

      <PageHeader>
        <PageTitle>Управление товарами</PageTitle>
        <Button
          icon={<ReloadOutlined />}
          onClick={loadProducts}
          loading={isLoading}
        >
          Обновить
        </Button>
      </PageHeader>

      <ContentWrapper>
        {/* Список товаров */}
        <ProductsListSection>
          {isLoading ? (
            <EmptyState>
              <Spin size="large" />
            </EmptyState>
          ) : products.length > 0 ? (
            <ProductsGrid>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </ProductsGrid>
          ) : (
            <EmptyState>
              <p>Товары не найдены</p>
              <p>Добавьте первый товар с помощью формы справа</p>
            </EmptyState>
          )}
        </ProductsListSection>

        {/* Форма добавления товара */}
        <ProductFormSection>
          <FormCard>
            <FormTitle>
              {editingId ? 'Редактирование товара' : 'Добавление товара'}
            </FormTitle>

            {/* Загрузка изображения */}
            <ImageUploadWrapper>
              <label htmlFor="product-image">
                <ImagePreview>
                  {imagePreviewUrl ? (
                    <img src={imagePreviewUrl} alt="Превью" />
                  ) : (
                    <UploadPlaceholder>
                      <UploadOutlined />
                      <span>Нажмите для загрузки изображения</span>
                    </UploadPlaceholder>
                  )}
                </ImagePreview>
              </label>
              <input
                id="product-image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </ImageUploadWrapper>

            {/* Название */}
            <div style={{ marginBottom: 16 }}>
              <label
                style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}
              >
                Название товара
              </label>
              <Input
                placeholder="Введите название"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
              />
            </div>

            {/* Описание */}
            <div style={{ marginBottom: 16 }}>
              <label
                style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}
              >
                Описание
              </label>
              <TextArea
                placeholder="Введите описание товара"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  handleInputChange('description', e.target.value)
                }
              />
            </div>

            {/* Цена */}
            <div style={{ marginBottom: 16 }}>
              <label
                style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}
              >
                Цена (₽)
              </label>
              <InputNumber
                placeholder="0"
                min={0}
                style={{ width: '100%' }}
                value={formData.price}
                onChange={(value) => handleInputChange('price', value || 0)}
              />
            </div>

            {/* Цена со скидкой */}
            <div style={{ marginBottom: 16 }}>
              <label
                style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}
              >
                Цена со скидкой (₽){' '}
                <span style={{ color: '#999' }}>— необязательно</span>
              </label>
              <InputNumber
                placeholder="0"
                min={0}
                style={{ width: '100%' }}
                value={formData.priceDiscounted || undefined}
                onChange={(value) =>
                  handleInputChange('priceDiscounted', value || null)
                }
              />
            </div>

            {/* Кнопки */}
            <ButtonsRow>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleSubmit}
                loading={isSubmitting}
                block
              >
                {editingId ? 'Сохранить' : 'Добавить товар'}
              </Button>
              {editingId && (
                <Button onClick={resetForm} block>
                  Отмена
                </Button>
              )}
            </ButtonsRow>

            {/* Превью карточки */}
            <PreviewSection>
              <PreviewTitle>Предпросмотр карточки товара</PreviewTitle>
              <ProductCard
                product={previewProduct}
                imagePreviewUrl={imagePreviewUrl}
                isPreview
              />
            </PreviewSection>
          </FormCard>
        </ProductFormSection>
      </ContentWrapper>
    </PageWrapper>
  )
}

export default ProductsPage
