// Selecting DOM Elements
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API String and Key
const count = 30;
const apiKey = 'tTTfunW0JwcsayogmnsRVsFmIbnVJg4stclFqeETNjw';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&query=Animals`;

// To check wheather image is loaded or not.
function imageLoaded(){
     imagesLoaded++;
     if(imagesLoaded === totalImages){
          loader.hidden = true;
          ready = true;
     }
}

// Helper function to set attributes.
function setAttributes(elements, attributes){
     for(const key in attributes){
          elements.setAttribute(key, attributes[key]);
     }
}

// Displaying photos from photosArray
function displayPhotos(){
     imagesLoaded = 0;
     totalImages = photosArray.length;
     photosArray.forEach( photo => {

          // Creating anchor tag to link to Unsplash official site.
          const item = document.createElement('a');
          setAttributes(item, {
               'href': photo.links.html,
               'target': '_blank'
          });

          // Creating image tag to display on main page.
          const image = document.createElement('img');
          setAttributes(image, {
               'src': photo.urls.regular,
               'alt': photo.alt_description,
               'title': photo.alt_description
          });

          // Event Listener to check whether image is completely loaded or not.
          image.addEventListener('load', imageLoaded());

          // eclosing <img> into <a>, then <a> into imageContainer.
          item.appendChild(image);
          imageContainer.appendChild(item);
     });
}


// Fetching photos from unSplash API
async function getPhotos(){
     try{
          const response = await fetch(apiUrl);
          photosArray = await response.json();
          console.log(photosArray);
          displayPhotos();
     }catch(err){
          console.log('Error while trying to fetch photos from APi', err);
     }
}

// Event Listeners
window.addEventListener('scroll', () => {
     if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
          ready = false;
          getPhotos();
     }
})

getPhotos();