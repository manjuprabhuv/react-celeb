import React, {Component} from 'react';

class Header extends Component{

   /* constructor(props){
        super(props);
    }*/

    render(){
        return(
         <div>
            <h1>{this.props.pageTitleH1}</h1>
            <h2>{this.props.pageTitleH2}</h2>
            <p>{this.props.desciption}</p>
            <p>Reference: <a href={this.props.link} rel="noopener noreferrer" target='_blank'>{this.props.link}</a></p>
         </div>
        )
    }
}

export default Header;