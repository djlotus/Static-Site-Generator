if (document.querySelector("#counter")) {
   const counterElement = document.querySelector("#counter");

   const counters = document.querySelectorAll(".counter");

   let counterObserver = new IntersectionObserver(
      (entries, observer) => {
         entries.forEach((entry) => {
            counters.forEach((counter) => {
               counter.innerText = "0";
               const updateCounter = () => {
                  const target = +counter.getAttribute("data-target");
                  const count = +counter.innerText;
                  const increment = target / 200;
                  if (count < target) {
                     counter.innerText = `${Math.ceil(count + increment)}`;
                     setTimeout(updateCounter, 1);
                  } else counter.innerText = target;
               };
               updateCounter();
            });
         });
      },
      { threshold: 0.5 }
   );

   counterObserver.observe(counterElement);
}
