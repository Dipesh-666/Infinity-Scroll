
const imageContainer = document.getElementById('imageContainer');
const loader = document.getElementById('loader');
let photoArray = [];
const count = 3;
let imagesLoaded = 0;
let ready = false;
let totalImages = 0;

const url = `https://api.unsplash.com/photos/random?client_id=${key}&count=${count}`;//key is in another js file untraced by git
function imageLoaded()
{
    imagesLoaded++;
    if(imagesLoaded === totalImages)
    {
        ready = true;
        loader.hidden = true;
        
        
    }
    console.log('image loaded');
}
function displayImage(){
    imagesLoaded = 0;
    totalImages = photoArray.length;
   
    photoArray.forEach((photo) => {
        const anchor = document.createElement('a');
        anchor.setAttribute('href', photo.links.html);
        anchor.setAttribute('target','_blank');
        const image = document.createElement('img');
        image.setAttribute('src',photo.urls.regular);
        image.setAttribute('alt',photo.alt_description);
        image.setAttribute('title',photo.alt_description);
        image.addEventListener('load', imageLoaded);
        anchor.appendChild(image);
        imageContainer.appendChild(anchor);  
    });
    

};
async function getImage()
{
    
    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("Unable to fetch from API."); 
        }
        photoArray = await response.json();
        
        displayImage();
    } catch (error) {
        
    }
    
}

getImage();
window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
    {
        ready = false;
        getImage();
        }
})


