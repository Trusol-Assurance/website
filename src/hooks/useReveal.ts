// "use client";

// import { useEffect } from "react";

// /**
//  * Port of the original IntersectionObserver that adds `.in` to `.reveal`
//  * elements as they scroll into view.
//  *
//  * Note: the source HTML ships every reveal element with `in` already applied,
//  * so nothing actually fades on first load — this observer only matters for any
//  * element rendered without it. Mounted once, at the page root.
//  */
// export function useReveal() {
//   useEffect(() => {
//     const io = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((e) => {
//           if (e.isIntersecting) {
//             e.target.classList.add("in");
//             io.unobserve(e.target);
//           }
//         });
//       },
//       { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
//     );

//     document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
//     return () => io.disconnect();
//   }, []);
// }
