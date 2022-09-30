import { LightningElement,track,wire } from 'lwc';
import fetchingforLightning from '@salesforce/apex/UniversitiesController.fetchingforLightning';

const tablecolumns = [
    {label: 'University Name', fieldName: 'name', type: 'text'},
    {label: 'Websites', fieldName: 'customDomains', type: 'url'},
    {label: 'Country', fieldName: 'country', type: 'text'},
    {label: 'State', fieldName: 'state_province', type: 'text'}
];

var dummydata = [
    {"web_pages":["https://www.cstj.qc.ca","https://ccmt.cstj.qc.ca","https://ccml.cstj.qc.ca"],"state_province":null,"name":"Cégep de Saint_Jérôme","domains":["cstj.qc.ca"],"customDomains":"https://www.cstj.qc.ca","country":"Canada","alpha_two_code":"CA"},
    {"web_pages":["https://www.lambtoncollege.ca"],"state_province":"Sarnia","name":"Lambton College","domains":["lambtoncollege.ca","mylambton.ca"],"customDomains":"https://www.lambtoncollege.ca","country":"Canada","alpha_two_code":"CA"},
    {"web_pages":["http://www.acadiau.ca/"],"state_province":null,"name":"Acadia University","domains":["acadiau.ca"],"customDomains":"http://www.acadiau.ca/","country":"Canada","alpha_two_code":"CA"},
    {"web_pages":["http://www.algonquincollege.com/"],"state_province":null,"name":"Algonquin College","domains":["algonquincollege.com"],"customDomains":"http://www.algonquincollege.com/","country":"Canada","alpha_two_code":"CA"},
    {"web_pages":["http://www.ashtoncollege.com/"],"state_province":null,"name":"Ashton College","domains":["ashtoncollege.com"],"customDomains":"http://www.ashtoncollege.com/","country":"Canada","alpha_two_code":"CA"},
    {"web_pages":["http://www.assumptionu.ca/"],"state_province":null,"name":"Assumption University","domains":["assumptionu.ca"],"customDomains":"http://www.assumptionu.ca/","country":"Canada","alpha_two_code":"CA"},
    {"web_pages":["http://www.athabascau.ca/"],"state_province":null,"name":"Athabasca University","domains":["athabascau.ca"],"customDomains":"http://www.athabascau.ca/","country":"Canada","alpha_two_code":"CA"},
    {"web_pages":["http://www.augustana.ab.ca/"],"state_province":null,"name":"Augustana University College1","domains":["augustana.ab.ca"],"customDomains":"http://www.augustana.ab.ca/","country":"Canada","alpha_two_code":"CA"},
    {"web_pages":["http://www.augustana.ab.ca/"],"state_province":null,"name":"Augustana University College2","domains":["augustana.ab.ca"],"customDomains":"http://www.augustana.ab.ca/","country":"Canada","alpha_two_code":"CA"},
    {"web_pages":["http://www.augustana.ab.ca/"],"state_province":null,"name":"Augustana University College3","domains":["augustana.ab.ca"],"customDomains":"http://www.augustana.ab.ca/","country":"Canada","alpha_two_code":"CA"},
    {"web_pages":["http://www.augustana.ab.ca/"],"state_province":null,"name":"Augustana University College4","domains":["augustana.ab.ca"],"customDomains":"http://www.augustana.ab.ca/","country":"Canada","alpha_two_code":"CA"},
    {"web_pages":["http://www.augustana.ab.ca/"],"state_province":null,"name":"Augustana University College5","domains":["augustana.ab.ca"],"customDomains":"http://www.augustana.ab.ca/","country":"Canada","alpha_two_code":"CA"},
    {"web_pages":["http://www.augustana.ab.ca/"],"state_province":null,"name":"Augustana University College6","domains":["augustana.ab.ca"],"customDomains":"http://www.augustana.ab.ca/","country":"Canada","alpha_two_code":"CA"},
    {"web_pages":["http://www.augustana.ab.ca/"],"state_province":null,"name":"Augustana University College7","domains":["augustana.ab.ca"],"customDomains":"http://www.augustana.ab.ca/","country":"Canada","alpha_two_code":"CA"},
    {"web_pages":["http://www.augustana.ab.ca/"],"state_province":null,"name":"Augustana University College8","domains":["augustana.ab.ca"],"customDomains":"http://www.augustana.ab.ca/","country":"Canada","alpha_two_code":"CA"}
];

const tableLimit = 10;
var pagePointer = 0;
var totalListSize = 0;
var alldata;

export default class WorldUniversityLWC extends LightningElement {
    searchName='';
    searchCountry='';
    allcolumns = tablecolumns;
    data;

    @wire(fetchingforLightning, {aName: '$searchName' ,aCountry: '$searchCountry' }) 
        university({data, error}){
            //console.log(data);
            //var alldata = JSON.parse(data);
            //console.log(error);
            try {
                console.log('In wire');
                console.log(JSON.parse(data));
                alldata = JSON.parse(data);
                totalListSize = alldata.length;
                this.handlePaging();
            } catch (error) {
                console.log('There is some error: '+error);
            }
        }

    buttonMenu(event){
        // var inpCountry=event.detail.value;
        // console.log(inpCountry);
        this.searchCountry=event.detail.value;
    }
    handleSearch(event){
        console.log(event.target.label);
        var inpName =this.template.querySelector("lightning-input");
        // var inpCountry =this.template.querySelector("lightning-button-menu");
        // console.log(this.searchCountry);
        this.searchName=inpName.value;
        // this.searchName="pune";
        // this.searchCountry="India";
        console.log('I am in handle Search');
        console.log('Main things '+this.searchName+'- Name then Country -'+this.searchCountry);
        
    }
    
    handlePaging(event){
        console.log('Inside Paging Work');
        var newtableRows = [];

        // Its Working Correctly Just Trying another Method.
        // for(let i=pagePointer; i < (tableLimit+pagePointer) && i<totalListSize; i++){
        // 	newtableRows.push(alldata[i]);
        //     console.log(i+'limit'+tableLimit+'pointer'+pagePointer+'total'+totalListSize);
		// };

        //New Method Slicing
        if( pagePointer+tableLimit < totalListSize){
            newtableRows = alldata.slice(pagePointer,(pagePointer+tableLimit));
        }else if(pagePointer<totalListSize){
            newtableRows = alldata.slice(pagePointer,totalListSize);
        }
        console.log('pointer'+pagePointer+'total'+totalListSize);
        
        console.log(newtableRows);
        if(newtableRows.length > 0){
        	this.data = newtableRows;
        }
    }

    handleNext(event){
        //window.alert('Hello In Next');
        console.log(pagePointer);
        if(pagePointer < totalListSize-tableLimit){
            pagePointer += tableLimit;
            console.log(pagePointer);
            this.handlePaging();        
        }
    }

    handlePrev(event){
        //window.alert('Hello In Prev');
        console.log(pagePointer);
        if(pagePointer > 0){
            pagePointer -= tableLimit;
            console.log(pagePointer);
            this.handlePaging();
        }
    }
}