import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import { applyPatch } from "fast-json-patch";
import { initialBaseObject, initialPatches } from "../src/utils/data";

const App = () => {
  const [baseObject, setBaseObject] = useState(initialBaseObject);
  const [patches, setPatches] = useState(initialPatches);
  const [acceptedPatches, setAcceptedPatches] = useState([]);
  const [rejectedPatches, setRejectedPatches] = useState([]);

  const handleAccept = (index) => {
    const patch = patches[index];
    const { newDocument } = applyPatch(baseObject, [patch]);
    setBaseObject(newDocument);
    setAcceptedPatches([...acceptedPatches, patch]);
    setPatches(patches.filter((_, i) => i !== index));
  };

  const handleReject = (index) => {
    const patch = patches[index];
    setRejectedPatches([...rejectedPatches, patch]);
    setPatches(patches.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <div className="column">
        <h1>Base Object</h1>
        <div className="scroll-box">
          <pre>{JSON.stringify(baseObject, null, 2)}</pre>
        </div>
      </div>
      <div className="column">
        <h1>JSON Patch</h1>
        <div className="scroll-box">
          {patches.map((patch, index) => (
            <div key={index} className="patch">
              <pre>{JSON.stringify(patch, null, 2)}</pre>
              <button onClick={() => handleAccept(index)}>Accept</button>
              <button onClick={() => handleReject(index)}>Reject</button>
            </div>
          ))}
        </div>
        <h2>Accepted Patches</h2>
        <div className="scroll-box">
          {acceptedPatches.map((patch, index) => (
            <div key={index} className="patch accepted">
              <pre>{JSON.stringify(patch, null, 2)}</pre>
            </div>
          ))}
        </div>
        <h2>Rejected Patches</h2>
        <div className="scroll-box">
          {rejectedPatches.map((patch, index) => (
            <div key={index} className="patch rejected">
              <pre>{JSON.stringify(patch, null, 2)}</pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
