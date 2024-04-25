import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import MenuItem from '../MenuItem'
import FoodItem from '../FoodItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Home = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [restaurantData, setRestaurantData] = useState({})
  const [selectedCategory, setSelectedCategory] = useState('')
  const [foodItems, setFoodItems] = useState({})

  useEffect(() => {
    const getRestaurantData = async () => {
      const apiUrl =
        'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
      const response = await fetch(apiUrl)
      const data = await response.json()
      if (response.ok) {
        const formattedTableMenuList = data[0].table_menu_list.map(each => ({
          menuCategory: each.menu_category,
          categoryId: each.menu_category_id,
          categoryDishes: each.category_dishes,
        }))
        const formattedData = {
          restaurantName: data[0].restaurant_name,
          tableMenuList: formattedTableMenuList,
        }

        const newObject = {}

        formattedData.tableMenuList.forEach(menuItem => {
          const {menuCategory, categoryDishes} = menuItem
          const formattedCategoryDishes = categoryDishes.map(eachDish => ({
            dishId: eachDish.dish_id,
            dishName: eachDish.dish_name,
            dishCurrency: eachDish.dish_currency,
            dishPrice: eachDish.dish_price,
            dishImage: eachDish.dish_image,
            dishCalories: eachDish.dish_calories,
            dishDescription: eachDish.dish_description,
            dishAvailability: eachDish.dish_Availability,
            dishType: eachDish.dish_Type,
            addonCat: eachDish.addonCat,
            quantity: 0,
          }))
          newObject[menuCategory] = formattedCategoryDishes
        })
        setRestaurantData(formattedData)
        setSelectedCategory(formattedData.tableMenuList[0].menuCategory)
        setFoodItems(newObject)
        setApiStatus(apiStatusConstants.success)
      }
    }
    getRestaurantData()
  }, [])

  const menuItems =
    restaurantData.tableMenuList !== undefined &&
    restaurantData.tableMenuList.map(each => each.menuCategory)

  const onChangeMenuCategory = name => {
    setSelectedCategory(name)
  }

  const onIncreaseQuantity = id => {
    const increasedQuantity = foodItems[selectedCategory].map(each => {
      if (each.dishId === id) {
        return {
          ...each,
          quantity: each.quantity + 1,
        }
      }
      return each
    })
    const updatedFoodItems = {...foodItems}
    updatedFoodItems[selectedCategory] = increasedQuantity
    setFoodItems(updatedFoodItems)
  }

  const onDecreaseQuantity = id => {
    const increasedQuantity = foodItems[selectedCategory].map(each => {
      if (each.dishId === id && each.quantity > 0) {
        return {
          ...each,
          quantity: each.quantity - 1,
        }
      }
      return each
    })
    const updatedFoodItems = {...foodItems}
    updatedFoodItems[selectedCategory] = increasedQuantity
    setFoodItems(updatedFoodItems)
  }

  return apiStatus === apiStatusConstants.initial ? (
    <div className="restaurant-app">
      <Loader type="TailSpin" color="#0284c7" height={50} width={50} />
    </div>
  ) : (
    <div className="food-app">
      <Header />
      <ul className="menu-list">
        {menuItems.map(eachItem => (
          <MenuItem
            key={eachItem}
            name={eachItem}
            isSelected={eachItem === selectedCategory}
            onChangeMenuCategory={onChangeMenuCategory}
          />
        ))}
      </ul>
      <ul className="food-items-list">
        {foodItems[selectedCategory].map(eachItem => (
          <FoodItem
            key={eachItem.dishId}
            data={eachItem}
            onIncreaseQuantity={onIncreaseQuantity}
            onDecreaseQuantity={onDecreaseQuantity}
          />
        ))}
      </ul>
    </div>
  )
}

export default Home
