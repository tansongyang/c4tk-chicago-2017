import React from 'react';
import './Home.css';

export default function Home(props) {
  return (
    <div className="Home">
      <blockquote className="Home-quote">
        No man is an island entire of itself; every man<br />
        is a piece of the continent, a part of the main;<br />
        if a clod be washed away by the sea, Europe<br />
        is the less, as well as if a promontory were, as<br />
        well as any manner of thy friends or of thine<br />
        own were; any man's death diminishes me,<br />
        because I am involved in mankind.<br />
        And therefore never send to know for whom<br />
        the bell tolls; it tolls for thee.<br />
        <cite>
          Johne Donne
        </cite>
      </blockquote>
      <div className="Home-text">
        <p>
          Let's do something about the division in our world.
        </p>
        <p>
          Let's engage with the people who aren't like us.
        </p>
        <p>
          Let's tear down the walls between us.
        </p>
        <p>
          One conversation at a time.
        </p>
      </div>
    </div>
  );
}

