import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import { applyPatch } from "fast-json-patch";
import { initialBaseObject, initialPatches } from "../src/utils/data";

const App = () => {
  const [baseObject, setBaseObject] = useState(initialBaseObject);
  const [patches, setPatches] = useState(initialPatches);

  const handleAccept = (index) => {
    const patch = patches[index];
    const { newDocument } = applyPatch(baseObject, [patch]);
    setBaseObject(newDocument);
    setPatches(patches.filter((_, i) => i !== index));
  };

  const handleReject = (index) => {
    setPatches(patches.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Base Object</h1>
      <pre>{JSON.stringify(baseObject, null, 2)}</pre>
      <h2>Patch Operations</h2>
      {patches.map((patch, index) => (
        <div key={index}>
          <pre>{JSON.stringify(patch, null, 2)}</pre>
          <button onClick={() => handleAccept(index)}>Accept</button>
          <button onClick={() => handleReject(index)}>Reject</button>
        </div>
      ))}
    </div>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
