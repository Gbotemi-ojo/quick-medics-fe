import React, { useEffect, useState } from 'react';
import Select from 'react-select'; 
import { useNavigate } from 'react-router-dom';
import { EXTERNAL_API_URL } from '../api';
const API_URL = `${EXTERNAL_API_URL}/drugs/categories`;

const FilterSelect = () => {
    const navigate = useNavigate();
    const [options, setOptions] = useState([
        { value: "All", label: "All Categories" }
    ]);

    // Fetch Categories on Mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(API_URL);
                const result = await response.json();
                
                if (result.success && result.data) {
                    // Map backend categories to Select options
                    const apiOptions = result.data.map(cat => ({
                        value: cat.name,
                        label: cat.name.toUpperCase()
                    }));
                    
                    // Add "All" option at the start
                    setOptions([{ value: "All", label: "All Categories" }, ...apiOptions]);
                }
            } catch (error) {
                console.error("Failed to load categories", error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (selectedOption) => {
        if (!selectedOption || selectedOption.value === "All") {
           navigate('/shop'); 
        } else {
           navigate(`/shop?category=${encodeURIComponent(selectedOption.value)}`);
        }
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: "#0f3460",
            color: "white",
            borderRadius: "5px",
            border: "none",
            boxShadow: "none",
            width: "200px",
            height: "40px",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#0f3460" : "white",
            color: state.isSelected ? "white" : "#0f3460",
            "&:hover": {
                backgroundColor: "#0f3460",
                color: "white",
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "white",
        }),
    };

    return (
        <Select
            options={options}
            defaultValue={options[0]}
            styles={customStyles}
            onChange={handleChange}
            placeholder="Select Category..."
        />
    );
};

export default FilterSelect;
