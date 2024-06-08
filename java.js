const modalContainer = document.querySelector(".modal-container");
let modalTriggers = document.querySelectorAll(".modal-trigger");
const titre = document.querySelector("#title");
const description = document.querySelector("#description");
const date = document.querySelector("#date");
const radio = document.querySelectorAll(".rad");
const section = document.querySelector(".grand-container");
let details = document.querySelectorAll(".info");
let anis = new Array();

function addEventListeners(nomm) {
  nomm.forEach((Element, index) => {
    Element.addEventListener("click", clickHandler);
    Element.classList.add("listener-added");
  });
}

function removeEventListeners(nomm) {
  nomm.forEach((Element) => {
    Element.removeEventListener("click", clickHandler);
    Element.classList.remove("listener-added");
  });
}

function clickHandler(event) {
  const Element = event.currentTarget;
  const index = Array.from(details).indexOf(Element);
  console.log("Index du bouton cliqué : " + index);
  anis[index].addbtn(index);
}

function actubtndetails() {
  details = document.querySelectorAll(".info");

  removeEventListeners(details);

  addEventListeners(details);
}

class note {
  constructor(titre, desc, dateg, rad) {
    this._Titre = titre;
    this._Description = desc;
    this._date = dateg;
    this._rad = rad;
    this.clone = document
      .querySelector("#modalTemplate")
      .content.cloneNode(true);
  }

  get Titre() {
    return this._Titre;
  }

  set Titre(newTitre) {
    this._Titre = newTitre;
  }

  get Description() {
    return this._Description;
  }

  set Description(newDesc) {
    this._Description = newDesc;
  }

  get date() {
    return this._date;
  }

  set date(newDate) {
    this._date = newDate;
  }

  get rad() {
    return this._rad;
  }

  set rad(newRad) {
    this._rad = newRad;
  }

  setNote() {
    const newClone = this.clone.cloneNode(true);
    section.appendChild(newClone);
    const neww = section.lastElementChild;
    neww.querySelector(".para").innerHTML = this._Titre;

    neww.querySelector(".date").value = this._date;
    let couleur;
    if (radio[0].checked) {
      couleur = "#00FF00";
    } else if (radio[1].checked) {
      couleur = "#FFA500";
    } else {
      couleur = "#FF0000";
    }
    console.log(radio);
    const tri = neww.querySelector(".edit");
    tri.addEventListener("click", note.actunote);

    neww.querySelector(".ligne").style.borderLeft = " 4px solid " + couleur;

    console.log(neww);
  }

  addbtn(index) {
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
              value="${anis[index].Titre}"
              style="width: 100%; margin-bottom: 5px"
              readonly
            />
            <textarea
              name="description"
              id="description"
              cols="50%"
              rows="8"
              
              style="resize: none"
              placeholder="Description"
              readonly
            >${anis[index].Description}</textarea>
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
                   
                    class="rad"
                    id="low"
                    readonly
                  />
                  <span>LOW</span>
                </label>
                <label>
                  <input type="radio" name="radio" class="rad" id="med"  readonly />
                  <span>MEDIUM</span>
                </label>
                <label>
                  <input type="radio" name="radio" class="rad" id="hight"  readonly />
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
    const lowRadio = document.querySelector(`#low`);
    const mediumRadio = document.querySelector(`#med`);
    const highRadio = document.querySelector(`#hight`);

    if (anis[index].rad[0].checked) {
      lowRadio.checked = true;
    } else if (anis[index].rad[1].checked) {
      mediumRadio.checked = true;
    } else {
      highRadio.checked = true;
    }

    modalContaine.classList.add("active");
    actubtndetails();

    const modalTriggers = document.querySelectorAll(".modal-trigge");

    modalTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        modalContaine.parentNode.removeChild(modalContaine);
        const parentElement = document.querySelector("body");
        const newHTML = '<div class="modal-containe"></div>';

        parentElement.insertAdjacentHTML("afterbegin", newHTML);

        actubtndetails();
      });
    });
  }

  static actunote() {
    function setupEventListeners() {
      let editButtons = document.querySelectorAll(".edit");

      editButtons.forEach((button) => {
        button.removeEventListener("click", handleEditClick);
        console.log("Removed click event listener from button");
        nbr = 0;
      });

      editButtons.forEach((button) => {
        button.addEventListener("click", handleEditClick, { once: true });
        console.log("Added click event listener to button");
      });
    }

    function handleEditClick(event) {
      if (nbr === 0) {
        const button = event.currentTarget;
        const index = Array.from(document.querySelectorAll(".edit")).indexOf(
          button
        );
        console.log("Index du bouton cliqué : " + index);
        togglemodal();

        let _titre = document.querySelector("#title");
        let _description = document.querySelector("#description");
        let _date = document.querySelector("#date");

        _titre.value = anis[index].Titre;
        _description.value = anis[index].Description;
        _date.value = anis[index].date;

        nbr++;
        console.log(nbr);
      }
    }

    setupEventListeners();
  }

  static deletnote() {
    const dellet = section.querySelectorAll(".deledit");
    dellet.forEach((tri) => {
      tri.addEventListener("click", () => {
        tri.parentNode.parentNode.parentNode.remove();
      });
    });
  }
}
let nbr = 0;
const form = document.getElementById("form");
const submit = document.getElementById("add");
submit.addEventListener("submit", (e) => e.preventDefault());
form.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log(radio[0]);
  console.log(date.value);

  anis.push(new note(titre.value, description.value, date.value, radio));
  anis[anis.length - 1].setNote();
  actubtndetails();
  note.deletnote();
  togglemodal();
  note.actunote();
  nbr = 0;
  console.log(description.value);
  anis.forEach((note) => {
    console.log("Titre : " + note.Titre);
    console.log("Description : " + note.Description);
    console.log("Date : " + note.date);
    console.log("Radio : " + note.rad[0].checked);
    console.log("---------------------");
  });
  titre.value = "";
  description.value = "";
  date.value = "";
});

modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", () => togglemodal())
);
function togglemodal() {
  modalContainer.classList.toggle("active");
}
