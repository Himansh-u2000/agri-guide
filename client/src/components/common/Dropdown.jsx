import React, { useState } from "react";

const Dropdown = ({ data, label, onChange }) => {
  const [selected, setSelected] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelected(value);
    if (onChange) onChange(value);
  };

  return (
    <div className="w-full md:w-md m-2">
      <label className="block text-gray-700 text-lg font-medium mb-2">{label}</label>
      <select
        value={selected}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg shadow-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="" disabled>Select an option</option>
        {data.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
