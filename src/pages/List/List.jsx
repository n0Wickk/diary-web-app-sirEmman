import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link
import { useParams } from "react-router-dom";

function List() {
  const navigate = useNavigate();
  const [diaryEntries, setDiaryEntries] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Fetch diary entries from the API in ascending order
    const fetchDiaryEntries = async () => {
      try {
        const response = await fetch(
          `http://localhost/api/v1/diary/read_diary_entries.php?userID=${userId}`
        );

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            // Sort entries in ascending order by date
            const sortedEntries = data.entries.sort(
              (a, b) => new Date(a.entry_time) - new Date(b.entry_time)
            );
            setDiaryEntries(sortedEntries);
          } else {
            console.error(data.message);
          }
        } else {
          console.error("Failed to fetch diary entries.");
        }
      } catch (error) {
        console.error(`An error occurred: ${error.message}`);
      }
    };

    fetchDiaryEntries();
  }, []);

  return (
    <div className="flex flex-wrap">
      {diaryEntries.map((entry) => (
        <div
          key={entry.id}
          className="w-full p-4"
          // Add an onClick event to navigate to the Entry component with the entry ID as a parameter
          onClick={() => navigate(`/entry/${entry.id}`)}
        >
          <div className="border border-black-400 card-shadow rounded-lg  p-4">
            <h2 className="text-xl font-semibold">{entry.title}</h2>
            <p className="mt-2">{entry.content}</p>
            <p className="mt-2 text-sm text-gray-500">
              Date: {entry.entry_time}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Category: {entry.category}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default List;
