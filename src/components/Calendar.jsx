import React, { useState } from 'react';

const Calendar = ({selectDate, selectedDate}) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const currentDate = new Date();

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month, year) => (new Date(year, month, 1).getDay() + 6) % 7;

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleDateClick = (day) => {
    selectDate(new Date(selectedYear, selectedMonth, day));
  };

  const renderDays = () => {
    const days = [];
    const totalDays = daysInMonth(selectedMonth, selectedYear);
    const firstDay = firstDayOfMonth(selectedMonth, selectedYear);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="m-px size-10"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const isToday = day === currentDate.getDate() && selectedMonth === currentDate.getMonth() && selectedYear === currentDate.getFullYear();
      const isSelected = selectedDate && day === selectedDate.getDate() && selectedMonth === selectedDate.getMonth() && selectedYear === selectedDate.getFullYear();
      days.push(
        <div key={day}>
          <button
            type="button" 
            className={`m-px size-10 flex justify-center items-center border border-transparent text-sm rounded-full hover:border-blue-600 hover:text-blue-600 focus:outline-none focus:border-blue-600 focus:text-blue-600 ${isToday ? 'text-blue-500' : 'text-gray-800'} ${isSelected ? 'bg-blue-100' : ''}`}
            onClick={() => handleDateClick(day)}
          >
            {day}
          </button>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="w-80 flex flex-col bg-white border shadow-lg rounded-xl overflow-hidden">
      <div className="p-3 space-y-0.5">
        <div className="grid grid-cols-5 items-center gap-x-3 mx-1.5 pb-3">
          <div className="col-span-1">
            <button 
              type="button" 
              className="size-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100" 
              aria-label="Previous" 
              onClick={() => setSelectedMonth((prev) => (prev === 0 ? 11 : prev - 1))}
            >
              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
          </div>
          <div className="col-span-3 flex justify-center items-center gap-x-1">
            <div className="relative">
              <select 
                value={selectedMonth} 
                onChange={handleMonthChange} 
                className="relative flex text-nowrap w-full cursor-pointer text-start font-medium text-gray-800 hover:text-blue-600 focus:outline-none focus:text-blue-600"
              >
                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
                  <option key={index} value={index}>{month}</option>
                ))}
              </select>
            </div>
            <span className="hidden text-gray-800">/</span>
            <div className="hidden relative">
              <select 
                value={selectedYear} 
                onChange={handleYearChange} 
                className="relative flex text-nowrap w-full cursor-pointer text-start font-medium text-gray-800 hover:text-blue-600 focus:outline-none focus:text-blue-600"
              >
                {[2023, 2024, 2025, 2026, 2027].map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-span-1 flex justify-end">
            <button 
              type="button" 
              className="size-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100" 
              aria-label="Next" 
              onClick={() => setSelectedMonth((prev) => (prev === 11 ? 0 : prev + 1))}
            >
              <svg className="shrink-0 size-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
        <div className="flex pb-1.5">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day, index) => (
            <span key={index} className="m-px w-10 block text-center text-sm text-gray-500">
              {day}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap">
          {renderDays()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
