import React, {Component} from 'react';
import { currencyFormater } from './utils/AppUtils'

class SearchResults extends Component{
   
    render(){
        
        //format networth       
        let formatedNetworth = currencyFormater(this.props.networth, this.props.currency);
        return (
            <div className="panel panel-primary">
              <div className="panel-heading"><strong>No: {this.props.rank}</strong></div>
              <h3>{this.props.name}</h3>
              <h5>Net Worth: <strong>{formatedNetworth}</strong></h5>
              <p>Age: {this.props.age}</p>
              <p>Country of Birth: <strong>{this.props.country}</strong></p>
            </div>
          )
    }
}

export default SearchResults;