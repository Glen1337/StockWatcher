import React from 'react';
import BackButton from '../components/BackButton'


const AboutPage =(props) =>{
  return(
    <div>
      <BackButton />
      <br />
      <p>
        StockWatcher is an app that allows you to use technical and fundamental analysis to
        analyze stocks and determine what ones will appreciate in value.
      </p>
      <p>
        Once you determine which stocks you want to 'buy', you can add them to a portfolio to easily
        check back on the stock price in the future. This allows you to reflect back on your reasoning
         and decision to buy the stock.
      </p>
      <p>
         After using this process repeatedly over time, you will gradually become comfortable with
         recognizing familiar patterns by reflecting back on past purchases, and seeing the results of
         stock fundamentals and technical indicators and your interpretation of them.
      </p>
    </div>
  )
}
 export default AboutPage
