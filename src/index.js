// write your code here
const url = 'http://localhost:3000/ramens'
const imageBarElement = document.querySelector("#ramen-menu")
const mainImage = document.querySelector("#ramen-detail > img")
const nameDetailElement = document.querySelector("#ramen-detail > h2")
const restaurantDetailElement = document.querySelector("#ramen-detail > h3")
const updateFormElement = document.querySelector("#ramen-rating")
let currentRamen 

window.addEventListener('DOMContentLoaded',() => {
  fetchRamens().then( jsonArray => {
      jsonArray.forEach(imageRenderWithListener)
  })
})

function fetchRamens () {
    return fetch(url)
    .then(response => response.json())
    .then(jsonArray => jsonArray)
}

function imageRenderWithListener(jsonObject) {
    let imageElement = document.createElement('img')
    imageElement.src = jsonObject.image
    imageBarElement.append(imageElement)
    // console.log(imageElement)
    imageElement.addEventListener('click', (event) => {
        mainImage.src = event.target.src
        nameDetailElement.innerText = jsonObject.name
        restaurantDetailElement.innerText = jsonObject.restaurant
        updateFormElement.rating.value = jsonObject.rating
        updateFormElement.comment.value = jsonObject.comment
        currentRamen = jsonObject.id
        
    })
}

updateFormElement.addEventListener('submit', event => {
    event.preventDefault()
//     let id = jsonObject.id
//    let name = jsonObject.name
//    let restaurant = jsonObject.restaurant
//    let image = jsonObject.image
   let rating = updateFormElement.rating.value
   let comment = updateFormElement.comment.value

   let ramenDataObject = {rating, comment}

   fetch(`http://localhost:3000/ramens/${currentRamen}`, {
       method: 'PATCH',
       headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
       body: JSON.stringify(ramenDataObject)
   }).then(response => response.json())
   .then(json => console.log(json,json.name))


})
