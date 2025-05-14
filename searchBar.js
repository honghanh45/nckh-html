import React, { useState } from "react";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="Tìm kiếm bệnh viện, phòng khám..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button>Tìm kiếm</button>
    </div>
  );
}

export default SearchBar;