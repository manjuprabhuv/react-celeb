import React, {Component} from 'react';
import data from '../data/celebrityRichList.json';
import Header from '../components/Header'
import Search from '../components/Search'
import AppConstants from '../components/utils/AppConstants'
import { getUniqueCountries,filterAlphabetic } from '../components/utils/AppUtils'
import SearchResults from '../components/SearchResults'

class AppLayout extends Component{

    

    constructor(props){
       
        super(props);
        this.initData();
        this.state = {searchResult : [],currency:AppConstants.USD};
        this.searchFilter = {birthPlace: 'Show All', currencyConvertor: 'US dollar', search: '', orderBy: 'Rank'};
       // this.filterResults=this.filterResults.bind(this);
    }

    //switch searchFilter
    setSearchFilter(input, criteria){
        switch(input){
            case 'Currency Convertor': 
                this.searchFilter.currencyConvertor = criteria;
                this.setState({
                    currency:criteria
                });
                break;
            case 'Birthplace': 
                this.searchFilter.birthPlace = criteria;
                break;
            case 'Order By': 
                this.searchFilter.orderBy = criteria;
                break;
            case 'Search':
                this.searchFilter.search = criteria;
        }
    }

    filterResults(input,criteria){
        console.log(this.state)

       
        console.log('filterResults called')
        this.setSearchFilter(input,criteria)
        var clist = this.celebrityList.map(a => Object.assign({}, a));
        var result;
        console.log(clist);


        //Currency Convertor
        //Currency Convertor
        var convertor = this.currencyVal[this.searchFilter.currencyConvertor];
        for (let i=0, l= clist.length; i < l; i++) {
            clist[i]['netWorth'] = Math.round(clist[i]['netWorth'] / convertor);
        }
               result = clist;

        let value = this.searchFilter.orderBy.toLowerCase();
        console.log('value');
        console.log(value);
        switch(value){
            case 'name':
                result = clist.sort(filterAlphabetic);
                break;
            //case 'age':
            default:
                result = clist.sort((x, y) => x[value] - y[value]);
        }

        //search text field 
        clist = clist.filter((clist) => clist.rank.toString().indexOf(this.searchFilter.search) > -1 ||
            clist.name.toLowerCase().indexOf(this.searchFilter.search.toLowerCase()) > -1 ||
            clist.netWorth.toString().indexOf(this.searchFilter.search) > -1 ||
            clist.age.indexOf(this.searchFilter.search) > -1 ||
            clist.country.toLowerCase().indexOf(this.searchFilter.search.toLowerCase()) > -1);
        

        //filter birthplace
        result = this.searchFilter.birthPlace!=='Show All' ? 
        clist.filter((clist) => clist.country === this.searchFilter.birthPlace) :
        clist;

        
        
        this.setState(({
            searchResult: result           
        }));

        //console.log(this.state.searchResult);
       
    }

    componentDidMount(){        
      //  this.initData();
      this.setState({
        searchResult: this.celebrityList
    })
    
    
    }

   async initData(){
        //1.Fetch the response from server 
        //use mock.
        //const response = await fetch('http://localhost:4000/');
        //const {data} = await response.json();
        //console.log(data); 
        //console.log(AppConstants.USD)
        //2. initialize Form Input
        const USD = AppConstants.USD;
        const AUD = AppConstants.AUD;
        const EURO= AppConstants.EURO;
        this.formInputs = [
            {inputType:'select',label: 'Birthplace', data:  getUniqueCountries(data.celebrityList, 'Show All')}, 
            {inputType:'select',label:'Currency Convertor', data:[USD,EURO,AUD]}, 
            {inputType:'input_text',label:'Search'}, 
            {inputType:'select',label:'Order By', data:['Rank', 'Name', 'Age']}];
      
        //3. Initialize currency 
       
        this.currencyVal = {'US Dollar': data.usDollarValue, 'Euro' : data.euroValue, 'Australian Dollar' : data.australianDollarValue};
        this.celebrityList = data.celebrityList;            
        //this.searchResult = data.celebrityList;
        

    }



    render(){
       // initData();
        return(
          <div className='container jumbotron text-center'>
            
            <Header pageTitleH1={data.pageTitleH1} pageTitleH2={data.pageTitleH2} description={data.description} link={data.referenceLink}/>
            <div className="row" >
            <div className='jumbotron col-sm-10 col-sm-offset-1'>
	             {
                     (this.formInputs).map((item, index)=> 
                        <Search key={item.label} title={item.label} inputType={item.inputType} data={item.data} changeHandler={(input, criteria) => this.filterResults(input, criteria) }/>
                        )
                }
            </div>
            </div>
           
            <div className="row  col-sm-10 col-sm-offset-1" >
            {
               this.state.searchResult.length ?
		    	(this.state.searchResult).map((item, index)=> 
		    	<SearchResults key={item.rank} rank={item.rank} name={item.name} currency={this.state.currency} networth={item.netWorth} age={item.age} country={item.country}/> ): 
		    	<div className='panel panel-primary'>
			        <div className="panel-heading"><strong>No Results Found</strong></div>
			    </div>
		    }
		    
        </div>
 
            
            
          </div>
        )
    }
}

export default AppLayout;