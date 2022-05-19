import { Description } from "./description";
var desc = new Description();

export const displayBookDescription = async () => {
  try {
    // take all description-buttons
    const descriptionButton = document.querySelectorAll(".description-button");
    // addEventListener
    descriptionButton.forEach((button) => {
      button.addEventListener("click", (e) => {
        let key = e.target.id;

        desc.showPostByUserKey(key);
      });
    });
  } catch (error) {
    log("ERROR: displayBookDescription function");
    logErrors(error);
  }
};
