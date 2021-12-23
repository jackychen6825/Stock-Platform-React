import React from 'react'
import { Switch, Route} from 'react-router-dom'
import PlatformContainer from './platform_container';
const App = () => (
    <Switch>
        <Route exact path="/" component={PlatformContainer} />
    </Switch>
)

export default App;