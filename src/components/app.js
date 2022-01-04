import React from 'react'
import { Switch, Route} from 'react-router-dom'
import PlatformContainer from './platform_container';
import RacingBarPlatform from './racing_bar_platform';

const App = () => (
    <Switch>
        <Route exact path="/" component={PlatformContainer} />
        <Route exact path="/racing" component={RacingBarPlatform} />
    </Switch>
)

export default App;