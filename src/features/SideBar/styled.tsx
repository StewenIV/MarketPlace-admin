import styled from 'styled-components'
import { Layout } from 'antd'

import { Z_INDEX_LEVEL_4 } from 'consts'

export const Wrapper = styled((props) => (
  <Layout.Sider {...props}>{props.children}</Layout.Sider>
))`
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  border-right: 1px solid #f0f0f0;
  z-index: ${Z_INDEX_LEVEL_4};

  /* Переопределяем CSS-переменные Ant Design */
  --ant-layout-sider-bg: #ffffff !important;
  --ant-layout-trigger-bg: #ffffff !important;
  --ant-layout-trigger-color: rgba(0, 0, 0, 0.88) !important;

  background: #ffffff !important;

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    background: #ffffff;
  }

  .ant-layout-sider-trigger {
    border-right: 1px solid #f0f0f0;
    background: #ffffff !important;
    color: rgba(0, 0, 0, 0.88) !important;
  }

  .anticon {
    font-size: 20px;
  }

  /* Переопределяем цвета меню Ant Design */
  .ant-menu-item-selected {
    background-color: #f5f5f5 !important;
    color: #000 !important;
  }

  .ant-menu-item-selected a,
  .ant-menu-item-selected .anticon {
    color: #000 !important;
  }

  .ant-menu-item:hover {
    color: #000 !important;
  }

  .ant-menu-item a:hover {
    color: #000 !important;
  }
`

export const Logo = styled.img`
  margin: 16px 20px;
  max-width: 160px;
  max-height: 50px;
  object-fit: contain;
`

export const AdminName = styled.div`
  padding: 5px 0;
  margin: 0 16px 10px 24px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-left: none;
  border-right: none;
`

export const ListContainer = styled.div`
  overflow: auto;
  max-height: calc(100vh - 172px);
`
