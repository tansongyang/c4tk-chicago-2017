import React from 'react';
import './Home.css';

export default function Home(props) {
  return (
    <div className="Home">
      <blockquote className="Home-quote">
No man is an island,<br />
Entire of itself;<br />
Every man is a piece of the continent, <br />
A part of the main.<br />
If a clod be washed away by the sea,<br />
Europe is the less,<br />
As well as if a promontory were:<br />
As well as if a manor of thy friend's<br />
Or of thine own were.<br />
Any man's death diminishes me,<br />
Because I am involved in mankind.<br />
And therefore never send to know for whom the bell tolls;<br />
It tolls for thee.<br />
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

