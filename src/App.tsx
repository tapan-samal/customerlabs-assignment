import { useState } from "react";
import PopupModal from "./component/PopupModal";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const handleSaveSegmentClick = () : void => {
    setIsPopupOpen(true);
  };

  return (
    <div className="App">
      <div className="header">
        <i className="fa-solid fa-angle-left"></i>
        <h3>View Audience</h3>
      </div>
      <button className="save-segment" onClick={handleSaveSegmentClick}>
        Save segment
      </button>
      {isPopupOpen && <PopupModal closePopup={() => setIsPopupOpen(false)} />}
      <Toaster />
    </div>
  );
}

export default App;
