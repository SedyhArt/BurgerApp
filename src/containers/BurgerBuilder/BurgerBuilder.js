import React from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
    totalyPrice: 4,
    purchaseble: false,
    purchasing: false
  };

  updatePurchasebleState(ingredients) {
    let ingredientsQuant = Object.values(ingredients);
    const sum = ingredientsQuant.reduce((sum, el) => {
      return sum + el;
    }, 0);
    console.log(sum);
    this.setState({purchaseble: sum > 0});
    
    // let ingredients = this.state.ingredients;
    // let quntIngd = Object.values(ingredients).reduce((sum, val) => {
    //   return sum + val
    // }, 0);
    // console.log(quntIngd)
    // quntIngd < 1 ? this.setState({purchaseble: true}) : this.setState({purchaseble: false})
    
  };

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
    this.updatePurchasebleState(updatedIngredients)
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
    this.setState({ totalyPrice: updatedPrice, ingredients: updatedIngredients });
    this.updatePurchasebleState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({purchasing: true});
    console.log('click')
  }

  render() {

    const disabledInfo = {
      ...this.state.ingredients
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
      <Modal show={this.state.purchasing}>
        <OrderSummary ingredients={this.state.ingredients} />
      </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addingIngredient={this.addIngredientHander}
          removingIngredient={this.removeIngredientHandler}
          disabled={disabledInfo} 
          price={this.state.totalyPrice}
          purchaseble={!this.state.purchaseble}
          order={this.purchaseHandler}
          />
      </Aux>
    );
  }
};

export default BurgerBuilder;