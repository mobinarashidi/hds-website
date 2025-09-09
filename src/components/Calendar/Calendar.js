import React from 'react';
import './Calendar.css';
const Calendar = () => {

    const calendarEmbedUrl = "https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID&ctz=America/New_York&mode=WEEK&showTitle=0&showNav=1&showDate=1&showCalendars=0&showTz=0&bgcolor=%23ffffff";

    return (
        <div className="w-full h-screen bg-white">
            <div className="bg-gray-800 text-white p-4">
                <h1 className="text-2xl font-bold">Deep RL Course - Calendar</h1>
                <p className="text-gray-300 mt-2">
                    This Google Calendar outlines the schedule for the Deep Reinforcement Learning course,
                    including weekly lecture times, assignment deadlines, and other important events.
                </p>
            </div>

            <div className="w-full" style={{ height: 'calc(100vh - 120px)' }}>
                <iframe
                    src={calendarEmbedUrl}
                    style={{
                        border: 0,
                        width: '100%',
                        height: '100%'
                    }}
                    frameBorder="0"
                    scrolling="no"
                    title="Deep RL Course Calendar"
                />
            </div>
        </div>
    );
};

export default Calendar;