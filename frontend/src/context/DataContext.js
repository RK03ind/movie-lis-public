import { createContext, useState } from "react";

export const DataContext = createContext({
  searchData: "",
  setSearchData: () => {},
  listName: "",
  setListName: () => {},
});

const DataProvider = ({ children }) => {
  const [searchData, setSearchData] = useState("");
  const [listName, setListName] = useState("");

  const contextData = {
    searchData: searchData,
    setSearchData: setSearchData,
    listName: listName,
    setListName: setListName,
  };

  return (
    <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
  );
};

export default DataProvider;
