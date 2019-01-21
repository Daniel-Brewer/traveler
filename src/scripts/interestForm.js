import interestCollection from "./interestCollection"
import interestList from "./interestList"

const interestForm = {

    // This module will build a form and append it to the DOM. The form will contain input fields for a user to add a new interest to their refrigerator and a button with an event listener that will listen for the click
    createAndAppendForm() {
        // 1. Build HTML form
        let formHeader = document.createElement("h3")
        formHeader.textContent = "Add a Point of Interest"

        let interestNameField = document.createElement("fieldset")

        let interestNameLabel = document.createElement("label")
        interestNameLabel.textContent = "Name"
        interestNameLabel.setAttribute("for", "interest__name")
        let interestNameInput = document.createElement("input")
        interestNameInput.setAttribute("id", "interest__name")
        interestNameInput.setAttribute("name", "interest__name")

        interestNameField.appendChild(interestNameLabel)
        interestNameField.appendChild(interestNameInput)

        let interestDescriptionField = document.createElement("fieldset")

        let interestDescriptionLabel = document.createElement("label")
        interestDescriptionLabel.textContent = "Description"
        interestDescriptionLabel.setAttribute("for", "interest__description")
        let interestDescriptionInput = document.createElement("input")
        interestDescriptionInput.setAttribute("id", "interest__description")
        interestDescriptionInput.setAttribute("name", "interest__description")

        interestDescriptionField.appendChild(interestDescriptionLabel)
        interestDescriptionField.appendChild(interestDescriptionInput)

        let interestCostField = document.createElement("fieldset")

        let interestCostLabel = document.createElement("label")
        interestCostLabel.textContent = "Cost"
        interestCostLabel.setAttribute("for", "interest__cost")
        let interestCostInput = document.createElement("input")
        interestCostInput.setAttribute("id", "interest__cost")
        interestCostInput.setAttribute("name", "interest__cost")

        interestCostField.appendChild(interestCostLabel)
        interestCostField.appendChild(interestCostInput)

        let placesDropdown = document.createElement("select");
        placesDropdown.setAttribute("id", "mySelect");
        interestCollection.getAllPlaces()
            .then(places => {

                let buenosAiresOption = document.createElement("option");
                buenosAiresOption.setAttribute("value", `${places[0].id}`)
                buenosAiresOption.textContent = `${places[0].name}`

                let rioOption = document.createElement("option");
                rioOption.setAttribute("value", `${places[1].id}`)
                rioOption.textContent = `${places[1].name}`


                let santiagoOption = document.createElement("option");
                santiagoOption.setAttribute("value", `${places[2].id}`)
                santiagoOption.textContent = `${places[2].name}`

                placesDropdown.appendChild(buenosAiresOption)
                placesDropdown.appendChild(rioOption)
                placesDropdown.appendChild(santiagoOption)
            // })

                let interestSaveButton = document.createElement("button");
                interestSaveButton.setAttribute("class", "interestSaveButton");
                interestSaveButton.textContent = "Save";
                // interestForm.appendChild(interestSaveButton);

                interestSaveButton.addEventListener("click", interestForm.handleAddNewInterest)
            

                // 3. Append the HTML form to the DOM
                //Notice that I have added an article element to my index.html with the class "form".
                let interestFormFragment = document.createDocumentFragment()
                interestFormFragment.appendChild(formHeader)
                interestFormFragment.appendChild(interestNameField)
                interestFormFragment.appendChild(interestDescriptionField)
                interestFormFragment.appendChild(interestCostField)
                interestFormFragment.appendChild(placesDropdown)
                interestFormFragment.appendChild(interestSaveButton)

                let formArticle = document.querySelector(".form")
                formArticle.appendChild(interestFormFragment)
            })
            },
                // This module will also contain the function that executes when the button in the form is clicked. When the button in the form is clicked, the following will happen:
                handleAddNewInterest(event) {
                    // 1. Get user input that user entered
                    let inputInterestName = document.querySelector("#interest__name").value
    let inputInterestDescription = document.querySelector("#interest__Description").value
    let inputInterestCost = document.querySelector("#interest__cost").value
    let placeId = document.querySelector("#mySelect").value

    // 2. Create a new object with the same structure 

    let newInterest = {
                        name: inputInterestName,
                        description: inputInterestDescription,
                        cost: inputInterestCost,
                        placeId: placeId,
                        
                    }

    // 3. Call the method(postNewinterest) with the fetch request to POST to the API and pass it the object we created in the previous step

    interestCollection.postNewinterest(newInterest)
                        .then(response => {
                            interestList.travelerify()
                        })
                }
            }

export default interestForm
