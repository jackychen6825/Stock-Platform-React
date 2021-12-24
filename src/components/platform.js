import React, { Component } from 'react'
import PriceHistoryChartContainer from './price_history_chart_container'
import EarningsContainer from './earnings_container'
import BalanceSheetContainer from './balance_sheet_container';
import OpenCloseContainer from './crypto/open_close_container'
import MarketCapContainer from './crypto/market_cap_container'
import VolumeChartContainer from './crypto/volume_container'
import FreeCashFlowContainer from './free_cash_flow_container'
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
    }

    onClick(e) {
        e.preventDefault()
        const ticker = document.getElementById('search-stock').value.toUpperCase()
        this.setState({ ticker, render: true })
    }

    handleSwitch(e) {
        e.preventDefault()
        if (this.state.assetClass === 'stock') {
            this.setState({ assetClass: 'crypto', render: false })
        } else if (this.state.assetClass === 'crypto') {
            this.setState({ assetClass: 'stock', render: false })
        }
    }

    render() {
        return (
            <div className='platform-container'>
                <div className='warning'>
                    Hello, due to API call restrictions, users can only search one stock / cryptocurrency per minute. Thanks!
                </div>
                <form className='stock-input-form'>
                    <div className='input-container'>
                        <div className='search-btns-container'>
                            <input type="text" placeholder={this.state.assetClass === 'stock' ? 'Enter a stock ticker' : 'Enter a cryptocurrency ticker'} id='search-stock' />
                            <button className="search-btn-2" onClick={this.onClick}><i className="fas fa-search fa-2x"></i></button>
                        </div>
                        <div className='switch-btn-container'> 
                            {this.state.assetClass === 'stock' ? <button className='switch-btn' onClick={this.handleSwitch}>Search Crypto</button> : <button className='switch-btn' onClick={this.handleSwitch}>Search Stock</button>}
                        </div>
                    </div>
                </form>
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
