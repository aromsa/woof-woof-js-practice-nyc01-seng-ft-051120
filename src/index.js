document.addEventListener("DOMContentLoaded", () => {

  // VARIABLES
  const dogUrl = 'http://localhost:3000/pups'
  const dogBar = document.getElementById("dog-bar")
  const dogInfo = document.querySelector("#dog-info")
  // console.log(dogDiv)

  // FETCH REQUESTS
  function fetchDogs(){
    fetch(dogUrl)
    .then (resp => resp.json())
    .then (dogs => renderDogs(dogs))
  }

  function fetchOneDog(dogId){
    fetch(`${dogUrl}/${dogId}`)
      .then (resp => resp.json())
      .then (dog => renderDogInfo(dog))
  }

  function patchDog(status, dogId){
    fetch(`${dogUrl}/${dogId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({ isGoodDog: status.toLowerCase() == 'true' ? true : false })
    })
    .then (resp => resp.json())
    .then (dog => renderDogInfo(dog))
  }

  // EVENT LISTENERS
  const dogBarClickHandler = () => {
    dogBar.addEventListener("click", function(e){
      fetchOneDog(e.target.dataset.id)
    })
  }

  const goodBadButtonClick = () => {
    dogInfo.addEventListener("click", function(e){
      if (e.target.textContent === "Good Dog!"){
        e.target.textContent = "Bad Dog!"
      } else {
        e.target.textContent = "Good Dog!"
      }
      let dogId = dogInfo.dataset.id
      let goodBad = e.target.textContent
      if (goodBad === "Good Dog!"){
        status = true
      } else {
        status = false
      }
    patchDog(status, dogId)
    })
  }

  // FUNCTIONS
  function renderDogs(dogs){
    dogs.forEach(dog => {
      const dogSpan = document.createElement("span")
      dogSpan.textContent = dog.name
      dogSpan.dataset.id = dog.id
      dogBar.append(dogSpan)
      dogSpan.style.cursor = 'pointer'
    })
  }

  function renderDogInfo(dog){
    dogInfo.dataset.id = dog.id
    dogInfo.innerHTML = `
    <img src=${dog.image}>
    <h2>${dog.name}</h2>
    `
    let goodBadButton = document.createElement("button")
    if (dog.isGoodDog === true){
      goodBadButton.textContent = "Good Dog!"
    } else {
      goodBadButton.textContent = "Bad Dog!"
    }
    dogInfo.append(goodBadButton)
  }

  // EXECUTIONS
  fetchDogs()
  dogBarClickHandler()
  goodBadButtonClick()
})