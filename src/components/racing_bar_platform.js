import React, { Component } from 'react'
import RacingBarContainer from './racing-bar-container'
import Timestamp from './timestamp'

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
        this.returnHome = this.returnHome.bind(this)
        this.generateInstructionsFromState = this.generateInstructionsFromState.bind(this)
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

    returnHome(e) {
        e.preventDefault()
        this.props.history.push("/")
    }

    componentDidMount() {
        // window.alert("The bonus feature is a racing bar chart that races based on the percentage of over/under performing market estimates of quarterly earnings for the last year")
    }

    generateInstructionsFromState() {
        if (!this.state.render) {
            return(
                <div className='instructions-explanation-container'>
                    <div className='instructions-container-bonus'>
                            <div className='instructions-header-2'>Instructions: </div> 
                            <div>1. Warning: Users can only race up to five stocks at a time </div> 
                            <div>2. Enter stock ticker and press the "Add Stock" button to enter stock  the race </div> 
                            <div>3. Remove any stock from the race by pressing the red X adjoining each stock </div> 
                    </div>
                    <div className='explanations-container'>
                            <div className='instructions-header-2'>Explanation: </div> 
                            <div>1. The race will be displayed in a racing bar chart </div> 
                            <div>2. Each stock is racing based on its reported and estiamted earnings as a percentage </div> 
                            <div>3. The chart will cover 20 quaters (5 years) of data for each stock </div> 
                            <div>4. Each stock's position in the race is a function of its earnings performance relative to others </div> 
                            <div>5. The highest performing stock of each quarter will be at the bottom </div> 
                    </div>
                </div>
            )
        } 
    }

    render() {
        return (
            <div className='racing-platform'>
                 <div className='about-me-bonus'>
                    <a href="https://www.linkedin.com/in/jacky-chen6825/"><i class="fab fa-linkedin fa-2x"></i></a>
                    <a href="https://github.com/jackychen6825"><i class="fab fa-github-alt fa-2x"></i></a>
                    <a href="https://angel.co/u/jacky-chen-33"><i class="fab fa-angellist fa-2x"></i></a>
                </div>
                <div className='warning'>
                    Due to API restrictions, users can only race once per minute. 
                </div>
                <div className='input-div'>
                    <form className='racing-form'>
                        <input 
                            type="text" 
                            placeholder='Enter a stock ticker to add to the race'
                            id='racing-input'
                            value={this.state.ticker}
                            onChange={this.handleChange}
                        />
                        <button onClick={this.handleStockAddition} className='racing-form-btn'>Add Stock</button>
                    </form>
                    <div>
                        <button onClick={this.returnHome} className='racing-form-btn-home' >Return Home</button>
                    </div>
                </div>
                {this.generateInstructionsFromState()}
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
                {this.state.render ? <Timestamp /> : ""} 
            </div>
        )
    }
}
