import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DroppableGrid from "./DroppableGrid";
import { getRandomColor, resolveTimeStamp } from "../utils";
import { v4 as uuidv4 } from 'uuid';


const resources = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S"];
const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function DateGrid({ month, year }) {
    const currentDate = new Date();
    const dayTimeStamp = currentDate.setUTCHours(0,0,0,0);
    const numberOfDays = new Date(year, month,0).getDate();
    const date = new Date(year, month, 1);
    const dayOfWeek = date.getDay();

    const [events, _setEvents] = useState([{"id":"91ba5531-deda-44dc-b15d-d871310492b3","name":"Event 0","color":"hsl(127.11734956479367, 100%, 75%)","startTime":1722459060000,"endTime":1722462660000,"x":235,"y":100},{"id":"3a952289-8c51-433c-913f-de32f88d1481","name":"Event 1","color":"hsl(23.083740103874327, 100%, 75%)","startTime":1722471048000,"endTime":1722474648000,"x":568,"y":271},{"id":"6915a713-5a08-4867-900f-b4081ef08aa8","name":"Event 2","color":"hsl(37.26207651096387, 100%, 75%)","startTime":1722456324000,"endTime":1722459924000,"x":159,"y":356}]);

    useEffect(() => {
        const savedEvents = localStorage.getItem("events");
        try {
            if(savedEvents) {
                setEvents(JSON.parse(savedEvents));
            }
        } catch(e) {
            
        }
        
    },[])

    const setEvents = (newEvents) => {
        if(newEvents?.length) {
            localStorage.setItem("events", JSON.stringify(newEvents));
        } else {
            localStorage.removeItem("events");
        }
        _setEvents(newEvents);
    }

    const addEvent = (x, y) => {
        const newEvents = [...events];
        let { startTime, endTime } = resolveTimeStamp({ x, y, month, year, eventWidth: 100});

        newEvents.push({
            id: uuidv4(),
            name: `Event ${events.length}`,
            color: getRandomColor(),
            startTime,
            endTime,
            x,
            y
        })
        
        setEvents(newEvents)
    }

    const checkIfCurrentDay = (index) => {
        return currentDate.getDate() === index+1 && month === currentDate.getMonth() && year === currentDate.getFullYear()
    }

    return <div className="flex w-100 border">
        <div className="min-w-32">
            <div className="w-full border" style={{ height: "40px"}}></div>
            {resources.map(resource => (
                <div key={resource} className="border w-full font-semibold p-2 " style={{ height:"60px"}}>Resource {resource}</div>
            ))}
        </div>
        <div className="flex-grow overflow-x-auto">
            <div className="grid" style={{ gridTemplateColumns: `repeat(${numberOfDays}, 1fr)` }}>
                {Array(numberOfDays).fill(0).map((_,index) => (
                    <div className="border p-1" style={{ height: "40px", width: "100px"}} id={checkIfCurrentDay(index) ? dayTimeStamp: ''}>
                        <p className={`text-sm inline ${checkIfCurrentDay(index) ? "rounded-full bg-blue-500 text-white p-1 px-2" : ""}`}>{index+1} {days[(dayOfWeek + index) % 7]}</p>
                    </div>
                ))}
            </div>
            <DndProvider backend={HTML5Backend}>
                <DroppableGrid resources={resources} month={month} year={year} events={events} length={resources.length} width={numberOfDays} addEvent={addEvent} setEvents={setEvents} />
            </DndProvider>
        </div>
    </div>;
}

export default DateGrid;