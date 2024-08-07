import { useState } from "react";
import Header from "./Header";
import DateGrid from "./DateGrid";

function Calendar() {
  const d = new Date();
  const [month, setMonth] = useState(d.getMonth());
  const [year, setYear] = useState(d.getFullYear());

  const handleDateFocus = () => {
    setYear(d.getFullYear());
    setMonth(d.getMonth());

    const currentDate = new Date();
    const dayTimeStamp = currentDate.setUTCHours(0,0,0,0);

    setTimeout(() => {
      const todayEle = document.getElementById(dayTimeStamp);
      todayEle.scrollIntoView({ behavior: "smooth", block: "end", inline: "start" });
    },0)
  }

  return <div className="w-lvw bg-white">
    <Header month={month} year={year} setMonth={setMonth} setYear={setYear} handleDateFocus={handleDateFocus}/> 
    <DateGrid month={month} year={year} />
  </div>;
}

export default Calendar;
