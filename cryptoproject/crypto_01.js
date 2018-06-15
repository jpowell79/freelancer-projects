import React, { Component } from 'react';


import crypto_01_contract from '../ethereum/crypto_01_contract';



class Crypto_01_data extends Component {
  static async getInitialProps() {

    const admin = await crypto_01_contract.methods.admin().call();

    const thiscontractaddress = await crypto_01_contract.methods.thisContractAddress().call();

    const cryptoname = await crypto_01_contract.methods.cryptoname().call();

    const startrank = await crypto_01_contract.methods.startrank().call();

    const startprice = await crypto_01_contract.methods.startprice().call();

    const numberoftrades = await crypto_01_contract.methods.numberoftrades().call();

    const standardtimecloses = await crypto_01_contract.methods.standardtimecloses().call() / 1000000000000000000;

    const extendedtimecloses = await crypto_01_contract.methods.extendedtimecloses().call();

  

    return { 
      admin, 
      thiscontractaddress,
      cryptoname,
      startrank,
      startprice,
      numberoftrades,
      standardtimecloses,
      extendedtimecloses 
    };

  }



  render() {
    return <div>
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>

      Admin: {this.props.admin}
      <br />
      
      This Contract Address:
      {this.props.thiscontractaddress}
      <br />

      Crypto Name:
      {this.props.cryptoname}
      <br />

      Start Rank:
      {this.props.startrank}
      <br />

      Start Price:
      {this.props.startprice}
      <br />

      Number of Trades:
      {this.props.numberoftrades}
      <br />

      Standard Time Closes:
      {this.props.standardtimecloses}
      <br />

      Extended Time Closes:
      {this.props.extendedtimecloses}
      <br />


      </div>

      
  }
}

export default Crypto_01_data;
