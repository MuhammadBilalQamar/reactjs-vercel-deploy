import "./App.css";
import { Navbar } from "components";
import SectorListing from "features/sectors/sector-listing";

function App() {
  return (
    <div className="Sectors">
      <Navbar />
      <SectorListing />
    </div>
  );
}

export default App;
