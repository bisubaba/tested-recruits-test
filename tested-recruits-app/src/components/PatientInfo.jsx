import React from "react";
import DiagnosticList from "./DiagnosticList";
import LabResults from "./LabResults";
import ProfileCard from "./ProfileCard";

export default function PatientInfo({ info }) {
  return (
    <div className="flex flex-col md:flex-row gap-5 flex-1 overflow-y-auto">
      <DiagnosticList diagnostic_list={info.diagnostic_list} />
      <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col gap-5">
        <ProfileCard info={info} />
        <LabResults lab_results={info.lab_results} />
      </div>
    </div>
  );
}
