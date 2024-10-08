"use client"
import moment from 'moment';
import { TimePicker } from 'antd';

const TimePicer = ({ id, time, handleFunction, showValue = false, minuteStep = 1, showTimeAsPlaceHolder = false }) => {
    const defaultTime = moment(time, 'h:mm a')
    return (
        <>
            <TimePicker
                placeholder={showTimeAsPlaceHolder && time}
                defaultValue={showValue && defaultTime}
                minuteStep={minuteStep}
                use12Hours
                format="h:mm a"
                onChange={(time, timeString) => handleFunction(id, time, timeString)}
            />
        </>
    )
};
export default TimePicer;