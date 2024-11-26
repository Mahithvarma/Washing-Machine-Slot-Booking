import React, { useEffect, useState } from "react";
import { format, addDays } from "date-fns";
import { host } from "../utils/APIRoutes";
import axios from "axios";

const Slots = () => {
  const [appointments, setAppointments] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const fetchAppointments = async () => {
    try {
      let currentDate = new Date();
      currentDate = format(currentDate, "yyyy-MM-dd");
      let nextWeekDate = addDays(currentDate, 6);
      nextWeekDate = format(nextWeekDate, "yyyy-MM-dd");
      const response = await axios.get(
        `${host}/bookings?startDate=${currentDate}&endDate=${nextWeekDate}`,
        { withCredentials: true }
      );
      const data = await response.data;
      setAppointments(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleRefresh = () => {
    fetchAppointments();
  };

  useEffect(() => {
    setRefresh(false);
    setRefresh(true);
  }, [appointments]);

  const daysOfWeek = [];
  for (let i = 0; i < 7; i++) {
    const date = addDays(new Date(), i);
    daysOfWeek.push({
      date,
      dayName: format(date, "EEEE"),
    });
  }

  const timeSlots = [
    "6 AM - 9 AM",
    "9 AM - 12 PM",
    "12 PM - 3 PM",
    "3 PM - 6 PM",
    "6 PM - 9 PM",
  ];

  const renderTableRows = () => {
    const grid = {};
    timeSlots.forEach((slot) => {
      grid[slot] = {};
      daysOfWeek.forEach((day) => {
        grid[slot][format(day.date, "yyyy-MM-dd")] = [];
      });
    });

    appointments.forEach((appointment) => {
      const { name, time, date } = appointment;
      if (!grid[time][date]) {
        grid[time][date] = [];
      }
      grid[time][date].push(name);
    });

    return timeSlots.map((slot) => (
      <tr key={slot}>
        <td className="bg-blue-100 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
          {slot}
        </td>
        {daysOfWeek.map((day) => {
          return grid[slot][format(day.date, "yyyy-MM-dd")].length > 0 ? (
            <td
              key={`${slot}-${day.date}`}
              className="bg-red-100 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
            >
              {grid[slot][format(day.date, "yyyy-MM-dd")].join(", ")}
            </td>
          ) : (
            <td
              key={`${slot}-${day.date}`}
              className="bg-green-100 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
            ></td>
          );
        })}
      </tr>
    ));
  };

  return (
    <div>
      <div className="flex flex-row w-full justify-between">
        <h1 className="text-4xl font-bold text-center py-10 mx-4">Slot Map</h1>
        <div className="flex flex-col justify-end mx-4">
          <button
            onClick={handleRefresh}
            className=" h-12 mr-20 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800"
          >
            Refresh
          </button>
        </div>
      </div>
      <div className="flex justify-center align-center pb-24 bg-white shadow-2xl rounded-lg">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-s font-medium text-gray-500 uppercase align-center"
                      >
                        Slot
                      </th>
                      {daysOfWeek.map((day) => (
                        <th
                          key={format(day.date, "yyyy-MM-dd")}
                          className="px-6 py-3 text-center text-sm font-medium text-black-500 uppercase"
                        >
                          {format(day.date, "EEE, MMM d")}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {refresh && renderTableRows()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slots;
