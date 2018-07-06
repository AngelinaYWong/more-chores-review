// The adapter class is solely responsible with communicating with the database
// Every function will return a fetch that, once resolved, returns some parsed JSON

const choresURL = "http://localhost:3000/chores"

class Adapter {
  // GET /chores
  static getChores(){
    return fetch(choresURL).then( r => r.json() )
  }

  // POST /chores
  static createChore(choreObj){
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(choreObj)
      // Body must be stringified in order for data to be sent over the web
    }
    return fetch(choresURL, options).then( r => r.json())
  }

  // DELETE /chores/:id
  static deleteChore(id){
    const options = {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    }
    return fetch(choresURL + `/${id}`, options).then( r => r.json())
  }

  // PATCH /chores/:id
  static updateChore(id, updatedChore){
    const options = {
      method: "PATCH", // PATCH must be in all caps
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(updatedChore)
      // Body must be stringified in order for data to be sent over the web
    }
    return fetch(choresURL + `/${id}`, options).then( r => r.json())
  }

}
