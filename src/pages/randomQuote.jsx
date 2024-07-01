import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import colorList from '../assets/colors'
import { configureStore } from '@reduxjs/toolkit'
import './styles.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'


/** 
 * THIS PROJECT USES REACT, REDUX, BOOTSTRAP, BEM
*/


//  returns random index for BG color
const colorIndex = () => {
  let index = Math.floor(Math.random() * colorList.length);
  return index;
}


// REACT
/**  Main page layout Component */
const Page = () => {
    // useSelector HOOK
    const bgColor = useSelector((reduxState) => reduxState.color)
    return  <div className='container-md page-full ' style={{backgroundColor: bgColor}}> 
                <QuoteBox />
            </div>
}


/**  Quote Box Component */
const QuoteBox = () => {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');

    const bgColor = useSelector((state)=>state.color);
    const flip = useSelector((state)=>state.flip);
    const dispatch = useDispatch();

    /** update the quote on each flip change of reduxState */
    useEffect(() => {
        updateQuote()}, [flip]);//updateQuote()}, [reduxState.flip]);

    /** update local state quote from API */
    async function updateQuote(){
        let url = "https://type.fit/api/quotes";

        let response;
        let responseText;
        let responseObj;

        try {
            response = await fetch(url, {
                method: 'GET',
                headers: {  
                    'Content-Type': 'application/json'}
                });

            responseText = await response.text();
            responseObj = JSON.parse(responseText);
        }
        catch {
            setQuote('API Error');
            setAuthor('');
        }

        const index = Math.floor(Math.random() * responseObj.length);

        setQuote(responseObj[index]['text']);
        const authortmp = responseObj[index]['author'].split(',');

        setAuthor(authortmp[0]);
    }

    return(
        <section id="quote-box" style={{ backgroundColor: 'white'}}> 
            <div className='' style={{ backgroundColor: bgColor }}>
                <div id="text">{quote}</div>
                <div id="author">{author}</div>
                <footer>
                   <a id="tweet-quote" data-size="large" href={"https://twitter.com/intent/tweet?text="+encodeURIComponent(quote)}>Tweet</a>
                   <button id="new-quote" className='btn btn-outline-primary' onClick={()=>dispatch({ type: NEXT })}>Next Quote</button>
                </footer>                

            </div>
        </section>
    )
}




// REDUX
/** declare action type */
const NEXT='NEXT';


/** reducers */
const nextReducer = (state={color: colorList[colorIndex()], flip:true}, action) => {
  if (action.type === NEXT){
      return {color: colorList[colorIndex()], flip:!state.flip};
  }
  else {
      return state
  }
};


/* create store */
//const store = Redux.createStore(nextReducer);
const store = configureStore({
  reducer: nextReducer
})

store.subscribe(() => {
  console.log('storeState :')
  console.log(store.getState());
});


//const Provider = ReactRedux.Provider;

/* wrapper for Provider, Provider imported */
class RandomQuote extends React.Component {
  render(){
      return (
          <Provider store={store}>
              <Page />
          </Provider>
      )}
}

export default RandomQuote






// https://stackoverflow.com/questions/71648776/cant-connect-redux-store-to-functional-component-screen
// https://reactnavigation.org/docs/redux-integration/

// use selector?
// https://builtin.com/software-engineering-perspectives/useselector-usedispatch-react-redux