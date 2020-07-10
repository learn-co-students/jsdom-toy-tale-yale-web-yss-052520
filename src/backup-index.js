let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyListContainer = document.querySelector("div#toy-collection")

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function getToys(){
    fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(toys => showToys(toys))
  }

  function showToys(toys){
    toys.forEach(toy => addToy)
  }

  function addToy(toy){
    const div = document.createElement('div')
    div.className = "card"

    const h2 = document.createElement('h2')
    h2.innerText = toy.name

    const img = document.createElement('img')
    img.src = toy.image
    img.className = "toy-avatar"

    const p = document.createElement('p')
    p.innerText = `${toy.likes} Likes `

    const button = document.createElement('button')
    button.className = "like-btn"
    button.innerText = "Like <3"

    div.append(h2, img, p, button)
    toyListContainer.append(div)

  };

  getToys();

});
