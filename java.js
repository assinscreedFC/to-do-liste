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
  constructor(titre, desc, dateg, rad, chekedd) {
    this._Titre = titre;
    this._Description = desc;
    this._date = dateg;
    this._rad = rad;
    this._chekedd = chekedd;
    this.clone = document
      .querySelector("#modalTemplate")
      .content.cloneNode(true);
  }

  static fromObject(obj) {
    return new note(
      obj._Titre,
      obj._Description,
      obj._date,
      obj._rad,
      obj._chekedd
    );
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

  get chekedd() {
    return this._chekedd;
  }
  set chekedd(newchek) {
    this._chekedd = newchek;
  }
  static couleurNote(parent, rad) {
    let couleur;
    if (rad[0]) {
      couleur = "#00FF00";
    } else if (rad[1]) {
      couleur = "#FFA500";
    } else {
      couleur = "#FF0000";
    }

    parent.querySelector(".ligne").style.borderLeft = " 4px solid " + couleur;
  }

  async setNote(index) {
    const newClone = this.clone.cloneNode(true);
    section.appendChild(newClone);
    const neww = section.lastElementChild;
    neww.querySelector(".para").innerHTML = this._Titre;

    neww.querySelector(".date").value = this._date;
    note.couleurNote(neww, this.rad);
    let doo = neww.querySelector(".do");
    doo.checked = this._chekedd;
    doo.addEventListener("click", () => {
      anis[index].chekedd = doo.checked;
      localStorage.setItem("notes", JSON.stringify(anis));
    });

    console.log(neww);
    return Promise.resolve();
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

    if (anis[index].rad[0]) {
      lowRadio.checked = true;
    } else if (anis[index].rad[1]) {
      mediumRadio.checked = true;
    } else {
      highRadio.checked = true;
    }

    setTimeout(() => {
      modalContaine.classList.add("active");
    }, 50);
    actubtndetails();

    const modalTriggers = document.querySelectorAll(".modal-trigge");

    modalTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        setTimeout(() => {
          modalContaine.parentNode.removeChild(modalContaine);
          const parentElement = document.querySelector("body");
          const newHTML = '<div class="modal-containe"></div>';
          actubtndetails();
          parentElement.insertAdjacentHTML("afterbegin", newHTML);
        }, 500); // 1000 millisecondes = 1 seconde

        modalContaine.classList.remove("active");
      });
    });
  }
  static async modify(index, ti, de, da, rad) {
    anis[index].Titre = ti;
    anis[index].Description = de;
    anis[index].date = da;
    anis[index].rad = rad;
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
        button.addEventListener("click", handleEditClick);
        console.log("Added click event listener to button");
      });
    }

    function handleEditClick(event) {
      if (nbr === 0) {
        const modd = document.getElementById("mod");
        const moddi = document.getElementById("add");
        const button = event.currentTarget;
        const index = Array.from(document.querySelectorAll(".edit")).indexOf(
          button
        );
        let parent = button.parentNode.parentNode.parentNode;
        let tabrad = [];
        let _titre = document.querySelector("#title");
        let _description = document.querySelector("#description");
        let _date = document.querySelector("#date");

        console.log("Index du bouton cliqué : " + index);
        togglemodal();

        if (modalContainer.classList.contains("active"))
          modd.style.display = "inline-block";

        if (modalContainer.classList.contains("active"))
          moddi.style.display = "none";

        const inrad = document.querySelectorAll(".rad");
        inrad.forEach((e, indexs) => {
          if (anis[index].rad[indexs] === true) {
            e.checked = true;
          }
        });

        _titre.value = anis[index].Titre;
        _description.value = anis[index].Description;
        _date.value = anis[index].date;

        modd.addEventListener("click", async () => {
          radio.forEach((e) => {
            tabrad.push(e.checked);
          });
          await note.modify(
            index,
            _titre.value,
            _description.value,
            _date.value,
            tabrad
          );
          note.couleurNote(parent, anis[index].rad);
          parent.querySelector(".para").innerHTML = anis[index].Titre;
          parent.querySelector(".date").value = _date.value;
          localStorage.setItem("notes", JSON.stringify(anis));
        });

        // let modifier = document.querySelector("#add");
        // modifier.style.display = "none";

        nbr++;
        console.log(nbr);
      }
    }

    setupEventListeners();
  }

  static deletnote() {
    const dellet = section.querySelectorAll(".deledit");

    dellet.forEach((tri) => {
      tri.removeEventListener("click", tri._clickHandler);
    });

    dellet.forEach((tri) => {
      const clickHandler = () => handleDelete(tri);
      tri._clickHandler = clickHandler;
      tri.addEventListener("click", clickHandler);
    });

    function handleDelete(tri) {
      const index = Array.from(document.querySelectorAll(".edit")).indexOf(tri);
      let aniss = JSON.parse(localStorage.getItem("notes")) || [];

      aniss.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(aniss));

      const parenttri = tri.parentNode.parentNode;
      gsap.to(parenttri, {
        x: 600,
        duration: 2,
        ease: "power3.out",
        opacity: 0,
        onComplete: () => {
          parenttri.parentNode.remove();
        },
      });

      console.log(index);
      console.log(aniss);
    }
  }
  //   static act() {
  //     const edi = document.querySelectorAll(".edit");

  //     edi.forEach((e) => {
  //       e.removeEventListener("click", handel);
  //     });

  //     edi.forEach((e) => {
  //       e.addEventListener("click", handel);
  //     });

  //     function handel() {}
  //   }
}
dis();
function dis() {
  const mod = document.getElementById("addd");
  mod.addEventListener("click", () => {
    const modd = document.getElementById("mod");
    if (!modalContainer.classList.contains("active"))
      modd.style.display = "none";

    const moddi = document.getElementById("add");
    if (!modalContainer.classList.contains("active"))
      moddi.style.display = "inline-block";
  });
  const addNote = document.getElementById("add");
  addNote.addEventListener("click", () => {
    const modd = document.getElementById("mod");
    if (!modalContainer.classList.contains("active"))
      modd.style.display = "inline-block";

    const moddi = document.getElementById("add");
    if (!modalContainer.classList.contains("active"))
      moddi.style.display = "none";
  });
}

