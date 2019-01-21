// Component responsible for interacting with the API. All fetch calls for this application will be defined here

const interestCollection = {
    // This method returns a fetch, which means it is returning a promise. Which means to access the response from the asynchronous HTTP GET request that is being made by this fetch, we can chain a .then at the point where this method(getAllinterests) is called. The .then then is chained to the fetch inside the method is parsing the data from JSON to data structures Javascript will understand. In this case, because we have a collection of items, it will be an array of objects.
    getAllInterests() {
      return fetch("http://localhost:8088/interests")
      .then(response => response.json())
    },
    
    getAllPlaces() {
      return fetch("http://localhost:8088/places")
      .then(response => response.json())
    },
  
    // This method will make a HTTP POST request to the API. Because a POST has a body with the data for the new item you want created, this method will take one argument which will be the object for the new interest item we want to add to our collection in the API.
    postNewInterest(newInterestToSave) {
      // We want to return this fetch request so that at the point it is called, we can take advantage of the asynchronous nature of promises to wait for this to be done before getting the latest data and rerendering the DOM.
      return fetch("http://localhost:8088/interests", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newInterestToSave)
      })
    },
    // In order to delete a item from the JSON Server API, all we need is the id of the item in order to target it, which is the only argument this method has.
    deleteInterest(interestId) {
      return fetch(`http://localhost:8088/interests/${interestId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
      })
    },
    // Again, you need the id of the interest item in order to get data for that item back from the API.
    getInterest(interestId) {
      return fetch(`http://localhost:8088/interests/${interestId}`)
      .then(response => response.json())
    },
    // In order to edit an existing interest item, we need the id to identify which interest item we want to edit and the new data we want to replace the existing data with. So this time, we have two arguments for the method.
    putExistingInterest(interestId, interestToEdit) {
      return fetch(`http://localhost:8088/interests/${interestId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(interestToEdit)
      })
    }
  }
  
  export default interestCollection
  