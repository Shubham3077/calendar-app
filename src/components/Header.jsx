import ChevronLeftIcon from "../assets/left.svg?react"
import ChevronRightIcon from "../assets/right.svg?react"

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

function Header({ month, year, setMonth, setYear, handleDateFocus }) {
    const handlePrevMonth = () => {
        if(month - 1 < 0){
            setMonth(11)
            setYear(year - 1)
        } else {
            setMonth(month - 1)
        }
    }

    const handleNextMonth = () => {
        if(month + 1 > 11){
            setMonth(0)
            setYear(year + 1)
        } else {
            setMonth(month + 1)
        }
    }

    return <div className="bg-gray-100 flex justify-between py-2 px-3">
        <p className="text-2xl text-blue-500">{months[month]} {year}</p>
        <div className="flex items-center">
            <ChevronLeftIcon className="cursor-pointer" onClick={handlePrevMonth}/>
            <p className="text-blue-500 select-none cursor-pointer" onClick={handleDateFocus}> Today </p>
            <ChevronRightIcon className="cursor-pointer" onClick={handleNextMonth}/>
        </div>
    </div>;
}

export default Header;