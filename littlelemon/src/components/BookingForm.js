import React, { useState } from 'react'

const BookingForm = ({ availableTimes, setAvailableTimes, submitForm }) => {
    const initDate = new Date();
    initDate.setDate(initDate.getDate() + 1);
    const YYYY = initDate.getFullYear();
    const MM = initDate.getMonth() < 10 ? "0" + (initDate.getMonth() + 1) : initDate.getMonth() + 1;
    const DD = initDate.getDate() < 10 ? "0" + initDate.getDate() : initDate.getDate();

    const [date, setDate] = useState(YYYY + "-" + MM + "-" + DD);
    const [time, setTime] = useState("17:00");
    const [guests, setGuests] = useState(2);
    const [occasion, setOccasion] = useState("none");

    function isValidDate(dateString) {
        const ds = dateString.split("-");
        const dateObj = new Date(parseInt(ds[0]), parseInt(ds[1]) - 1, parseInt(ds[2]));
        return dateObj > new Date();
    }

    function getDateObject (dateString) {
        const ds = dateString.split("-");
        return new Date(parseInt(ds[0]), parseInt(ds[1]) - 1, parseInt(ds[2]));
    }

    function handleDateChange(e) {
        if (!isValidDate(e.target.value)) {
            alert(`Sorry! Reservations not available for this date!`);
            return;
        }
        const dateObject = getDateObject(e.target.value);
        setDate(e.target.value);
        setAvailableTimes({ setBookingDate: dateObject });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const reservation = {
            date: date,
            time: time,
            guests: guests,
            occassion: occasion
        }
        submitForm(reservation);
    }

  return (
    <form onSubmit={handleSubmit}>
        <h1>Reserve a table</h1>
        <div className="form-group">
            <label htmlFor="Date">Date</label>
            <input type="date" name='date' value={date} onChange={handleDateChange} required/>
        </div>
        <div className="form-group">
            <label htmlFor="time">Time</label>
            <select name='time' value={time} onChange={(e) => setTime(e.target.value)} required>
                {
                    availableTimes.times.map((time, index) => {
                        return <option value={time} key={index}>{ time }</option>
                    })
                }
            </select>
        </div>
        <div className="form-group">
            <label htmlFor="guests">Guests</label>
            <input type="number" min="1" max="10" value={guests} onChange={(e) => setGuests(e.target.value)} required/>
        </div>
        <div className="form-group">
            <label htmlFor="occassion">Occassion</label>
            <select name='occassion' value={occasion} onChange={(e) => setOccasion(e.target.value)} >
                <option value="none">None</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
            </select>
        </div>
        <input type="submit" value="Confirm Reservation" />
    </form>
  )
}

export default BookingForm