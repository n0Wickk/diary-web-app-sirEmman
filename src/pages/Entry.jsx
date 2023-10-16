import { useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";

export default function Entry() {
  const { title } = useParams();
  const [entryTitle, setEntryTitle] = useState(title || ""); // Initialize with title parameter, or an empty string

  const handleTitleChange = (e) => {
    setEntryTitle(e.target.value);
  };
  return (
    <main className="px-4 py-4">
      <div>
        <h2 className="font-semibold">Title</h2>
        <input
          type="text"
          placeholder="Add a title to this entry"
          value={entryTitle} // Bind value to entryTitle state
          onChange={handleTitleChange} // Add an onChange handler
          className="w-full p-4 focus:outline outline-blue-400 rounded-xl"
        />
      </div>
      <div className="mt-4">
        <h2 className="font-semibold">Story</h2>
        <textarea
          name="story"
          id=""
          cols="30"
          rows="10"
          placeholder="Write Something..."
          className="p-4 w-full focus:outline outline-blue-400 rounded-xl"
        ></textarea>
      </div>
      <div className="flex gap-4">
        <select className="w-full p-4 bg-grey-200 focus:outline outline-blue-400 rounded-full">
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="School">School</option>
        </select>
        <button className="bg-blue-400 text-white-400 py-4 px-8 rounded-full">
          Submit
        </button>
      </div>
    </main>
  );
}
