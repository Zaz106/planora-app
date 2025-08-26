import React from 'react';
import './problem-agitation.css';

const ProblemAgitation = () => {
  return (
    <section className="problem-agitation">
      <div className="problem-agitation-container">
        <div className="problem-content">
          <div className="problem-header">
            <h2 className="problem-title">
              You want to learn, but can't commit the time
            </h2>
          </div>

          <div className="problem-points">
            <p className="problem-point">
              • 80% abandon courses within the first week because it requires too much time upfront
            </p>
            <p className="problem-point">
              • That expensive course becomes another reminder of what you didn't finish
            </p>
            <p className="problem-point">
              • You're stuck in a cycle of starting strong but never following through
            </p>
          </div>

          <p className="problem-conclusion">
            Sound familiar? What if learning could fit into the gaps in your day instead?
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemAgitation;
