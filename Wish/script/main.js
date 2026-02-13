document.addEventListener('DOMContentLoaded', function () {
  // Function to fetch and update dynamic data
  const fetchData = () => {
    fetch("customize.json")
      .then((data) => data.json())
      .then((data) => {
        // Fetch dynamic data and update elements
        Object.keys(data).forEach((customData) => {
          if (data[customData] !== "") {
            const element = document.getElementById(customData);
            if (element) {
              if (customData === "imagePath") {
                element.setAttribute("src", data[customData]);
              } else {
                element.innerText = data[customData];
              }
            }
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Function for animations (GSAP)
  const animationTimeline = () => {
    // Ensure elements are found before modifying them
    const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
    const hbd = document.getElementsByClassName("wish-hbd")[0];

    if (textBoxChars && hbd) {
      textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML.split("").join("</span><span>")}</span>`;
      hbd.innerHTML = `<span>${hbd.innerHTML.split("").join("</span><span>")}</span>`;
    } else {
      console.error('Elements not found');
    }

    const tl = gsap.timeline();

    tl.to(".container", 0.1, { visibility: "visible" })
      .from(".one", { opacity: 0, y: 10, duration: 0.7 })
      .from(".two", { opacity: 0, y: 10, duration: 0.4 })
      .to(".one", { opacity: 0, y: 10, duration: 0.7, delay: 2.5 })
      .to(".two", { opacity: 0, y: 10, duration: 0.7, delay: -1 })
      .from(".three", { opacity: 0, y: 10, duration: 0.7 })
      .to(".three", { opacity: 0, y: 10, duration: 0.7, delay: 2 })
      .from(".four", { scale: 0.2, opacity: 0, duration: 0.7 })
      .from(".fake-btn", { scale: 0.2, opacity: 0, duration: 0.3 })
      .staggerTo(".hbd-chatbox span", 0.5, { visibility: "visible" }, 0.05)
      .to(".fake-btn", { backgroundColor: "rgb(127, 206, 248)", duration: 0.1 })
      .to(".four", { scale: 0.2, opacity: 0, y: -150, duration: 0.5, delay: 0.7 })
      .from(".idea-1", { opacity: 0, y: -20, rotationX: 5, skewX: "15deg", duration: 0.7 })
      .to(".idea-1", { opacity: 0, y: 20, rotationY: 5, skewX: "-15deg", duration: 0.7, delay: 1.5 })
      // Continue with other animations...
      .from(".wish h5", { opacity: 0, y: 10, skewX: "-15deg", duration: 0.5, delay: 1.2 })
      .staggerTo(".eight svg", 1.5, { visibility: "visible", opacity: 0, scale: 80, repeat: 3, repeatDelay: 1.4 }, 0.3)
      .to(".six", { opacity: 0, y: 30, zIndex: "-1", duration: 0.5 })
      .staggerFrom(".nine p", { opacity: 0, y: -20, rotationX: 5, skewX: "15deg", duration: 0.7, delay: 1.2 });
  };

  // Run fetchData and then animationTimeline
  const resolveFetch = () => {
    return new Promise((resolve, reject) => {
      fetchData(); // Get dynamic data from customize.json
      resolve("Fetch done!");
    });
  };

  // Start animation after data fetch
  resolveFetch().then(animationTimeline);

  // Event listener for replay button (if exists)
  const replyBtn = document.getElementById("replay");
  if (replyBtn) {
    replyBtn.addEventListener("click", () => {
      gsap.globalTimeline.restart(); // Restart the animation
    });
  }
});
