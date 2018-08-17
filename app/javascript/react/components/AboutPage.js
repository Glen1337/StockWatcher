import React from 'react';
import BackButton from '../components/BackButton'


const AboutPage =(props) =>{
  return(
    <div className="about">
      <div className="back row">
      <br />
        <BackButton />
      </div>
      <br />
      <div className="row" style={{height: '80vh'}}>
        <div className="small-9 medium-9 large-9 columns small-centered medium-centered large-centered">

          <h3>
            StockWatcher is an application that allows you to use technical and fundamental analysis to
            analyze stocks and pick ones that you think will appreciate in value.
          </h3>


          <h3>
            Once you determine which stocks you want to track, you can add them to a portfolio to easily
            check on the stock price later on in the future. This allows you to reflect back on your reasoning
            and decision to buy the stock.
          </h3>


          <h3>
           After using this process repeatedly over time, you will gradually become comfortable with
           recognizing familiar patterns by reflecting back on past purchases, and seeing the results of
           fundamentals and technical indicators and your interpretation of them.
          </h3>

        </div>
      </div>
    </div>
  )
}
 export default AboutPage
