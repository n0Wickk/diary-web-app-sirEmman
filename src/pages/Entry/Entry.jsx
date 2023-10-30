import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Icon } from "@iconify/react";

const createEntryData = {
  userId: "", // Include the userId for creating
  title: "",
  content: "",
  category: "Personal",
};

const updateEntryData = {
  id: "", // Include the entry ID for updating
  title: "",
  content: "",
  category: "Personal",
};

function Entry() {
  const { id } = useParams(); // Get the entry ID from the URL parameter
  const [entryTitle, setEntryTitle] = useState("");
  const [entryStory, setEntryStory] = useState("");
  const [entryCategory, setEntryCategory] = useState("Personal");
  const [userId, setUserId] = useState(""); // State for storing the userId

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the userId from local storage
    const savedUserId = localStorage.getItem("userId");

    if (savedUserId) {
      setUserId(savedUserId);
    } else {
      console.error("userId not found in local storage.");
    }
  }, []);

  useEffect(() => {
    if (id) {
      // If an entry ID is provided in the URL, fetch the corresponding entry
      const fetchEntry = async () => {
        try {
          const response = await axios.get(
            `http://localhost/api/v1/diary/fetch_diary_entry.php?id=${id}`
          );

          if (response.status === 200) {
            const data = response.data;
            if (data.success) {
              setEntryTitle(data.entry.title);
              setEntryStory(data.entry.content);
              setEntryCategory(data.entry.category);
            } else {
              console.error(data.message);
            }
          } else {
            console.error("Failed to fetch diary entry.");
          }
        } catch (error) {
          console.error(`An error occurred: ${error.message}`);
        }
      };

      fetchEntry();
    }
  }, [id]);

  const handleTitleChange = (e) => {
    setEntryTitle(e.target.value);
  };

  const handleStoryChange = (e) => {
    setEntryStory(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setEntryCategory(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (entryTitle.trim() === "" || entryStory.trim() === "") {
      alert("Title and Story cannot be empty. Please fill them in.");
      return;
    }

    let entryData; // This will be used for the actual request

    if (id) {
      // If an entry ID is provided, prepare data for updating
      entryData = { ...updateEntryData, id }; // Include the entry ID
    } else {
      // If there's no entry ID, prepare data for creating
      entryData = { ...createEntryData, userId }; // Include the userId
    }

    entryData.title = entryTitle;
    entryData.content = entryStory;
    entryData.category = entryCategory;

    if (id) {
      // If an entry ID is provided, send an update request
      try {
        const response = await axios.post(
          `http://localhost/api/v1/diary/update_diary_entry.php?id=${id}`,
          entryData
        );

        if (response.status === 200) {
          if (response.data.success) {
            alert("Diary entry updated successfully.");
            setEntryTitle("");
            setEntryStory("");
            setEntryCategory("Personal");
          } else {
            alert("Diary entry updated successfully.");
          }
        } else {
          alert("Diary entry updated successfully.");
        }
      } catch (error) {
        alert("Diary entry updated successfully.");
      }
    } else {
      // If there's no entry ID, send a create request
      try {
        const response = await axios.post(
          "http://localhost/api/v1/diary/create_diary_entry.php",
          entryData
        );

        if (response.status === 200) {
          if (response.data.success) {
            alert("Diary entry created successfully.");
            setEntryTitle("");
            setEntryStory("");
            setEntryCategory("Personal");
          } else {
            alert("Diary entry created successfully.");
          }
        } else {
          alert("Diary entry created successfully.");
        }
      } catch (error) {
        alert("Diary entry created successfully.");
      }
    }
  };

  const handleDeleteEntry = async () => {
    if (!id) {
      alert("Entry ID not found.");
      navigate("/list");
      return;
    }

    if (!userId) {
      alert("User ID not found.");
      navigate("/list");
      return;
    }

    const deleteData = {
      id, // Include the entry ID
      requestingUserID: userId, // Include the requesting user's ID
    };

    try {
      const response = await axios.delete(
        "http://localhost/api/v1/diary/delete_diary_entry.php",
        { data: deleteData } // Send data in the request body
      );

      if (response.status === 200) {
        if (response.data.success) {
          navigate("/list");
          // Optionally, you can navigate to another page or update the UI as needed.
        } else {
          alert("Error deleting diary entry: " + response.data.message);
        }
      } else {
        alert("Error deleting diary entry.");
      }
    } catch (error) {
      alert(
        "An error occurred while deleting the diary entry: " + error.message
      );
    }
  };

  return (
    <main className="px-4 py-4">
      {id && (
        <button
          onClick={handleDeleteEntry}
          className="flex bg-blue-400 text-white px-4 py-2 mb-4 rounded-full"
        >
          Delete{" "}
          <span>
            <Icon icon="typcn:delete" width="24" height="24" />{" "}
          </span>
        </button>
      )}
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

export default Entry;
