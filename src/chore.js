// The Chore model is responsible for holding the information
// for the individual chore (ie title, priority, duration), as well as
// knowing what it should look like (ie creating its own DOMObject or HTML string)

class Chore {
  constructor(choreObj){
    this.title = choreObj.title
    this.priority = choreObj.priority
    this.duration = choreObj.duration
    this.id = choreObj.id
  }


  createChoreDomObject(){
    // container div with the class "chore-card"
      // should have a delete button with a class "delete-button"
      // h3 with it's title
      // p with it's duration in minutes
      // input with it's priority

      //   <div class="chore-card">
      //     <button data-id=${this.id} class="delete-button">X</button>
      //     <h3>${this.title}</h3>
      //     <p>${this.duration}</p>
      //     <input data-id=${this.id} type="text" value=${this.priority} />
      //   </div>

      // By creating DOMObject's here, we are able to immediately add event
      // listeners to the Chore on creation, rather than creating it then having
      // to querySelect it off the page to add an event listener later.

      const choreDiv = document.createElement("div")
      choreDiv.className = "chore-card"
      choreDiv.id = `chore-card-${this.id}`

      const button = document.createElement("button")
      button.className = "delete-button"
      button.innerText = "X"
      button.dataset.id = this.id
      // By adding the data-id to this element, when its corresponding event is
      // triggered we can use this data to know which chore is being deleted

      button.addEventListener("click", ChoreController.onDelete )

      const choreTitle = document.createElement("h3")
      choreTitle.innerText = this.title

      const choreDuration = document.createElement("p")
      choreDuration.innerText = this.duration

      const chorePriorityInput = document.createElement("input")
      chorePriorityInput.type = "text"
      chorePriorityInput.value = this.priority
      chorePriorityInput.dataset.id = this.id
      // By adding the data-id to this element, when its corresponding event is
      // triggered we can use this data to know which chore is being edited

      chorePriorityInput.addEventListener("blur", ChoreController.onPriorityShift)
      // The "blur" event is triggered an a DOM element is removed from focus
      // (ie when a user goes from interacting with a DOM element to interacting
      // with a different DOM element)

      choreDiv.append(button, choreTitle, choreDuration, chorePriorityInput)
      // Before returing the choreDiv DOMOBject, we must append all of its children
      // (button, choreTitle, choreDuration, chorePriorityInput)

      // By using "append" rather than += innerHTML, the event listeners we've added
      // remain intact. If we had += innerHTML in order to associate choreDiv with it's
      // children, the event listeners would have been deleted, as the DOM objects
      // would have been converted to strings.

      return choreDiv
  }

}
