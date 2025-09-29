import { useState } from "react";
import DiagnosticList from "./components/DiagnosticList";
import NavBar from "./components/NavBar";
import PatientInfo from "./components/PatientInfo";
import PatientsList from "./components/PatientsList";
import { useAPI } from "./hooks/useApi";

function App() {
  const { data: patient, loading, error } = useAPI();
  const [selectedPatientIndex, setSelectedPatientIndex] = useState(0);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handlePatientSelect = (index) => {
    setSelectedPatientIndex(index);
  };

  // Check if patient data exists and has items
  if (patient && patient.length > 0) {
    return (
      <div className="p-5 bg-[#F6F7F8] h-screen flex flex-col">
        <NavBar />
        <main className="flex flex-col lg:flex-row gap-5 mt-5 flex-1 lg:overflow-hidden">
          <PatientsList
            patients={patient}
            selectedIndex={selectedPatientIndex}
            onPatientSelect={handlePatientSelect}
          />
          <PatientInfo info={patient[selectedPatientIndex]} />
        </main>
      </div>
    );
  }

  // Return this if no patient data
  return <div>No patient data available</div>;
}

export default App;
