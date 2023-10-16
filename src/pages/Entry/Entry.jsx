import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Entry() {
  const { title } = useParams();
  const [entryTitle, setEntryTitle] = useState(title || "");
  const [entryDate, setEntryDate] = useState(""); // Initialize with an empty string
  const [entryStory, setEntryStory] = useState("");
  const [entryCategory, setEntryCategory] = useState("Personal"); // Default category

  const handleTitleChange = (e) => {
    setEntryTitle(e.target.value);
  };

  useEffect(() => {
    // Automatically set the current date as the entry date
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    setEntryDate(formattedDate);
  }, []);

  const handleStoryChange = (e) => {
    setEntryStory(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setEntryCategory(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Check if the title and story are not empty
    if (entryTitle.trim() === "" || entryStory.trim() === "") {
      alert("Title and Story cannot be empty. Please fill them in.");
      return;
    }

    // Create an object to represent the entry
    const entry = {
      title: entryTitle,
      date: entryDate,
      story: entryStory,
      category: entryCategory,
    };

    // Store the entry data in local storage
    localStorage.setItem(`entry-${entryTitle}`, JSON.stringify(entry));

    // Reset the form fields
    setEntryTitle("");
    setEntryStory("");
    setEntryCategory("Personal"); // Reset to the default category
  };

  return (
    <main className="px-4 py-4">
      <form onSubmit={handleFormSubmit}>
        <div>
          <h2 className="font-semibold">Title</h2>
          <input
            type="text"
            placeholder="Add a title to this entry"
            value={entryTitle}
            onChange={handleTitleChange}
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
            value={entryStory}
            onChange={handleStoryChange}
            className="p-4 w-full focus:outline outline-blue-400 rounded-xl"
          ></textarea>
        </div>

        <div className="flex gap-4">
          <select
            value={entryCategory}
            onChange={handleCategoryChange}
            className="w-full p-4 bg-grey-200 focus:outline outline-blue-400 rounded-full"
          >
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="School">School</option>
          </select>
          <button
            type="submit"
            className="bg-blue-400 text-white-400 py-4 px-8 rounded-full"
          >
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}
