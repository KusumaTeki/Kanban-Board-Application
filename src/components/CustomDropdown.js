import React, { useRef, useState, useEffect } from "react";
import "../styles/CustomDropdown.css";
import {ReactComponent as DisplayIcon} from '../icons_FEtask/Display.svg'
import {ReactComponent as DownIcon} from '../icons_FEtask/down.svg'


const CustomDropdown = ({ onGroupingChange, onSortingChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);


  const handleGroupingSelect = (event) => {
    onGroupingChange(event.target.value); 
  };

  const handleSortingSelect = (event) => {
    onSortingChange(event.target.value); 
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false); 
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <button onClick={handleToggleDropdown} className="dropdown-btn">
        <DisplayIcon className="displayicon"/>
        Display
        <DownIcon className="downicon"/>
      </button>
      {isDropdownOpen && (
        <div className="dropdown-content">
          <div className="grouping-section">
             <label htmlFor="grouping" className="group-by-text">Grouping:</label> 

            <select id="grouping" onChange={handleGroupingSelect}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="sorting-section">
            <label htmlFor="sorting" className="sort-by-text">Ordering:</label>
            <select id="sorting" onChange={handleSortingSelect}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default CustomDropdown;
