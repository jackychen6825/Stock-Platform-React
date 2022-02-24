import React from 'react'
import { Switch, Route} from 'react-router-dom'
import PlatformContainer from './platform_container';
import RacingBarPlatform from './racing_bar_platform';
import EconomicPlatform from './economic_indicators/economic_platform'

const App = () => (
    <Switch>
        <Route exact path="/" component={PlatformContainer} />
        <Route exact path="/racing" component={RacingBarPlatform} />
        <Route exact path="/economics" component={EconomicPlatform} />
    </Switch>
)

export default App;