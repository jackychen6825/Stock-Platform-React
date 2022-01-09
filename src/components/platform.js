import React, { Component } from 'react'
import PriceHistoryChartContainer from './price_history_chart_container'
import EarningsContainer from './earnings_container'
import BalanceSheetContainer from './balance_sheet_container';
import OpenCloseContainer from './crypto/open_close_container'
import MarketCapContainer from './crypto/market_cap_container'
import VolumeChartContainer from './crypto/volume_container'
import FreeCashFlowContainer from './free_cash_flow_container'
import OverviewContainer from './overview';
import './platform.css'

export default class Platform extends Component {
    constructor(props) {
        super(props)
        this.state = {
            render: false,
            assetClass: 'stock',
            ticker: ''
        }
        this.onClick = this.onClick.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.handleSwitchToRace = this.handleSwitchToRace.bind(this);
        this.generateInstructionsFromState = this.generateInstructionsFromState.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onClick(e) {
        e.preventDefault()
        const ticker = document.getElementById('search-stock').value.toUpperCase()
        this.setState({ ticker, render: true, instructions: false })
    }

    handleChange(e) {
        this.setState({ ticker: e.target.value })
    }

    handleSwitch(e) {
        e.preventDefault()
        if (this.state.assetClass === 'stock') {
            this.setState({ assetClass: 'crypto', render: false, ticker: "" })
        } else if (this.state.assetClass === 'crypto') {
            this.setState({ assetClass: 'stock', render: false, ticker: "" })
        }
    }

    handleSwitchToRace(e) {
        e.preventDefault()
        this.props.history.push("/racing") //render the racing component
    }

    generateInstructionsFromState() {
        if (this.state.assetClass === 'stock' && !this.state.render) {
            return(
                <div className='instructions-container'>
                        <div className='instructions-header'>Enter stock ticker and press the search icon to get information regarding the stock's: </div> 
                        <div>1. Past 100 days opening and closing prices </div> 
                        <div>2. Reported and estimated earnings per share </div> 
                        <div>3. Free cash flow calculations </div> 
                        <div>4. Balance sheet distribution </div> 
                </div>
            )
        } else if (this.state.assetClass === 'crypto' && !this.state.render) {
            return(
                <div className='instructions-container'>
                        <div className='instructions-header'>Enter crypto ticker and press the search icon to get information concerning:</div>
                        <div>1. Past 100 days opening and closing prices </div>
                        <div>2. Market Capitalizations</div>
                        <div>3. Volumes</div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className='platform-container'>
                <div className='about-me'>
                    <a href="https://www.linkedin.com/in/jacky-chen6825/"><i className="fab fa-linkedin fa-2x"></i></a>
                    <a href="https://github.com/jackychen6825"><i className="fab fa-github-alt fa-2x"></i></a>
                    <a href="https://angel.co/u/jacky-chen-33"><i className="fab fa-angellist fa-2x"></i></a>
                </div>
                <div className='warning'>
                    Hello, due to API  restrictions, users must wait one minute between searchs and races. Thanks!
                </div>
                <form className='stock-input-form'>
                    <div className='input-container'>
                        <div className='search-btns-container'>
                            <input 
                                type="text" 
                                placeholder={this.state.assetClass === 'stock' ? 'Enter a stock ticker' : 'Enter a cryptocurrency ticker'}
                                id='search-stock'
                                value={this.state.ticker}
                                onChange={this.handleChange}
                                />
                            <button className="search-btn-2" onClick={this.onClick}><i className="fas fa-search fa-2x"></i></button>
                        </div>

                        <div className='switch-btn-container'> 
                            {this.state.assetClass === 'stock' ? <button className='switch-btn' onClick={this.handleSwitch}>Search Crypto</button> : <button className='switch-btn' onClick={this.handleSwitch}>Search Stock</button>}
                            <button onClick={this.handleSwitchToRace} className='switch-racing-btn'>Bonus</button>
                        </div>
                    </div>
                </form>
                {this.generateInstructionsFromState()}

                {this.state.render && this.state.assetClass === 'stock' ? <OverviewContainer ticker={this.state.ticker} /> : "" }
                {this.state.render && this.state.assetClass === 'stock' ? <PriceHistoryChartContainer ticker={this.state.ticker} /> : "" }
                {this.state.render && this.state.assetClass === 'stock' ? <EarningsContainer ticker={this.state.ticker} /> : "" }
                {this.state.render && this.state.assetClass === 'stock' ? <FreeCashFlowContainer ticker={this.state.ticker} /> : "" }
                {this.state.render && this.state.assetClass === 'stock' ? <BalanceSheetContainer ticker={this.state.ticker} /> : "" }
                {this.state.render && this.state.assetClass === 'crypto' ? <OpenCloseContainer ticker={this.state.ticker} /> : "" }
                {this.state.render && this.state.assetClass === 'crypto' ? <MarketCapContainer ticker={this.state.ticker} /> : "" }
                {this.state.render && this.state.assetClass === 'crypto' ? <VolumeChartContainer ticker={this.state.ticker} /> : "" }
            </div>
        )
    }
}
