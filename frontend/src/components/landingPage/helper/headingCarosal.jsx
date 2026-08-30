import { useState, useEffect } from "react";

const headlines = [
  "Ship better code.\nBefore bugs ship with it.",
  "Catch bugs early.\nBefore they reach production.",
  "Review code like a senior engineer.\nInstantly, every time.",
  "Find vulnerabilities.\nBefore attackers \nfind them first.",
  "Cleaner architecture.\nOne review at a time.",
];

function AnimatedHeadline() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlines.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 key={index} className="headline-carousel">
      {headlines[index].split("\n").map((line, i) => (
        <span key={i}>
          {line}
          <br />
        </span>
      ))}
    </h1>
  );
}

export default AnimatedHeadline;
