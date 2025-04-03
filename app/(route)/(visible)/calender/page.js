"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";

const members = [
  { name: "Nilesh", birthday: "2000-01-10" },
  { name: "Pankaj", birthday: "2000-02-15" },
  { name: "Vikash", birthday: "2000-03-14" },
  { name: "Jeevan", birthday: "2000-03-16" },
  { name: "Rishu", birthday: "2000-04-02" },
  { name: "Nikhil", birthday: "2000-04-16" },
  { name: "Akash", birthday: "2000-04-30" },
  { name: "Ritik", birthday: "2000-05-01" },
  { name: "Sonu", birthday: "2000-05-15" },
  { name: "Sourav", birthday: "2000-05-16" },
  { name: "Shubham", birthday: "2000-05-21" },
  { name: "Ujjwal", birthday: "2000-05-25" },
  { name: "Shivam", birthday: "2000-07-12" },
  { name: "Suraj", birthday: "2000-08-06" },
  { name: "Ayush", birthday: "2000-09-13" },
  { name: "Ashwani", birthday: "2000-10-06" },
  { name: "Golden", birthday: "2000-01-03" },
];

export default function BirthdayCalendar() {
  const [date, setDate] = useState(new Date());

  const tileContent = ({ date }) => {
    const formattedDate = format(date, "MM-dd");
    const birthdayMember = members.find(
      (member) => format(new Date(member.birthday), "MM-dd") === formattedDate
    );

    return birthdayMember ? (
      <div className="bg-blue-500 text-white rounded-lg p-1 text-xs font-semibold shadow-md">
        🎂 {birthdayMember.name}
      </div>
    ) : null;
  };

  return (
    <div className="md:min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 md:p-8">
      <div className="backdrop-blur-lg bg-white/50 shadow-xl rounded-xl md:p-6 w-full max-w-2xl flex flex-col items-center justify-center">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 my-4">
          🎉 Birthday Calendar
        </h1>
        <Calendar
          value={date}
          onChange={setDate}
          tileContent={tileContent}
          className="border-0 shadow-lg rounded-lg overflow-hidden w-full mb-5"
        />
      </div>
    </div>
  );
}
