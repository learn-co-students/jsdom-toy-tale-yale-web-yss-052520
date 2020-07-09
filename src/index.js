let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch("http://localhost:3000/toys")
.then(res => res.json())
.then(res => add_toys(res))

function add_toys(toys){
 toys.forEach(toy => {
  add_toy(toy)
 })
}

function add_toy(toy){
  const d = document.querySelector("#toy-collection")
  const div = document.createElement("div")
  div.classList.add("card")
  const h2 = document.createElement("h2")
  h2.innerText = toy.name
  const image = document.createElement("img")
  image.src = toy.image
  image.classList.add("toy-avatar")
  const p = document.createElement("p")
  p.innerText = `${toy.likes} Likes `
  const btn = document.createElement("botton")
  btn.classList.add("like-btn")
  btn.innerText = "Like <3"
  btn.addEventListener("click", (e) => {
    // console.log("clicked!") 

    add_likes(toy)
    e.preventDefault()
  })

  div.append(h2, image, p, btn)
  d.append(div)
}

function add_likes (toy){
  let formData = {
    likes: toy.likes + 1
  };
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };  

  fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
  .then(function(response) {
      response.json();
  }).then(
    console.log
  );
}



let f = document.querySelector(".add-toy-form")

f.addEventListener("submit", function(e){
  e.preventDefault()
  let formData = {
    name: f.elements[0].value,
    image: f.elements[1].value,
    likes: 0
  };
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch("http://localhost:3000/toys", configObj)
      .then(function(response) {
          return response.json();
      }).then(console.log);
    
})