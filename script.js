
const imageContainer = document.getElementById('imageContainer');
const loader = document.getElementById('loader');
let photoArray = [];
const count = 10;
const url = `https://api.unsplash.com/photos/random?client_id=${key}&count=${count}`;//key is in another js file untraced bt git
function displayImage(){
    photoArray.forEach((photo) => {
        const anchor = document.createElement('a');
        anchor.setAttribute('href', photo.links.html);
        anchor.setAttribute('target','_blank');
        const image = document.createElement('img');
        image.setAttribute('src',photo.urls.regular);
        image.setAttribute('alt',photo.alt_description);
        image.setAttribute('title',photo.alt_description);
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
        console.log(photoArray);
        displayImage();
    } catch (error) {
    // console.error(error);      
    }
    
}

getImage();
window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000)
    {
        getImage();
        }
})
