// The ChoreController is responsible for manipulating the DOM.
// It achieves this task by being the middle person between the Adapter,
// the Chore model, and the DOM itself. While the Adapter knows how to
// talk to the backend and the Chore model knows what it's supposed to look like,
// the ChoreController is what notifies each one when it's time to do their thang.

class ChoreController {
// This function is called on DOMContentLoaded. It initializes the two main
// components of the application that must happen at the beginning-
// add an event listener to the form so that new chores can be created and
// render all of the chores currently in the database.
  static init(){
    const choreForm = document.getElementById("new-chore-form")
    choreForm.addEventListener("submit", ChoreController.onNewChoreSubmission)

    ChoreController.renderAllChores()
  }

// These three functions have to do with adding or removing content from the DOM
  static renderAllChores(){
    Adapter.getChores()
      .then( (chores) => {
        chores.forEach(ChoreController.renderSingleChore)
      })
  }

  static renderSingleChore(chore){
    const choreList = document.getElementById("chore-list")
    const newChore = new Chore(chore)
    choreList.append( newChore.createChoreDomObject() )
  }

  static removeChoreCard(id){
    const choreCard = document.getElementById(`chore-card-${id}`)
    choreCard.remove()
  }

// These three functions are event callback functions.
  static onNewChoreSubmission(e){
    e.preventDefault()
    // When a form is submitted in HTML, it automatically is setup to make a POST
    // request- this is the default behavior. If we don't prevent this default
    // behavior, the page could refresh or redirect and we would lose all of our
    // Javascript threads. By calling "preventDefault()" on the event, we can ensure
    // that a redirect or refresh will not occur.

    const title = document.querySelector("#title")
    const priority = document.querySelector("#priority")
    const duration = document.querySelector("#duration")

    const choreObj = {
      title: title.value,
      priority: priority.value,
      duration: duration.value
    }

    Adapter.createChore(choreObj)
      .then(ChoreController.renderSingleChore)
        .then(() => {
          // This last step clears out the form so that a new chore can be created
          title.value = ""
          priority.value = ""
          duration.value = ""
        })

  }

  static onDelete(e){
    const id = e.target.dataset.id
    Adapter.deleteChore(id)
    .then(() => ChoreController.removeChoreCard(id))
  }

  static onPriorityShift(e){
    const updatedChore = {
      priority: e.target.value
    }
    const id = e.target.dataset.id
    Adapter.updateChore(id, updatedChore)
  }
}
