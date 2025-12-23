import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { Wrapper } from './styled'

// Заменяем any на интерфейс для лучшей типизации
interface HeadingProps {
  backLink: string
  children: React.ReactNode
}

const HeadingWithBackBtn: React.FC<HeadingProps> = (props) => (
  <Wrapper>
    <Link to={props.backLink}>
      {/* В antd 5+ используем свойство ghost как булево значение */}
      <Button type="default" ghost>
        &laquo;
      </Button>
    </Link>

    {props.children}
  </Wrapper>
)

export default HeadingWithBackBtn
