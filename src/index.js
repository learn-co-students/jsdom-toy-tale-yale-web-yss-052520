let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toys = document.querySelector("#toy-collection");
  const toy_form = document.querySelector(".add-toy-form");
  const url = "http://localhost:3000/toys";


  load_toys();

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  toy_form.addEventListener("submit", () => {
    event.preventDefault();
    const name = document.querySelector("input[name='name']");
    const image = document.querySelector("input[name='image']");

    fetch(url, postObj(name.value, image.value))
    .then(response => response.json())
    .then(json => add_to_DOM(json));
  });



  function load_toys(){
    fetch(url)
    .then(response => response.json())
    .then(json => {for (item of json){add_to_DOM(item)}});
  }
  
  function add_to_DOM(json){
    let div = ce("div");
    div.className = "card";
    
    let h2 = ce("h2");
    h2.innerText = json.name;

    let img = ce("img");
    img.src = json.image;
    img.className = "toy-avatar"

    let p = ce("p");
    p.innerText = `${json.likes} Likes`;

    let btn = ce("button");
    btn.class = "like-btn";
    btn.innerText = "Like <3";
    add_btnlistener(json.id, btn);

    div.append(h2, img, p, btn);
    toys.append(div);
  }

  function add_btnlistener(toy_id, btn){
    let post_url = url + `/${toy_id}`;

    btn.addEventListener("click", () => {
      let p_tag = event.path[1].children[2];
      let likes = Number(p_tag.innerText.split(" ")[0]);
      p_tag.innerText = `${likes + 1} Likes`;
      fetch(post_url, patchObj(likes));
    })
  }

});


function postObj(name, image){
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({name: name, image: image, likes: 0})
  }
}

function patchObj(likes){
  return {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({likes: likes + 1})
  }
}


function ce(item){
  return document.createElement(item);
}

