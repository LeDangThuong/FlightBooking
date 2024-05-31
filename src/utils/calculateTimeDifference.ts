 export const calculateTimeDifference = (startTime: Date, endTime: Date): { hours: number, minutes: number } => {

    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
        throw new Error('Invalid date format');
    }

    // Tính toán sự khác biệt giữa hai mốc thời gian (đơn vị là milliseconds)
    const differenceInMilliseconds = endTime.getTime() - startTime.getTime();

    // Chuyển đổi từ milliseconds sang các đơn vị thời gian khác
    const millisecondsInMinute = 1000 * 60;
    const millisecondsInHour = millisecondsInMinute * 60;

    const differenceInHours = Math.floor(differenceInMilliseconds / millisecondsInHour);
    const differenceInMinutes = Math.floor((differenceInMilliseconds % millisecondsInHour) / millisecondsInMinute);

    return {
        hours: differenceInHours,
        minutes: differenceInMinutes
    };
}