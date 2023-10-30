import React, { useEffect, useState } from "react";

function DiaryEntries() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    // Make a GET request to the API endpoint
    fetch("http://localhost/api/read_diary_entries.php?userID=1") // Replace 'your-api-url' and '123' with the actual values
      .then((response) => response.json())
      .then((data) => {
        // Check if the response has a 'success' field and entries
        if (data.success && Array.isArray(data.entries)) {
          setEntries(data.entries);
        } else {
          console.error("Error fetching diary entries:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching diary entries:", error);
      });
  }, []);

  console.log(entries);

  return (
    <div>
      <h1>Diary Entries</h1>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            <br />
            <h2>{entry.title}</h2>
            <p>{entry.content}</p>
            <p>Category: {entry.category}</p>
            <p>Entry Time: {entry.entry_time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DiaryEntries;
