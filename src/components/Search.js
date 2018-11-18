import React ,{Component} from 'react';

class Search extends Component{

    constructor(){
        super();
        this.applyFilter = this.applyFilter.bind(this);
    }

    applyFilter(input, e) {
        this.props.changeHandler(input, e.target.value);
       // alert(input)
      }
    render(){
        let inputRender;
        if(this.props.inputType==='input_text'){
            inputRender = <div className="form-group">
            <label htmlFor={this.props.title}>{this.props.title}</label>
            <input onChange={(e) => this.applyFilter(this.props.title, e)} type="text" className="form-control"/>
        </div>
        }else{
            inputRender = <div> <label htmlFor={this.props.title}>{this.props.title}</label>
            <select onChange={(e) => this.applyFilter(this.props.title, e)} className="form-control">
            {(this.props.data).map((d, i)=> 
               <option key={d} value={d}>{d}</option>)}
         </select>
        </div>
        }

        return(
            <div className="col-sm-6 form-items">
            {inputRender}
            </div>

        )

    }
       
    
}

export default Search;