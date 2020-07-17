// const URL = "http://localhost:8000/heroes";
// const formPost = document.getElementById("form-post-user");

// // Ajouter un nouvel heros

// async function postNewUser() {
//     const first_name = document.getElementById("first_name").value;
//     const last_name = document.getElementById("last_name").value;
//     const gender = formPost.querySelector("input:checked").value;

//     try {
//         await axios.post(URL, {
//             first_name,
//         });

//         getAllHeroes();

//     } catch (err) {
//         console.error(err);
//     }
// }

// // Fonction pour récuperer tous les héros

// function getAllHeroes() {
//     axios
//         .get(URL)
//         .then((apiRes) => {
//             const heroes = apiRes.data;
//             displayAllHeroes(heroes);
//         })
//         .catch((apiErr) => console.error(apiErr))
// }

// // Fonction pour afficher tous les héros

// function displayAllHeroes(list) {
//     const ul = document.getElementById("list-all-heroes");
//     list.forEach((heroe) => {
//         const li = document.createElement("li");
//         li.classList.add("heroe");
//         li.setAttribute("data-heroe-id", heroe.id);
//         li.innerHTML = `<div class="all">
//             <h3>${heroe.name}</h3>
//             <div class="img">
//             <img src="${heroe.image.url}" alt="">
//             <div class="buttons">
//                 <button class="btn remove">remove</button>
//                 <button class="btn details">details</button>
//             </div></div></div>
//         `
//         ul.appendChild(li)
//     });
// }

// getAllHeroes()



// formPost.querySelector(".btn").onclick = postNewUser;

const URL = "http://localhost:8000/heroes";
const popup = document.getElementById("heroe-details-popup");
const formPost = document.getElementById("form-post-user");
const searchName = document.getElementById("input-tri-nom")
const searchPublisher = document.getElementById("input-tri-publisher")

// Fonction pour ajouter un nouveau héros
// async function postNewHero() {
//     const name = document.getElementById("hero_name").value;
//     const id = document.getElementById("hero_id").value;
//     console.log(name);
//     console.log(id)
//     try {
//         await axios.post(URL, {
//                 name,
//             })
//             .then(res => console.log(res))
//             .catch(err => console.error(err))

//         getAllHeroes();

//     } catch (err) {
//         console.error(err);
//     }

// }


// Fonction pour récuperer tous les héros
function getAllHeroes() {
    axios
        .get(URL + "?_sort=id&_order=asc")
        .then((apiRes) => {
            const heroes = apiRes.data;
            displayAllHeroes(heroes);
        })
        .catch((apiErr) => console.error(apiErr))
}

// Fonction pour récuperer les détails d'un héros
function getOneHeroe(id) {
    axios
        .get(`${URL}/${id}`)
        .then((apiRes) => {
            const heroe = apiRes.data;
            displayOneHeroe(heroe);
        })
        .catch((apiErr) => console.error(apiErr));
}

// Fonction pour supprimer un héros
async function deleteOneHeroe(id) {
    try {
        await axios.delete(`${URL}/${id}`);
        removeHeroeFromDocument(id);
    } catch (err) {
        console.error(err);
    }
}

// Fonction pour supprimer un héros directement du display
function removeHeroeFromDocument(idUser) {
    const cardToRemove = document.querySelector(`[data-heroe-id="${idUser}"]`);
    cardToRemove.remove();
}


// Fonction pour afficher les détails d'un héros
function displayOneHeroe(heroe) {
    const wrapper = document.createElement("div");
    popup.appendChild(wrapper);
    wrapper.outerHTML = `
  <div id="infos-heroe">
      <h3>
        <p class="name">${heroe.name}</p>
        <p class="aliases">${heroe.biography.aliases}<p>
      </h3>
      <p class="publisher">${heroe.biography && heroe.biography.publisher}</p>
      <p class="publisher">${heroe.appearance && heroe.appearance.gender}</p>
      <p class="publisher">${heroe.appearance && heroe.appearance.race}</p>
      <p class="publisher">${heroe.appearance && heroe.appearance.height}</p>
      <p class="publisher">${heroe.appearance && heroe.appearance.weight}</p>
      <img class="one" src="${heroe.image.url}" alt="">
  </div>`;

    popup.classList.remove("is-hidden");
}



// Fonction pour faire disparaitre le popup
function removePopup() {
    const wrapper = popup.querySelector("div");
    wrapper.remove();
    popup.classList.add("is-hidden");
}


// Fonction pour afficher tous les héros
function displayAllHeroes(list) {
    const ul = document.getElementById("list-all-heroes");
    list.forEach((heroe) => {
        const li = document.createElement("li");
        li.classList.add("heroe");
        li.setAttribute("data-heroe-id", heroe.id);
        li.innerHTML = `<div id="hero_name" class="all">
            <h3  class="name-heroe">${heroe.name}</h3>
            
            <div class="img">
            <p class="publisher">${heroe.biography && heroe.biography.publisher}</p>
            <img src="${heroe.image && heroe.image.url}" alt="">
            <div class="buttons">
                <button class="btn remove">remove</button>
                <button class="btn details">details</button>
            </div></div></div>`
        ul.appendChild(li)

        const btnDetails = li.querySelector(".btn.details");
        const btnRemove = li.querySelector(".btn.remove");

        // Obtenir les détails du héros lorsqu'on clique sur le bouton détail
        btnDetails.onclick = () => {
            getOneHeroe(heroe.id);
        };

        // Supprimer le héros lorsqu'on clique sur le bouton remove
        btnRemove.onclick = () => {
            deleteOneHeroe(heroe.id);
        };
    });

}

// création d'un héros

async function postNewHeroe() {
    const name = document.getElementById("name").value;
    const gender = formPost.querySelector("input:checked").value;
    const publisher = document.getElementById("publisher").value;

    console.log("ici...")
    try {
        const apiRes = await axios.post(URL, {
            name,
            gender,
            publisher,
        });

        console.log(apiRes)

        getAllHeroes();

    } catch (err) {
        console.error(err);
    }
}

// Fonction pour filter
function filterName() {
    const searchFilter = searchName.value.toUpperCase();
    const li = document.querySelectorAll(".heroe");
    const name = document.querySelectorAll(".name-heroe")
    for (let i = 0; i < li.length; i++) {
        const liCourant = li[i].innerHTML.toUpperCase();
        const nameCourant = name[i].innerHTML.toUpperCase();
        if (nameCourant.indexOf(searchFilter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

searchName.oninput = filterName

function filterPublisher() {
    const searchFilter = searchPublisher.value.toUpperCase();
    const li = document.querySelectorAll(".heroe");
    const publisher = document.querySelectorAll(".publisher")
    for (let i = 0; i < li.length; i++) {
        const liCourant = li[i].innerHTML.toUpperCase();
        const publisherCourant = publisher[i].innerHTML.toUpperCase();
        if (publisherCourant.indexOf(searchFilter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

searchPublisher.oninput = filterPublisher

// Appel de la fonction pour récuperer tous les héros
getAllHeroes()

// Faire disparaitre le popup détail lorsqu'on clique sur la croix
document.getElementById("close-heroe-popup").onclick = removePopup;

formPost.querySelector(".btn").onclick = postNewHeroe;