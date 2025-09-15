import { useState } from "react";

export default function ItemInput({ onSubmit }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const items = text.split(",").map((i) => i.trim().toLowerCase());
    onSubmit(items);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        type="text"
        placeholder="Enter items, e.g. tomatoes, apples, milk"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 w-full"
      />
      <button className="bg-blue-500 text-white p-2 mt-2">Optimize</button>
    </form>
  );
}
