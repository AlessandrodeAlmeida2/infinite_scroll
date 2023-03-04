const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let iamgesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unplash API
let count = 5;
const apiKey = 'nrgK54RpatSWnduYEU_6zoLcQ9r218qBnZ9zEz474uc'
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    iamgesLoaded++;
    console.log(iamgesLoaded);
    if (iamgesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30
        apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
    }
}

// Helper Function to Set Attributes on DOM Elements
function setAttribute(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    iamgesLoaded = 0;
    totalImages = photosArray.length;
    
    //Run function for each object in photosArray
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        //item.setAttribute('href', photo.links.html);
        //item.setAttribute('target', '_blank');
        setAttribute(item, {
            href: photo.links.html,
            target: '_blak',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        //img.setAttribute('src', photo.urls.regular);
        //img.setAttribute('alt', photo.alt_regular);
        //img.setAttribute('title', photo.alt_regular);
        setAttribute(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //Catch Error Here
    }
}

//Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
       
    }
});

// On Load
getPhotos();