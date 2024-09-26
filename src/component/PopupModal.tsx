// import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface SchemaOption {
  label: string;
  value: string;
}

interface PopupModalProps {
  closePopup: () => void;
}

const schemaOptions: SchemaOption[] = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

function PopupModal({ closePopup }: PopupModalProps) {
  const [segmentName, setSegmentName] = useState<string>("");
  const [selectedSchemas, setSelectedSchemas] = useState<SchemaOption[]>([]);
  const [availableSchemas, setAvailableSchemas] = useState<SchemaOption[]>(schemaOptions);
  const [currentSchema, setCurrentSchema] = useState<string>("");

  // Add the selected schema to the segment
  const handleAddSchema = (): void => {
    if (currentSchema) {
      const newSchema = availableSchemas.find((option) => option.value === currentSchema);
      if (newSchema) {
        setSelectedSchemas([...selectedSchemas, newSchema]);
        setAvailableSchemas(availableSchemas.filter((option) => option.value !== currentSchema));
        setCurrentSchema("");
      }
    }
  };

  //Extra funtionality: Removes schema from selected list and re-added
  const handleRemoveSchema = (index: number): void => {
    const removedSchema = selectedSchemas[index];
    const updatedSchemas = selectedSchemas.filter((_, i) => i !== index);
    setSelectedSchemas(updatedSchemas);
    setAvailableSchemas([...availableSchemas, removedSchema]);
  };

  // Save the segment after validation
  const handleSave = async (): Promise<void> => {
    if (!segmentName.trim()) {
      toast.error("Please enter a segment name!");
      return;
    }

    if (selectedSchemas.length === 0) {
      toast.error("Please add at least one schema!");
      return;
    }

    const schemaData = selectedSchemas.map((schema) => ({
      [schema.value]: schema.label,
    }));

    const dataToSend = {
      segment_name: segmentName,
      schema: schemaData,
    };

    console.log(dataToSend);
    closePopup();
    toast.success("Segment saved successfully!");

    // Commented due to endpoint error
    // try {
    //   const response = await axios.post("https://webhook.site/", dataToSend);
    //   closePopup();
    //   toast.success(response.data.message || "Segment saved successfully!");
    // } catch (error) {
    //   toast.error("An error occurred while saving the segment!");
    //   console.error(error.message);
    // }
  };

  return (
    <>
      <div className="popup-overlay"></div>
      <div className="popup">
        <div className="header">
          <button className="back-btn" onClick={closePopup}>
            <i className="fa-solid fa-angle-left"></i>
          </button>
          <h3 className="title">Saving Segment</h3>
        </div>
        <div className="popup-inner">
          <div className="input-box">
            <label>Enter the name of the segment</label>
            <input
              type="text"
              placeholder="Name of the segment"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
            />
          </div>
          <p>To save your segment, you need to add schemas to build the query.</p>
          <div className="tasks">
            <div className="user-task">
              <i className="fa-solid fa-circle green" />
              User Tasks
            </div>
            <div className="group-task">
              <i className="fa-solid fa-circle red" />
              Group Tasks
            </div>
          </div>
          <div className="dropdown-box">
            {selectedSchemas.map((schema, index) => (
              <div key={schema.value} className="blue-box-wrapper">
                <div className="blue-box-control-wrapper">
                  <select
                    className="selected-schema"
                    value={schema.value}
                    onChange={(e) => {
                      const updatedSchemas = [...selectedSchemas];
                      const selectedOption = availableSchemas.find(
                        (opt) => opt.value === e.target.value
                      );
                      if (selectedOption) {
                        updatedSchemas[index] = selectedOption;
                        setSelectedSchemas(updatedSchemas);
                        setAvailableSchemas(
                          schemaOptions.filter(
                            (option) =>
                              !updatedSchemas.some((sch) => sch.value === option.value)
                          )
                        );
                      }
                    }}
                  >
                    <option value={schema.value}>{schema.label}</option>
                    {availableSchemas.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="blue-box-action-wrapper">
                  <button className="remove-btn" onClick={() => handleRemoveSchema(index)}>
                    <i className="fa-solid fa-minus minus"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="blue-box-wrapper">
            <div className="blue-box-control-wrapper">
              <select
                className="selected-schema"
                value={currentSchema}
                onChange={(e) => setCurrentSchema(e.target.value)}
              >
                <option disabled value="">
                  Add schema to segment
                </option>
                {availableSchemas.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <button className="add-new" onClick={handleAddSchema}>
              + Add new schema
            </button>
          </div>
        </div>
        <div className="btns-wrapper">
          <button className="save-btn" onClick={handleSave}>
            Save the Segment
          </button>
          <button className="cancel-btn" onClick={closePopup}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default PopupModal;
