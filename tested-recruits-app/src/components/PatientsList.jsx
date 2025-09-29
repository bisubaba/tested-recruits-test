import React from "react";
import Search from "../assets/search.svg";
import MoreHoriz from "../assets/more_horiz.svg";
import Profile from "../assets/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc.png";
export default function PatientsList({
  patients,
  selectedIndex,
  onPatientSelect,
}) {
  return (
    <div className="bg-white py-3 rounded-xl lg:min-w-[300px] flex flex-col">
      <div className="flex justify-between mb-5 px-3">
        <p className="card-title-24pt ">Patients</p>
        <img src={Search} alt="search" />
      </div>
      <div className="space-y-5 overflow-y-auto flex-1">
        {patients.map((patient, index) => {
          return (
            <div
              className={`flex justify-between  items-center w-9/10  p-3 ${
                index == selectedIndex ? "active2" : ""
              }`
            }
              onClick={() => onPatientSelect(index)}
            >
              <div className="flex space-x-2 items-center">
                <img
                  src={patient.profile_picture}
                  alt={`${patient.profile_picture}`}
                  className="h-10"
                />
                <div>
                  <p className="body-emphasized-14pt">{patient.name}</p>
                  <p className="body-secondary-info-14pt">
                    {patient.gender}, {patient.age}
                  </p>
                </div>
              </div>
              <img src={MoreHoriz} alt="more_horizontal_image" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
