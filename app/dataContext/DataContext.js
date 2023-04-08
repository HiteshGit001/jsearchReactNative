import { useContext, createContext, useState } from "react";

const DataContext = createContext();
export const useData = () => useContext(DataContext);

const DataContextProvider = ({ children }) => {
  const [popularJobs, setPopularJobs] = useState();
  const [nearbyJobs, setNearbyJobs] = useState();
  const [JD, setJD] = useState();
  const value = {
    popularJobs,
    nearbyJobs,
    JD,
    setNearbyJobs,
    setPopularJobs,
    setJD,
  }
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}
export default DataContextProvider;