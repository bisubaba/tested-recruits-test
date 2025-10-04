import React from "react";

export default function ProfileCard({ info }) {
  const informations = [
    {
      title: "Date Of Birth",
      icon: "dob.png",
      value: info.date_of_birth,
    },
    {
      title: "Gender",
      icon: info.gender == "Female" ? "female.png" : "male.png",
      value: info.gender,
    },
    {
      title: "Contact info.",
      icon: "contact.png",
      value: info.phone_number,
    },
    {
      title: "Emergency Contacts",
      icon: "contact.png",
      value: info.emergency_contact,
    },
    {
      title: "Insurance Provider",
      icon: "insurance.png",
      value: info.insurance_type,
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
              <img src={information.icon} alt="" className="w-10 h-10" />
              <div>
                <p className="body-regular-14">{information.title}</p>
                <p className="body-emphasized-14pt">{information.value}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-8">
        <button className="w-42 h-10 bg-[#01F0D0] rounded-full opacity-100 ">
          Show All Information
        </button>
      </div>
    </div>
  );
}
