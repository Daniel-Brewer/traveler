import interestCollection from "./interestCollection"
import interestList from "./interestList"
import interestEditForm from "./interestEditForm"

//Given a single interest object, this component builds out the HTML and returns it
const interest = {


  // This HTML is then returned to the point from where this method was called
  interestBuilder(interestObject) {
    let interestArticle = document.createElement("article")

    interestArticle.setAttribute("id", `interest--${interestObject.id}`)
    
    let interestName = document.createElement("h3")
    interestName.textContent = interestObject.name

    let interestDescription = document.createElement("p")
    interestDescription.textContent = interestObject.description

    let interestCost = document.createElement("p")
    interestCost.textContent = interestObject.cost

    let interestReview = document.createElement("p")
    interestReview.textContent = interestObject.review

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
        // window.confirm("Are you sure you want to delete?")
        if (confirm("Are you sure you want to delete?")) {
            let interestId = event.target.parentNode.id.split("--")[1]
            interestCollection.deleteInterest(interestId)
            .then(response => {
                interestList.travelerify()
            })
        }
    })

    interestArticle.appendChild(interestName)
    interestArticle.appendChild(interestDescription)
    interestArticle.appendChild(interestCost)
    interestArticle.appendChild(interestReview)
    interestArticle.appendChild(editInterestButton)
    interestArticle.appendChild(deleteInterestButton)

    return interestArticle
  }
}

export default interest
