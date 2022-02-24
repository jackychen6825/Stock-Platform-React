export default function gdpReducer(state = {}, action) { //export this function --
    //we never want to alter the current state, just replace it so 
    Object.freeze(state);
    //however we might make a replacement based off the curr state so 
    let nextState = state; //we can then  make alterations to next state

    //now we can use the switch statement 
    switch (action.type) { //we are switching on action.type per usual 
        case 'GDP':
            //once we have the GDP data we will simply dispatch that payload to the redux store using type="GDP" and payload
            return action.payload; //action.payload will be the parsed gdp information 
            break;  //then we break and end 
    
        default: //if the user sends an action that doesnt correspond with any case, simply return the current state 
            return state;
    }
    //in this case, we dont make use of next state
}