import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  padding: 15px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

export const Image = styled.img`
  margin-bottom: 10px;
  width: 100%;
  height: 165px;
  border-radius: 4px;
  object-fit: scale-down;
  background: #f5f5f5;
`

export const ImagePlaceholder = styled.div`
  margin-bottom: 10px;
  width: 100%;
  height: 165px;
  border-radius: 4px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 14px;
`

export const PriceWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
`

export const PriceRegular = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-right: 10px;
  color: #3498db;
`

export const PriceRegularWhenDiscounted = styled.div`
  text-decoration: line-through;
  color: #999999;
  font-size: 15px;
`

export const PriceDiscounted = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-right: 10px;
  color: #3498db;
`

export const Title = styled.h3`
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 600;
  color: #333;

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: #3498db;
    }
  }
`

export const Desc = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

export const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
`

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`
