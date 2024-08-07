import { useDrop } from "react-dnd";
import Event from "./Event";
import { ItemTypes } from "../constants";
import { useRef } from "react";
import { isInsideMonth, resolveTimeStamp } from "../utils";

function DroppableGrid({ length, width, events, addEvent, setEvents, month, year }) {

    const containerLeft = useRef(0);
    const containerTop = useRef(0);
    const onDrop = (item , monitor ) => {
        const delta = monitor.getDifferenceFromInitialOffset();
        const event = events.find(event => event.id === item.id);
        
        const left = Math.round(event.x + delta.x);
        const top = Math.round(event.y + delta.y);

        const {startTime, endTime} = resolveTimeStamp({ x: left,y: top, month, year, eventWidth: 100 })
        setEvents(p => {
            const newEvents = p.map(event => {
                if(event.id === item.id){
                    return {
                        ...event,
                        x: left,
                        y: top,
                        startTime,
                        endTime
                    }
                }
                return event
            })
            return newEvents;
        })
    }
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.EVENT,
        drop: onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })

    const deleteEvent = (eventId) => {
        setEvents(events.filter(event => event.id !== eventId));
    }

    return (
        <div ref={(ref) => {
            drop(ref);
            if(ref) {
                const rect = ref.getBoundingClientRect();
                containerLeft.current = rect.left;
                containerTop.current = rect.top
            }
        }} className="grid relative" style={{ gridTemplateColumns: `repeat(${width}, 1fr)` }}>
            {Array(width * length).fill(0).map(_ => (
                <div className="border" style={{ height: "60px", width: "100px"}} onDoubleClick={(event) => addEvent(event.clientX - containerLeft.current, event.clientY - containerTop.current)}></div>
            ))}
            {events.filter((event) => isInsideMonth(event, month, year)).map(event => (
                <Event key={event.id} event={event} deleteEvent={deleteEvent}/>
            ))}
        </div>
    );
}

export default DroppableGrid;