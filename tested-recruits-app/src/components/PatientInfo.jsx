import React from "react";
import DiagnosticList from "./DiagnosticList";
import LabResults from "./LabResults";
import ProfileCard from "./ProfileCard";

export default function PatientInfo({ info }) {
  return (
    <div className="flex gap-5 h-full overflow-hidden">
      <DiagnosticList diagnostic_list={info.diagnostic_list} />
      <div className="w-1/2 flex flex-col gap-5 h-full min-h-0">
        <ProfileCard info={info} />
        <LabResults lab_results={info.lab_results} />
      </div>
    </div>
  );
}
