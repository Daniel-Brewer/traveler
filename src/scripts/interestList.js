// This component will get the data, build the HTML from the data and append it to the DOM.

// To get the data, we will use the interestCollection component.
import interestCollection from "./interestCollection"
// To build the HTML for each object in the array of interest(which is what the data coming from the API becomes once we parse it), we will use the interest component.
import interest from "./interest"

const interestList = {
  travelerify(){
    // 1. Get data
    // The getAllinterests method will do a fetch and return a promise. This call will return the data from the API in the response.
    interestCollection.getAllInterests()
    .then(allInterests => {

      // An empty document fragment
      let interestDocFragment = document.createDocumentFragment()

      // 2. Iterate over data and build HTML for each item
      // We loop over the array of objects returned from our API and for each obect, we make a call to the interestBuilder method in the interest module. This method takes a interest object as an argument and returns an HTML component. Once we have that HTML, we append it to our document fragment so that it is slowly built up. By the end of the forEach loop, our document fragment contains all the HTML for all our data.
      allInterests.forEach(interestItem => {
        let interestHtml = interest.interestBuilder(interestItem)
        interestDocFragment.appendChild(interestHtml)
      })
      
      // 3. Append the HTML to the DOM
      // We get a reference to a HTML element with the class "output" and append our document fragment to that element. Because the HTML element with class "output" is already on the DOM, the HTML in the document fragment is appended to the DOM.
      let outputArticle = document.querySelector(".output")

      //This while loop essentially removes all child nodes of an element until the element has no child nodes left. It is equivalent to the following:
      // outputArticle.innerHTML = ""

      while (outputArticle.firstChild) {
        outputArticle.removeChild(outputArticle.firstChild);
      }
      outputArticle.appendChild(interestDocFragment)

    })
  }
}

export default interestList
