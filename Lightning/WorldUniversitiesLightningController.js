({
    init : function(component, event, helper) {
        component.set('v.columns', [
            {label: 'University Name', fieldName: 'name', type: 'text'},
            {label: 'Websites', fieldName: 'customDomains', type: 'url'},
            {label: 'Country', fieldName: 'country', type: 'text'},
            {label: 'State', fieldName: 'state_province', type: 'text'}
        ]);
     
        /**
        component.set('v.completeData',[
            {"web_pages":["https://www.cstj.qc.ca","https://ccmt.cstj.qc.ca","https://ccml.cstj.qc.ca"],"state_province":null,"name":"Cégep de Saint_Jérôme","domains":["cstj.qc.ca"],"customDomains":"https://www.cstj.qc.ca","country":"Canada","alpha_two_code":"CA"},
            {"web_pages":["https://www.lambtoncollege.ca"],"state_province":"Sarnia","name":"Lambton College","domains":["lambtoncollege.ca","mylambton.ca"],"customDomains":"https://www.lambtoncollege.ca","country":"Canada","alpha_two_code":"CA"},
            {"web_pages":["http://www.acadiau.ca/"],"state_province":null,"name":"Acadia University","domains":["acadiau.ca"],"customDomains":"http://www.acadiau.ca/","country":"Canada","alpha_two_code":"CA"},
            {"web_pages":["http://www.algonquincollege.com/"],"state_province":null,"name":"Algonquin College","domains":["algonquincollege.com"],"customDomains":"http://www.algonquincollege.com/","country":"Canada","alpha_two_code":"CA"},
            {"web_pages":["http://www.ashtoncollege.com/"],"state_province":null,"name":"Ashton College","domains":["ashtoncollege.com"],"customDomains":"http://www.ashtoncollege.com/","country":"Canada","alpha_two_code":"CA"},
            {"web_pages":["http://www.assumptionu.ca/"],"state_province":null,"name":"Assumption University","domains":["assumptionu.ca"],"customDomains":"http://www.assumptionu.ca/","country":"Canada","alpha_two_code":"CA"},
            {"web_pages":["http://www.athabascau.ca/"],"state_province":null,"name":"Athabasca University","domains":["athabascau.ca"],"customDomains":"http://www.athabascau.ca/","country":"Canada","alpha_two_code":"CA"},
            {"web_pages":["http://www.augustana.ab.ca/"],"state_province":null,"name":"Augustana University College","domains":["augustana.ab.ca"],"customDomains":"http://www.augustana.ab.ca/","country":"Canada","alpha_two_code":"CA"}
        ]);
        **/
        
        var aNameValue = component.get("v.Name");
        var aCountryValue = component.get("v.Country");
        console.log('name then country '+aNameValue + ' ' + aCountryValue);
        
        var action = component.get("c.fetchingforLightning");
        action.setParams({ aName: aNameValue ,aCountry: aCountryValue });
        
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var responsedata = response.getReturnValue();
                if(responsedata != null){
                    component.set("v.completeData", JSON.parse(responsedata));
                    helper.totalListSize = component.get("v.completeData").length;
        			console.log(helper.totalListSize);
                    $A.enqueueAction(component.get('c.pagingWork'));
                    //component.set(alldata,"v.completeData");
                    //var alldata = JSON.parse(responsedata);
                    //helper.helperMethod(component,event,helper);
                }
            }
        });
        
        $A.enqueueAction(action);
    },
    
    pagingWork: function(component, event, helper) {
        console.log('Inside Paging Work');
        
        var alldata = component.get("v.completeData");
        let newtableRows = [];
        for(let i=helper.pagePointer; i < (helper.tableLimit+helper.pagePointer) && i<helper.totalListSize; i++){
        	newtableRows.push(alldata[i])
            //console.log(i+'limit'+helper.tableLimit+'pointer'+helper.pagePointer+'total'+helper.totalListSize);
		};
        
        if(newtableRows.length > 0){
        	component.set("v.data", newtableRows);
        }
    },
    
    handlePrev : function(component, event, helper) {
        if(helper.pagePointer > 0){
            helper.pagePointer -= helper.tableLimit;
            console.log(helper.pagePointer);
            $A.enqueueAction(component.get('c.pagingWork'));        
        }
    },
    
    handleNext : function(component, event, helper) {
        //console.log(helper.tableLimit+' '+helper.pagePointer+' '+helper.totalListSize);
        if(helper.pagePointer < helper.totalListSize-helper.tableLimit){
            helper.pagePointer += helper.tableLimit;
            console.log(helper.pagePointer);
            $A.enqueueAction(component.get('c.pagingWork'));        
        }
    }
})