/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
// frontend/src/context/QueriesContext.js
import { createContext, useContext, useEffect, useState } from "react";

const QueriesContext = createContext();
const initialState = {
  authToken: localStorage.getItem("authToken"),
  queries: [],
  loading: true,
  error: null,
};

export const QueriesProvider = ({ children }) => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState(initialState);

  const fetchQueries = async () => {
    try {
      const authToken = state.authToken;

      const response = await fetch(
        "https://zen-class-lxyk.onrender.com/queries",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setQueries(data);
      } else {
        console.error("Failed to fetch queries");
      }
    } catch (error) {
      console.error("Error fetching queries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQuery = async (values) => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const createdDateTime = `${currentDate} ${currentTime}`;

    try {
      const authToken = localStorage.getItem("authToken");

      const response = await fetch(
        "https://zen-class-lxyk.onrender.com/queries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ ...values, createdDateTime }),
          credentials: "include",
        }
      );

      if (response.ok) {
        // Query created successfully, fetch updated list of queries
        fetchQueries();
      } else {
        const errorData = await response.json();
        console.error("Failed to create query. Server error:", errorData);
      }
    } catch (error) {
      console.error("Error creating query:", error);
    }
  };

  const handleDeleteQuery = async (queryId) => {
    try {
      const authToken = localStorage.getItem("authToken");

      const response = await fetch(
        `https://zen-class-lxyk.onrender.com/queries/${queryId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        // Query deleted successfully, update the UI or fetch updated data
        fetchQueries();
      } else {
        const errorData = await response.json();
        console.error("Failed to delete query. Server error:", errorData);
      }
    } catch (error) {
      console.error("Error deleting query:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch queries when the component mounts
    fetchQueries();
  }, []);

  return (
    <QueriesContext.Provider
      value={{ queries, loading, handleCreateQuery, handleDeleteQuery }}
    >
      {children}
    </QueriesContext.Provider>
  );
};

export const useQueries = () => {
  const context = useContext(QueriesContext);
  if (!context) {
    throw new Error("useQueries must be used within a QueriesProvider");
  }
  return context;
};
