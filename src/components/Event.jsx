import { useDrag } from "react-dnd";
import { ItemTypes } from "../constants";
import { convertTimestampToHHMM, getWidthFromStartAndEndTime } from "../utils";

function Event({ event, deleteEvent }) {
    const { color, name, startTime, endTime } = event;

    const [{ opacity }, drag] = useDrag(
        () => ({
          type: ItemTypes.EVENT,
          item: event,
          collect: (monitor) => {
            return {
                opacity: monitor.isDragging() ? 0.3 : 1,
              }
          },
        }),
        [name, ItemTypes.EVENT],
      )

    return (<div ref={drag} className="px-2 py-1 rounded-sm" style={{ background: color, opacity, position: "absolute", top: event.y, left: event.x, width: getWidthFromStartAndEndTime(startTime, endTime), height: "50px"}}>
        <div className="relative">
            <span className="absolute top-0 right-0 text-xs" onClick={() => deleteEvent(event.id)}>X</span>
            <p className="text-sm font-bold">{name}</p>
            <p className="text-xs">{convertTimestampToHHMM(startTime)} - {convertTimestampToHHMM(endTime)}</p>
        </div>
    </div> );
}

export default Event;