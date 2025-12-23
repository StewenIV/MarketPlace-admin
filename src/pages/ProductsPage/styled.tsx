import styled from 'styled-components'

export const PageWrapper = styled.div`
  padding: 20px;
`

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`

export const PageTitle = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
`

export const ContentWrapper = styled.div`
  display: flex;
  gap: 24px;
`

export const ProductsListSection = styled.div`
  flex: 1;
  min-width: 0;
`

export const ProductFormSection = styled.div`
  width: 400px;
  flex-shrink: 0;
`

export const FormCard = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

export const FormTitle = styled.h3`
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
`

export const PreviewSection = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e8e8e8;
`

export const PreviewTitle = styled.h4`
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  color: #666;
`

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
`

export const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #999;
  background: #fafafa;
  border-radius: 8px;
`

export const ImageUploadWrapper = styled.div`
  margin-bottom: 16px;
`

export const ImagePreview = styled.div`
  width: 100%;
  height: 150px;
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.3s;

  &:hover {
    border-color: #3498db;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`

export const UploadPlaceholder = styled.div`
  text-align: center;
  color: #999;

  .anticon {
    font-size: 32px;
    margin-bottom: 8px;
    display: block;
  }
`

export const ButtonsRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`
