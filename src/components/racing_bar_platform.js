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
        this.clear = this.clear.bind(this)
    }

    handleStockAddition(e) {
        e.preventDefault() 
        const ticker = this.state.ticker.toUpperCase()
        
        if (this.state.stock1 === "")  {
            this.setState({ stock1: ticker, ticker: "" }) 
        } else if (this.state.stock2 === "") {
            this.setState({ stock2: ticker, ticker: "" }) 
        } else if (this.state.stock3 === "") {
            this.setState({ stock3: ticker, ticker: "" }) 
        } else if (this.state.stock4 === "") {
            this.setState({ stock4: ticker, ticker: "" })
        } else if (this.state.stock5 === "") {
            this.setState({ stock5: ticker, ticker: "" })
        } else {
            window.alert("Cannot add any more stocks due to API call restrictions.")
        }       
    }
    
    handleClose(stockNum) {
        this.setState({ [stockNum]: "" })
    }

    handleRace(e) {
        e.preventDefault()
        this.setState({ render: true }) //setting the render to be true to render the racing-bar component 
    }

    clear(e) {
        //reset everything to its orignal values 
        e.preventDefault()
        this.setState({
            stock1: "",
            stock2: "",
            stock3: "",
            stock4: "",
            stock5:  "",
            iteration: 1,
            render: false,
            ticker: ""
        })
    }

    handleChange(e) {
        this.setState({ ticker: e.target.value })
    }


    render() {
        return (
            <div className='racing-platform'>
                <div className='warning'>
                    Hello, due to API call restrictions, users can only race stocks once per minute. Thanks!
                </div>
                <div className='input-div'>
                    <form className='racing-form'>
                        <input 
                            type="text" 
                            placeholder='Enter a stock to add to the race'
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
                    { this.state.render ? <button onClick={this.clear} className='begin-race-btn'>Clear</button> : <button onClick={this.handleRace} className='begin-race-btn'>Begin Race</button> }
                </div>
                {this.state.render ? <RacingBarContainer stock1={this.state.stock1} stock2={this.state.stock2} stock3={this.state.stock3} stock4={this.state.stock4} stock5={this.state.stock5} /> : ""} 
            </div>
        )
    }
}
