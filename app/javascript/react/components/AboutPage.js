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
      <br />
      <div className="row" style={{height: '80vh'}}>
        <div className="small-7 medium-7 large-7 columns small-centered medium-centered large-centered">
          <h3>
            StockWatcher is an application that allows you to use technical and fundamental analysis to
            analyze stocks and buy ones that you think will appreciate in value.
            Once you determine which stocks you want to buy, you can add them to an existing portfolio
            or create a new portfolio to add them to.
          </h3>
          <br />
          <h3>
            Later on, you can check your portfolios
            to see how correct your stock price predicitons were. By reflecting back on your reasoning
            process to buy each stock, you will begin to recognize familiar patterns over time. This will
            allow you to fine-tune your stock analyizing strategies and interpretations of different indicators
          </h3>
          <br />
          <h3>
            Each account starts off with a value of $10,000.
          </h3>

        </div>
      </div>
    </div>
  )
}
 export default AboutPage
