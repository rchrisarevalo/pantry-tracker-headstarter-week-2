const navToggle = () => {
    // Access the div element of the mobile nav
    // based on its id tag.
    const nav = document.getElementById("mobile-nav")

    // If the nav element is not null, then...
    if (nav) {
        // Check to see if the list of classes it was defined
        // with using Tailwind has the property, "left-full",
        // which indicates that the nav is currently closed.
        //
        // If it does, then add a transition styling while
        // also removing left-full to allow for the addition
        // of the left-0 property, which allows for a sliding
        // animation to take effect to open the mobile
        // navigation bar.
        if (nav.classList.contains("left-full")) {
            nav.style.transition = '.5s'
            nav.classList.remove("left-full")
            nav.classList.add("left-0")
        } 
        // Otherwise, close the mobile navigation bar
        // by removing the left-0 and left-full properties
        // while simultaneously applying the transition
        // property to allow for the same sliding effect
        // described above to take effect.
        else {
            nav.style.transition = '.5s'
            nav.classList.remove("left-0")
            nav.classList.add("left-full")
        }
    } 
    // Otherwise, throw an error saying that the navigation
    // bar cannot be opened.
    else {
        throw new Error("Could not open navigation bar.")
    }
}

export default navToggle;