
//adding extension item on installtion,updation
chrome.runtime.onInstalled.addListener(()=>{
  chrome.contextMenus.create(
    {
      id:"markProblems",
      title:"Marked problems",
      contexts:["all"],
    }
  )
});
//when user clicks on menu item
chrome.contextMenus.onClicked.addListener((info,tab)=>{
  //info is the object that ccontains information about menuitem clicked imp key=menuItemId
  //console.log(info)
  //console.log(tab)
  if(info.menuItemId==="markProblems"){
    chrome.tabs.create({
      url:chrome.runtime.getURL("problems.html")
    });
  }

});
chrome.action.onClicked.addListener(async(tab)=>{
  // console.log("url: "+tab.url);
  // console.log("title: "+tab.title);
  const url=tab.url,title=tab.title;
  //const data=await chrome.storage.sync.get([url]);
  //if dont have key it will return undefined
  //console.log("data: "+data.url);
  //to get all data 
  //const allData=await chrome.storage.sync(null);
  try{
    //save in sync storage 
    //url as key and problemdetails as object
    if(!(url && title)){
      throw new Error("unable to detect problem ");
    }
    const platform=url.split(".")[0].split("//")[1];
    const problemDetails={
      title,
      platform
    };
    await chrome.storage.sync.set({[url]:problemDetails});
    // const data=await chrome.storage.sync.get(null);
    //it will return object of key value pair
    // console.log("updated storage: ");
    // console.log(typeof(data));
    // const arrData=Object.entries(data);
    //we will get array like this
    //[[url,data],[kay,value]]
    // console.log(arrData);
    /*
    iterating over data from sync storage area
    arrData.forEach((item)=>{
      //accessing url of problem
      console.log(item[0]);
      //accessing the problemDetails object
      for(let key in item[1]){
        console.log(key+" "+item[1][key]);
      }
    })
      */

  }catch(err){
    console.log(err);
  }

});