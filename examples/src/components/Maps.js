import React from 'react';
import GoogleMapApis,{Map} from '../../src/index'

class Maps extends React.Component {
  render() {
    return(
      <Map loadMap={this.props.google} />
    )
  }
}
export default GoogleMapApis({
  apiKey: "AIzaSyCSCbulYm8QiWP4eyenqB9FxNa4wXsyArM"
})(Maps)