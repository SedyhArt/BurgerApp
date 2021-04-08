import React from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICES = {
  bacon: 0.7,
  salad: 0.5,
  cheese: 0.6,
  meat: 1.5
}

class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      bacon: 0,
      salad: 0,
      cheese: 0,
      meat: 0,
    },
    totalyPrice: 4
  }

  addIngredientHander = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    const oldPrice = this.state.totalyPrice;
    const updatedPrice = oldPrice + INGREDIENTS_PRICES[type];
    this.setState({ totalyPrice: updatedPrice, ingredients: updatedIngredients })
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) return;
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    
    const oldPrice = this.state.totalyPrice;
    const updatedPrice = oldPrice - INGREDIENTS_PRICES[type];
    this.setState({ totalyPrice: updatedPrice, ingredients: updatedIngredients })
  };

  render() {

    const disabledInfo = {
      ...this.state.ingredients
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addingIngredient={this.addIngredientHander}
          removingIngredient={this.removeIngredientHandler}
          disabled={disabledInfo} 
          price={this.state.totalyPrice}
          />
      </Aux>
    );
  }
};

export default BurgerBuilder;