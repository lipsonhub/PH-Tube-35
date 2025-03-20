console.log("index is connected")

function removeActiveClass (){
  const activeButton =document.getElementsByClassName("active");
  // console.log(activeButton);
  for(let btn of activeButton){
    btn.classList.remove("active");

  };
};

function loadCategories() {
    // fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    

}
 
function loadVideos (){
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(res => res.json())
    .then(data => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active")
      displayVideos(data.videos)
    })
}

const loadCategoryVideos = (id) => {
  // console.log(id)
  const url =`https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  // console.log(url);
  fetch(url)
  .then(res => res.json())
  .then(data => {
    removeActiveClass();
    const clickBtn=document.getElementById(`btn-${id}`);
    // console.log(clickBtn);
    clickBtn.classList.add("active")

    displayVideos(data.category);
  });

};

const loadVideoDetails = (videoId) =>{
  // console.log(videoId);
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
  .then(res => res.json())
  .then(data => displayVideoDetails(data.video));

};
const displayVideoDetails = (video) =>{
  // console.log(video);
  document.getElementById("video_details").showModal();
 
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML=`
<div class="card bg-base-100 image-full w- shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
     <p class="text-sm text-gray-400 flex gap-1">Singer:${video.authors[0].profile_name}</p>
      <p class="text-sm text-gray-400">${video.others.views},views</p>

    <div class="card-actions justify-end">
      
    </div>
  </div>
</div>
  `;




};

const displayVideos = (videos) =>{
    // console.log(videos)
    const videoContainer =document.getElementById("video-container");
    videoContainer.innerHTML="";
    if(videos.length == 0){
      videoContainer.innerHTML=`
       <div class="col-span-full flex flex-col justify-center items-center py-5">
                <img class="w-[120px]" src="assets/Icon.png" alt="">
                <h2 class="2xl font-bold">Oops!! Sorry , There is no content here</h2>
             </div>
      `;
      return;
    }

     videos.forEach((video) => {
        // console.log(video);
        const videoCart =document.createElement("div");
        videoCart.innerHTML=`
         <div class="card bg-base-100 w- shadow-sm">
            <figure class="relative">
              <img class="w-full h-[150px] object-cover" src="${video.thumbnail}"alt="Shoes" />
                <span class="absolute bottom-1 right-1 text-white bg-black text-sm rounded-sm">3hrs 56 min ago</span>
            </figure>
            <div class=" flex gap-3 px-0 py-5">
                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                          <img src="${video.authors[0].profile_picture}" />
                        </div>
                      </div>
                   
                </div>

                <div class="intro">
                    <h2 class="intro text-sm font-semibold">${video.title}</h2>
                    <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name}

                    ${video.authors[0].verified == true ? `
                     <img class="w-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="">
                      ` : ``}

                    </p>

                    <p class="text-sm text-gray-400">${video.others.views}</p>


                </div>
             
              
            </div>
            <button onclick=loadVideoDetails(('${video.video_id}')) class="btn btn-block">Show Details</button>
          </div>
        `;
        videoContainer.append(videoCart) ;  
     });
        
    


};

function displayCategories(categories){
    const categoryContainer =document.getElementById("category-container");
    for (let cat of categories){
        // console.log(cat);
        const categoryDiv =document.createElement("div");
        categoryDiv.innerHTML=`
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
        categoryContainer.append(categoryDiv)
    }
}

loadCategories();
