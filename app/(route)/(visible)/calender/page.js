"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";

export default function BirthdayCalendar() {
  const [date, setDate] = useState(new Date());
  const [birthdays, setBirthdays] = useState([]);

  useEffect(() => {
    fetchBirthdays();
  }, []);

  const fetchBirthdays = async () => {
    try {
      const res = await fetch("/api/members/birthday");
      const data = await res.json();

      const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.birthday);
        const dateB = new Date(b.birthday);

        // Sort by month (0-11), then day
        if (dateA.getMonth() === dateB.getMonth()) {
          return dateA.getDate() - dateB.getDate();
        }
        return dateA.getMonth() - dateB.getMonth();
      });

      setBirthdays(sortedData);
    } catch (error) {
      console.error("Error fetching birthdays:", error);
    }
  };

  const tileContent = ({ date }) => {
    const formattedDate = format(date, "MM-dd");
    const birthdayPeople = birthdays.filter(
      (member) => format(new Date(member.birthday), "MM-dd") === formattedDate
    );

    if (birthdayPeople.length > 0) {
      return (
        <div className="text-xs font-semibold text-white bg-blue-600 rounded px-1 py-0.5 shadow">
          {birthdayPeople.map((person) => (
            <div key={person._id}>🎂 {person.name}</div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-4 md:p-8 flex flex-col items-center">
      <h1 className="md:text-3xl text-xl font-extrabold text-gray-800 text-center md:mb-6">
        🎉 Birthday Calendar & List
      </h1>

      <div className="w-full flex flex-col md:flex-row gap-6">
        {/* Calendar Card */}
        <div className="flex-1 backdrop-blur-md bg-white/70 shadow-xl rounded-xl p-4 md:p-6">
          <h2 className="md:text-2xl text-xl font-bold text-gray-700 md:mb-4 text-center md:text-left">
            Calendar
          </h2>
          <Calendar
            value={date}
            onChange={setDate}
            tileContent={tileContent}
            className="border-0 rounded-lg shadow-md w-full"
          />
        </div>

        {/* Upcoming Birthdays Card */}
        <div className="flex-1 backdrop-blur-md bg-white/70 shadow-xl rounded-xl p-4 md:p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center md:text-left">
            Upcoming Birthdays
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-gray-200 text-xs uppercase text-gray-600">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Full Birthday</th>
                </tr>
              </thead>
              <tbody>
                {birthdays.map((member) => (
                  <tr
                    key={member._id}
                    className="bg-white border-b hover:bg-gray-100"
                  >
                    <td className="px-4 py-2">{member.name}</td>
                    <td className="px-4 py-2">
                      {format(new Date(member.birthday), "do MMMM yyyy")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-center text-gray-500 text-sm">
            Birthdays are shown in full date format (e.g., 4th April 2002).
          </p>
        </div>
      </div>
    </div>
  );
}
