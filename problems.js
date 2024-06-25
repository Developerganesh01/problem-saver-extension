const container=document.querySelector(".container");
//append in the following format
// div class="problem-container">
//       <div class="problem-container__title-box">
//         <a class="problem-container__link" href="#">problem title</a>
//       </div>
//       <div class="problem-container__platform-info">platform</div>
//       <div class="problem-container__img"><img src="images/delete_small.png" alt="remove problem"></div>
//     </div>




//function to run when there is no data in chrome storage
function displayNoData(){

  const noDataDiv=document.querySelector(".no-data-div");
  if(noDataDiv.classList.contains("hidden")){
    noDataDiv.classList.remove("hidden");
  }
}

//function to create  element with classname
function createElement(element,className){
  const ele=document.createElement(element);
  ele.classList=className;
  return ele;
}
//event listener to delete problem from list
async function removeProblem(e){

  const problemContainer=e.target.closest(".problem-container");
  const problemLink=problemContainer.querySelector(".problem-container__link");
  const url=problemLink.href;
  await chrome.storage.sync.remove(url);
  problemContainer.remove();
  //after removing check how many elements are left if its one i.e.(no-data-div)
  //that means we have removed all so remove hidden class
  // console.log(container.childElementCount);
  if(container.childElementCount===1){
    const noDataDiv=document.querySelector(".no-data-div");
    noDataDiv.classList.remove("hidden");
  }
}

//function to create problem-container element
function createProblemContainerElement(problemLinkHref,problemTitle,platform,removeProblemImageSrc){

  const problemContainerDiv=createElement("div","problem-container");
  const titleBoxDiv=createElement("div","problem-container__title-box");
  const problemLink=createElement("a","problem-container__link");
  const platformInfoDiv=createElement("div","problem-container__platform-info");
  const imageDiv=createElement("div","problem-container__img");
  const removeProblemImg=createElement("img","remove-problem");

  //set attributes
  problemLink.setAttribute("href",problemLinkHref);
  problemLink.textContent=problemTitle;
  platformInfoDiv.textContent=platform;
  removeProblemImg.setAttribute("src",removeProblemImageSrc);
  removeProblemImg.setAttribute("alt","remove problem");

  //set positions of elements
  titleBoxDiv.appendChild(problemLink);
  imageDiv.appendChild(removeProblemImg);
  problemContainerDiv.append(titleBoxDiv,platformInfoDiv,imageDiv);

  //addEventListener to image
  removeProblemImg.addEventListener("click",(e)=>{
    removeProblem(e);
  });

  return problemContainerDiv;

}
//function to run when have data
function displayData(data)
{
  //hide no data element
  const noDataDiv=document.querySelector(".no-data-div");
  if(!noDataDiv.classList.contains("hidden")){
    noDataDiv.classList.add("hidden");
  }
  //data is now in format :[{href:,title:,platform:},...]
  data.forEach((obj)=>{
    const newProblemContainer=createProblemContainerElement(obj.href,obj.title,obj.platform,"images/delete_small.png");
    container.appendChild(newProblemContainer);
  })

}






//store the data from chrome sync storage[{href:,title:,platform:},{...},...]
async function getData(){
  let data=[];
  const dataObject=await chrome.storage.sync.get(null);
   data=Object.entries(dataObject).map((arr)=>{
    const obj={};
    obj.href=arr[0];
    obj.title=arr[1]["title"];
    obj.platform=arr[1]["platform"];
    return obj;
  });
  console.log(data);
  if(data.length===0)
    {
      displayNoData();
    }
  else
  {
    displayData(data);
  }
}
getData();