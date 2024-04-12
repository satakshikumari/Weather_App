import { useGetCities } from "../services/apiCities";
import Logo from "./Logo";

export default function Navbar() {
  
  const { cities, isCitiesLoading, error } = useGetCities();
  console.log(cities, isCitiesLoading, error);
  
  return (
    <div className="bg-indigo-400 flex justify-between items-center px-4 sm:px-6 lg:px-8 py-2">
      <Logo />
      <div className="flex items-center"> {/* Container for Logo and SearchBar */}
        {/* <SearchBar /> */}
      </div>
    </div>
  );
}
