import React from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      bacon: 0,
      salad: 0,
      cheese: 0,
      meat: 0,
    }
  }
  render() {
    return(
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <div>Build Controls</div>
      </Aux>
    );
  }
};

export default BurgerBuilder;