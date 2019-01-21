import interestCollection from "./interestCollection"
import interestList from "./interestList"
import interestEditForm from "./interestEditForm"

//Given a single interest object, this component builds out the HTML and returns it
const interest = {

  // This method takes one argument, which we expect to be an object that represents a interest and will have the following structure:
  // {
  //   name: "name value",
  //   description: "description value",
  //   cost: "cost value"
  // }

  // Given this object, the method will build HTML elements and append them appropriately so that it will look like this:
  // <article>
  //   <h3>name value</h3>
  //   <p>description value</p>
  //   <p>cost value</p>
  // </article>

  // This HTML is then returned to the point from where this method was called
  interestBuilder(interestObject) {
    let interestArticle = document.createElement("article")
    // In order to have the id of the interest item available when the user clicks on the delete and edit button, we set the id of the HTML article element for each interest item to contain the id of the item in the API. We are intentionally planning ahead and formating the id this way so that when the buttons are clicked, we can use the split method for strings to get just the id number of the interest item to be edited/deleted. Also, because we are using the ids from the API, it also ensures that each delete button has a unique id. By moving the id to the article element, it also gives us a a way to target the whole article element so that we can replace the contents of the article element with a pre-filled form when the user clicks the edit button.
    interestArticle.setAttribute("id", `interest--${interestObject.id}`)
    
    let interestName = document.createElement("h3")
    interestName.textContent = interestObject.name

    let interestDescription = document.createElement("p")
    interestDescription.textContent = interestObject.description

    let interestCost = document.createElement("p")
    interestCost.textContent = interestObject.cost

    // add edit button
    let editInterestButton = document.createElement("button")
    editInterestButton.textContent = "Edit"
    editInterestButton.addEventListener("click", () => {
      let articleId = event.target.parentNode.id
      let interestId = articleId.split("--")[1]
      interestCollection.getInterest(interestId)
      .then(response => {
        interestEditForm.createAndAppendForm(articleId, response)
      })
    })

    // add delete button
    let deleteInterestButton = document.createElement("button")
    deleteInterestButton.textContent = "Delete"
    deleteInterestButton.addEventListener("click", () => {
        window.confirm("Are you sure you want to delete?")
      let interestId = event.target.parentNode.id.split("--")[1]
      interestCollection.deleteInterest(interestId)
      .then(response => {
        interestList.fridgify()
      })
    })

    interestArticle.appendChild(interestName)
    interestArticle.appendChild(interestDescription)
    interestArticle.appendChild(interestCost)
    interestArticle.appendChild(editInterestButton)
    interestArticle.appendChild(deleteInterestButton)

    return interestArticle
  }
}

export default interest
