import React from "react";

export default function ProfileCard({ info }) {
  const informations = [
    {
      title: "Date Of Birth",
      icon: "",
      value: info.date_of_birth,
    },
    {
      title: "Date Of Birth",
      icon: "",
      value: info.date_of_birth,
    },
    {
      title: "Date Of Birth",
      icon: "",
      value: info.date_of_birth,
    },
    {
      title: "Date Of Birth",
      icon: "",
      value: info.date_of_birth,
    },
    {
      title: "Date Of Birth",
      icon: "",
      value: info.date_of_birth,
    },
  ];
  return (
    <div className="p-5 bg-white rounded-xl flex-shrink-0">
      <div className="flex flex-col items-center mb-5">
        <img
          src={info.profile_picture}
          alt="profile_picture"
          className=" rounded-full object-cover mb-3"
        />
        <p className="card-title-24pt">{info.name}</p>
      </div>
      <div className="space-y-3">
        {informations.map((information, index) => {
          return (
            <div key={index} className="flex items-center gap-3">
              <img src={information.icon} alt="" className="w-5 h-5" />
              <div>
                <p className="body-regular-14">{information.title}</p>
                <p className="body-emphasized-14pt">{information.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
