import './index.css'

const MenuItem = props => {
  const {name, isSelected, onChangeMenuCategory} = props
  const itemClassName = isSelected ? 'selected-menu' : 'menu-item'
  const onClickMenuItem = () => {
    onChangeMenuCategory(name)
  }

  return (
    <li>
      <button className={itemClassName} onClick={onClickMenuItem} type="button">
        {name}
      </button>
    </li>
  )
}

export default MenuItem