let nbr = 0;
const form = document.getElementById("form");

const submit = document.getElementById("add");
submit.addEventListener("submit", (e) => e.preventDefault());

// const submitd = document.getElementById("mod");
// submitd.addEventListener("submit", (e) => e.preventDefault());

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let tabrad = [];
  console.log(radio);
  console.log(date.value);

  radio.forEach((e) => {
    tabrad.push(e.checked);
  });
  const mod = document.querySelector("#mod");
  console.log(mod.style.display);
  if (mod.style.display === "none") {
    const newNote = new note(
      titre.value,
      description.value,
      date.value,
      tabrad,
      false
    );

    anis = JSON.parse(localStorage.getItem("notes")) || [];
    anis.push(newNote);
    localStorage.setItem("notes", JSON.stringify(anis));

    await newNote.setNote(anis.length - 1);
    note.actunote();
    actubtndetails();
    note.deletnote();
  }
  togglemodal();
  setTimeout(() => {}, 1000);

  nbr = 0;
  console.log(description.value);
  anis.forEach((note) => {
    console.log("Titre : " + note.Titre);
    console.log("Description : " + note.Description);
    console.log("Date : " + note.date);
    // console.log("Radio : " + note.rad[0].checked);
    console.log("---------------------");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes = notes.map((noteObj) => note.fromObject(noteObj));
  anis.push(...notes);
  anis.forEach((note) => {
    note.setNote();
  });
  note.actunote();
  note.deletnote();
  actubtndetails();
});

modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", () => togglemodal())
);
function togglemodal() {
  titre.value = "";
  description.value = "";
  date.value = "";

  modalContainer.classList.toggle("active");
  if (!modalContainer.classList.contains("active")) nbr = 0;
}
