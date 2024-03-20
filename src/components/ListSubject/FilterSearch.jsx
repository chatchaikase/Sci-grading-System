"use client";
import { Icon } from "@iconify/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function FilterSearch() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={toggleCollapse}
      >
        {isCollapsed ? 'Expand' : 'Collapse'}
      </button>
      {!isCollapsed && (
        <div className="p-4 mt-4 border border-gray-200 rounded">
          <input
            type="text"
            className="input input-bordered mb-4"
            placeholder="Enter your text"
          />
          <select className="select select-bordered mb-4">
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
          {/* Add more inputs, dropdowns, etc. */}
        </div>
      )}
    </div>
  );
}
