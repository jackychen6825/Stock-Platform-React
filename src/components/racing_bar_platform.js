import React, { Component } from 'react'
import RacingBarContainer from './racing-bar-container'

export default class RacingBarPlatform extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stock1: "",
            stock2: "",
            stock3: "",
            stock4: "",
            stock5:  "",
            iteration: 1,
            render: false,
            ticker: ""
        }

        this.handleStockAddition = this.handleStockAddition.bind(this);
        this.handleRace = this.handleRace.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleStockAddition(e) {
        e.preventDefault()
        const ticker = document.getElementById('racing-input').value.toUpperCase()
        
        if (this.state.iteration === 1) {
            this.setState({ stock1: ticker, iteration: 2, ticker: "" })
        } else if (this.state.iteration === 2) {
            this.setState({ stock2: ticker, iteration: 3, ticker: "" })
        } else if (this.state.iteration === 3) {
            this.setState({ stock3: ticker, iteration: 4, ticker: "" })
        } else if (this.state.iteration === 4) {
            this.setState({ stock4: ticker, iteration: 5, ticker: "" })
        } else if (this.state.iteration === 5) {
            this.setState({ stock5: ticker, iteration: 6, ticker: "" }) 
        } else {
            window.alert("Due to API restrictions, we can only race five stocks per minute")
        }
       
    }

    handleRace(e) {
        e.preventDefault()
        this.setState({ render: true })
    }

    handleChange(e) {
        this.setState({ ticker: e.target.value })
    }

    handleClose(stockNum) {
        this.setState({ [stockNum]: "", iteration: this.state.iteration - 1 })
    }

    render() {
        return (
            <div className='racing-platform'>
                <div className='warning'>
                    Hello, due to API call restrictions, users can only search one stock / cryptocurrency per minute. Thanks!
                </div>
                <div className='input-div'>
                    <form className='racing-form'>
                        <input 
                            type="text" 
                            placeholder='Enter stock tickers'
                            id='racing-input'
                            value={this.state.ticker}
                            onChange={this.handleChange}
                        />
                        <button onClick={this.handleStockAddition} className='racing-form-btn'>Add Stock</button>
                    </form>
                </div>
                <div className='stocks-display-container'>
                    {this.state.stock1 ? <div className='stock-text'>{this.state.stock1}<div onClick={() => this.handleClose("stock1")} className='close-x'>X</div></div> : ""}
                    {this.state.stock2 ? <div className='stock-text'>{this.state.stock2}<div onClick={() => this.handleClose("stock2")} className='close-x'>X</div></div> : ""}
                    {this.state.stock3 ? <div className='stock-text'>{this.state.stock3}<div onClick={() => this.handleClose("stock3")} className='close-x'>X</div></div> : ""}
                    {this.state.stock4 ? <div className='stock-text'>{this.state.stock4}<div onClick={() => this.handleClose("stock4")} className='close-x'>X</div></div> : ""}
                    {this.state.stock5 ? <div className='stock-text'>{this.state.stock5}<div onClick={() => this.handleClose("stock5")} className='close-x'>X</div></div> : ""}
                </div>
                <div className='begin-race-btn-container'>
                    <button onClick={this.handleRace} className='begin-race-btn'>Begin Race</button>
                </div>
                {this.state.render ? <RacingBarContainer stock1={this.state.stock1} stock2={this.state.stock2} stock3={this.state.stock3} stock4={this.state.stock4} stock5={this.state.stock5} /> : ""} 
            </div>
        )
    }
}
