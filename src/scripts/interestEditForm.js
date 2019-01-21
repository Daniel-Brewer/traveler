import interestCollection from "./interestCollection"
import interestList from "./interestList"

const interestEditForm = {
  // This module will build an edit form and append it to the DOM. The form will contain input fields with existing values from the API and an Update button. The user can edit the the values in the input fields. An event listener on the Update button will handle taking the new values entered by the user and calling the API to update the data.
  createAndAppendForm (articleId, interestObjToEdit) {

    // Building the edit form with fields for the name, Description and type of the interest item. Each of the input fields contains the existing values from the database.
    let interestNameField = document.createElement("p")

    let interestNameLabel = document.createElement("label")
    interestNameLabel.textContent = "Name"
    let interestNameInput = document.createElement("input")
    interestNameInput.value = interestObjToEdit.name

    interestNameField.appendChild(interestNameLabel)
    interestNameField.appendChild(interestNameInput)

    let interestDescriptionField = document.createElement("p")

    let interestDescriptionLabel = document.createElement("label")
    interestDescriptionLabel.textContent = "Description"
    let interestDescriptionInput = document.createElement("input")
    interestDescriptionInput.value = interestObjToEdit.description

    interestDescriptionField.appendChild(interestDescriptionLabel)
    interestDescriptionField.appendChild(interestDescriptionInput)

    let interestCostField = document.createElement("p")

    let interestCostLabel = document.createElement("label")
    interestCostLabel.textContent = "Cost"
    let interestCostInput = document.createElement("input")
    interestCostInput.value = interestObjToEdit.cost

    interestCostField.appendChild(interestCostLabel)
    interestCostField.appendChild(interestCostInput)

    let updateButton = document.createElement("button")
    updateButton.textContent = "Update"

    // There is an event listener on the Update button which will take the new values in the input fields and build an object for the interest item to be edited. items and display them.

    updateButton.addEventListener("click", () => {
      let editedInterest = {
        name: interestNameInput.value,
        description: interestDescriptionInput.value,
        cost: interestCostInput.value
      }
      
      interestCollection.putExistingInterest(interestObjToEdit.id, editedInterest)
      .then(response => {
        interestList.travelerify()
      })
    })

    // We passed in the id of the article so we know exactly where to append the edit form.
    let interestItemArticle = document.querySelector(`#${articleId}`)

    // Because we want to replace what is currently in the article element with the edit form, we clear out all children HTML elements in our targeted element before appending our edit form to it.
    while (interestItemArticle.firstChild) {
      interestItemArticle.removeChild(interestItemArticle.firstChild);
    }
    interestItemArticle.appendChild(interestNameField)
    interestItemArticle.appendChild(interestDescriptionField)
    interestItemArticle.appendChild(interestCostField)
    interestItemArticle.appendChild(updateButton)
  }
}
export default interestEditForm
