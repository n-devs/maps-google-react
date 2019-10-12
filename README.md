# Google Map React Component Tutorial 

## Quickstart

First, install the library:

```shell
npm install --save maps-google-react
```

or

```shell
yarn add maps-google-react
```

## Automatically Lazy-loading Google API

The library includes a helper to wrap around the Google maps API. The `ConnectApiMaps` Higher-Order component accepts a configuration object which *must* include an `apiKey`. See [lib/ConnectApi.js](https://github.com/n-psk/maps-google-react/blob/master/src/lib/ConnectApi.js#L4) for all options it accepts.

```javascript
import ConnectApiMaps from 'maps-google-react';

// ...

export class MapContainer extends React.Component {}

export default ConnectApiMaps({
  apiKey: (YOUR_GOOGLE_API_KEY_GOES_HERE)
})(MapContainer)
```

Alternatively, the `ConnectApiMaps` Higher-Order component can be configured by passing a function that will be called with whe wrapped component's `props` and should returned the configuration object.

```javascript
export default ConnectApiMaps(
  (props) => ({
    apiKey: props.apiKey,
    language: props.language,
  }
))(MapContainer)
```

If you want to add a loading container _other than the default_ loading container, simply pass it in the HOC, like so:

```javascript
const LoadingContainer = (props) => (
  <div>Fancy loading container!</div>
)

export default ConnectApiMaps({
  apiKey: (YOUR_GOOGLE_API_KEY_GOES_HERE),
  LoadingContainer: LoadingContainer
})(MapContainer)
```

## Sample Usage With Lazy-loading Google API:

```javascript
import ConnectApiMaps,{Map} from 'maps-google-react';

export class MapContainer extends Component {
  render() {
    return (
      <Map 
      google={this.props.google} 
      mapOptions={{
                        zoom: 15,
                        center: { lat: 14.013235199999999, lng: 100.6985216 },
                        disableDefaultUI: true,
                        styles: [{
                            featureType: 'poi.business',
                            stylers: [{ visibility: 'on' }]
                        },
                        {
                            featureType: 'transit',
                            elementType: 'labels.icon',
                            stylers: [{ visibility: 'off' }]
                        }]
                    }}>
      </Map>
    );
  }
}

export default ConnectApiMaps({
  apiKey: (YOUR_GOOGLE_API_KEY_GOES_HERE),
})(MapContainer)
```

## License
 [MIT](/LICENSE)