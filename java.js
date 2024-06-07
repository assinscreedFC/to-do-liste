const modalContainer = document.querySelector(".modal-container");
let modalTriggers = document.querySelectorAll(".modal-trigger");
const titre = document.querySelector("#title");
const description = document.querySelector("#description");
const date = document.querySelector("#date");
const radio = document.querySelectorAll(".rad");
const section = document.querySelector(".grand-container");
let details = document.querySelectorAll(".info");
let anis = new Array();

function addEventListeners() {
  details.forEach((Element, index) => {
    Element.addEventListener("click", clickHandler);
    Element.classList.add("listener-added");
  });
}

function removeEventListeners() {
  details.forEach((Element) => {
    Element.removeEventListener("click", clickHandler);
    Element.classList.remove("listener-added");
  });
}

function clickHandler(event) {
  const Element = event.currentTarget;
  const index = Array.from(details).indexOf(Element);
  console.log("Index du bouton cliqué : " + index);
  anis[index].addbtn(Element);
}

function actubtndetails() {
  details = document.querySelectorAll(".info");

  removeEventListeners();

  addEventListeners();
}

class note {
  constructor(titre, desc, dateg, rad) {
    this.Titre = titre;
    this.Description = desc;
    this.date = dateg;
    this.rad = rad;
    this.clone = document
      .querySelector("#modalTemplate")
      .content.cloneNode(true);
    // this.btn;
  }

  setNote() {
    const newClone = this.clone.cloneNode(true);
    section.appendChild(newClone);
    const neww = section.lastElementChild;
    neww.querySelector(".para").innerHTML = this.Titre;
    //neww.querySelector("#description").innerHTML = this.Description;
    neww.querySelector(".date").value = this.date;
    let couleur;
    if (radio[0].checked) {
      couleur = "#00FF00";
    } else if (radio[1].checked) {
      couleur = "#FFA500";
    } else {
      couleur = "#FF0000";
    }
    console.log(radio);

    neww.querySelector(".ligne").style.borderLeft = " 4px solid " + couleur;
    // neww.querySelector("#details").classList.add("addbook");
    // neww.querySelector("#details").classList.add("modal-btn");
    // neww.querySelector("#details").classList.add("modal-trigger");
    // neww.querySelector(".rad").innerHTML = this.rad;
    console.log(neww);
    // this.btn = neww.querySelector(".details");
    // this.addbtn();
  }

  addbtn() {
    const modalContaine = document.querySelector(".modal-containe");
    modalContaine.innerHTML += `
      <div class="overlay modal-trigge"></div>
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="dialogDesc"
      >
        <button aria-label="close modal" class="close-modal modal-trigge">
          X
        </button>
        <form id="form">
          <div class="prioriter">
            <input
              type="text"
              placeholder="title"
              id="title"
              value="${this.Titre}"
              style="width: 100%; margin-bottom: 5px"
              readonly
            />
            <textarea
              name="desciption"
              id="description"
              cols="50%"
              rows="8"
              value="${this.Description}"
              style="resize: none"
              placeholder="Description"
              readonly
            ></textarea>
          </div>

          <div>
            <div>
              <label for="date">date: </label>
              <input
                type="date"
                id="date"
                name="date"
                value="${this.date}"
                readonly
              />
            </div>

            <div class="mydict">
              <div>
                <p id="ip">importance :</p>
                <label>
                  <input
                    type="radio"
                    name="radio"
                    checked=""
                    class="rad"
                    readonly
                  />
                  <span>LOW</span>
                </label>
                <label>
                  <input type="radio" name="radio" class="rad" readonly />
                  <span>MEDIUM</span>
                </label>
                <label>
                  <input type="radio" name="radio" class="rad" readonly />
                  <span>HIGHT</span>
                </label>
              </div>
            </div>
          </div>
          <!-- <label for="check">reed</label>
      <input type="checkbox" name="check" id="check" /> -->
        </form>
      </div>
    `;
    modalContaine.classList.add("active");
    actubtndetails();

    const modalTriggers = document.querySelectorAll(".modal-trigge");

    // Ajouter un écouteur d'événement pour fermer la modale
    modalTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        modalContaine.parentNode.removeChild(modalContaine);

        actubtndetails(); // Réinitialiser les détails après la fermeture de la modale
      });
    });
  }
}

const form = document.getElementById("form");
const submit = document.getElementById("add");
submit.addEventListener("submit", (e) => e.preventDefault());
form.addEventListener("submit", (e) => {
  e.preventDefault();
  togglemodal();
  // radio = radio.filter((r) => r.checked);
  console.log(radio[0]);
  console.log(date.value);

  anis.push(new note(titre.value, description.value, date.value, radio));
  anis[anis.length - 1].setNote();
  actubtndetails();
});

modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", () => togglemodal())
);
function togglemodal() {
  modalContainer.classList.toggle("active");
}
