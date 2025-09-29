import React from "react";
import Download from "../assets/download.svg";
export default function LabResults({ lab_results }) {
  return (
    <div className="bg-white p-3 rounded-xl flex flex-col min-h-[400px] max-h-[1000px]">
      <p className="card-title-24pt mb-5">Lab Results</p>
      <div className="overflow-y-auto flex-1">
        {lab_results.map((lab_item, index) => {
          return (
            <div
              key={index}
              className="flex justify-between items-center p-3 border-b border-gray-200 "
            >
              <p className="body-regular-14">{lab_item}</p>
              <img src={Download} alt="download" className="cursor-pointer" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
