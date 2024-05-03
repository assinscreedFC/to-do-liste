const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const titre = document.querySelector("#title");
const description = document.querySelector("#description");
const date = document.querySelector("#date");
const radio = document.querySelectorAll(".rad");
const section = document.querySelector(".grand-container");
modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", () => togglemodal())
);

class note {
  constructor(titre, desc, dateg, rad) {
    this.Titre = titre;
    this.Description = desc;
    this.date = dateg;
    this.rad = rad;
    this.clone = document
      .querySelector("#modalTemplate")
      .content.cloneNode(true);
  }

  setNote() {
    const newClone = this.clone.cloneNode(true);
    section.appendChild(newClone);
    const neww = section.lastElementChild;
    neww.querySelector(".para").innerHTML = this.Titre;
    // neww.querySelector("#description").innerHTML = this.Description;
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

    this.addbtn(neww);
  }

  addbtn(neww) {
    const btn = neww.querySelector(".details");
    console.log(btn);
    btn.addEventListener("click", () => {
      document.querySelector(
        "body"
      ).innerHTML += `<div class="modal-containe active">
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
            <input type="date" id="date" name="date" value="${this.date}" readonly/>
          </div>

          <div class="mydict">
            <div>
              <p id="ip">importance :</p>
              <label>
                <input type="radio" name="radio" checked="" class="rad" readonly/>
                <span>LOW</span>
              </label>
              <label>
                <input type="radio" name="radio" class="rad" readonly/>
                <span>MEDIUM</span>
              </label>
              <label>
                <input type="radio" name="radio" class="rad" readonly />
                <span>HIGHT</span>
              </label>
            </div>
          </div>`;
      const modalContaine = document.querySelector(".modal-containe");
      const modalTrigger = document.querySelectorAll(".modal-trigge");
      modalTrigger.forEach((trigger) =>
        trigger.addEventListener("click", () =>
          modalContaine.classList.toggle("active")
        )
      );
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
  anis = new note(titre.value, description.value, date.value, radio);
  anis.setNote();
});

function togglemodal() {
  modalContainer.classList.toggle("active");
}
