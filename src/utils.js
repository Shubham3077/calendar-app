export function getRandomColor() {
    let color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
    return color;
  }


export function resolveTimeStamp({x,y,eventWidth, month, year}){
    // 0,0 represent first day of month and 12:00am
    // 100 width equals 24 hours
    // 1 width 3600000/100
    const firstDayTimestamp = (new Date(year, month, 1)).getTime()

    const startTime = (x * 36000) + firstDayTimestamp
    const endTime = ((x + eventWidth) * 36000) + firstDayTimestamp;

    return { startTime, endTime }

}

export function getXFromStartTime({ startTime, month, year }){
    const firstDayTimestamp = (new Date(year, month, 1)).getTime()

    const x = (startTime - firstDayTimestamp) * 1/36000;

    return x;
}   

export function getResourceFromTop(top, resources, resourceHeight){
    const resourceIndex = Math.floor(top / resourceHeight);
    console.log({ resourceIndex, resource: resources[resourceIndex]});
    return resources[resourceIndex]
}

export function getTopFromResource(resource, resources, resourceHeight = 60){
    const resourceIndex = resources.findIndex(r => r === resource);
    return resourceIndex * resourceHeight
}

export function getWidthFromStartAndEndTime(startTime, endTime) {
    return (endTime - startTime) * 1/36000
}

export function convertTimestampToHHMM(timestamp) {
    const date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // Add leading zeros to hours and minutes if necessary
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;

    return `${hours}:${minutes}`;
}

export function isInsideMonth(event, month, year){
    const monthStart = (new Date(year, month, 1)).getTime()
    const monthEnd = (new Date(year, month + 1, 0)).getTime()

    if(monthStart <= event.startTime && monthEnd >= event.endTime){
        return true
    }
    return false;
}