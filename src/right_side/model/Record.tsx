import { Category } from "./Category";


export type ServiceRecord = {
    id? : number;
    service_amount : number;
    category : Category;
}

let upload_endpoint :string = "http://localhost:3001/record/post";
const RECORDONTODAY :string = "http://localhost:3001/record/today";
const REMOVERECORD :string = "http://localhost:3001/record/remove";
export const saveRecord =async (record:ServiceRecord) =>  {
   
    try {
        let serviceRecord :ServiceRecord;
        serviceRecord = record;
        const result = await fetch(upload_endpoint,{
            body : JSON.stringify(serviceRecord),
            method :'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
             
        })
        const json = await result.json();  
        if(json.raw.length>0 ){
            return {
                status : true,
                body : json
            }
        }else{
            return {
                status : false,
                body : 0
            }
        }        
    } catch (error) {
        return {
            status : false,
            body : error
        }
    }       
}
export const getTodayRecord= async () => {
    try {
        const result =await fetch(`${RECORDONTODAY}`);
        const json = await result.json();
     
        return json;
    } catch (error) {
        console.log(error)
        return [];
    }
}

export const removeRecord = async (id : number) => {
    try {
        const result =await fetch(`${REMOVERECORD}?id=${id}`,{method : 'PUT'});
        const json = await result.json();
        
        return {
            status : true,
            body : json
        }
    } catch (error) {
        console.log(error)
        return {
            status : false,
            body : error
        }
    }
}