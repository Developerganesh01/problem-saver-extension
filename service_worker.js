
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
  }catch(err){
    console.log(err);
  }

});