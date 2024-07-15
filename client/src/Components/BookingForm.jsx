import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Booking.css'; // Import your CSS file

const BookingForm = () => {
  const [trips, setTrips] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [uniqueCities, setUniqueCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/trips');
        setTrips(response.data);

        const uniqueCities = Array.from(new Set(response.data.map(trip => trip.City)));
        setUniqueCities(uniqueCities);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchTrips();
  }, []);

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setSelectedSeats([]); // Clear selected seats when city changes
  };

  const isSeatBooked = (seatNo) => {
    const tripForCity = trips.find(trip => trip.City === selectedCity && trip.SeatNo === seatNo);
    return tripForCity ? tripForCity.Booked : true; // If trip exists, check if booked, else assume booked
  };

  const handleSeatSelection = (seatNo) => {
    if (isSeatBooked(seatNo)) {
      return; // Do nothing if the seat is already booked
    }

    const newSelectedSeats = selectedSeats.includes(seatNo)
      ? selectedSeats.filter(seat => seat !== seatNo)
      : [...selectedSeats, seatNo];

    setSelectedSeats(newSelectedSeats);
  };

  const handleSubmit = async () => {
    try {
      const userId = 1; // Replace with actual user ID
      const selectedTrips = {}; // Object to store selected seats grouped by Trip ID

      // Group selected seats by Trip ID
      selectedSeats.forEach(seatNo => {
        const trip = trips.find(trip => trip.City === selectedCity && trip.SeatNo === seatNo);
        if (trip) {
          if (!selectedTrips[trip.TripID]) {
            selectedTrips[trip.TripID] = {
              TripID: trip.TripID,
              City: trip.City,
              BusTime: trip.BusTime,
              SelectedSeats: []
            };
          }
          selectedTrips[trip.TripID].SelectedSeats.push(seatNo);
        }
      });

      // Process each selected trip and post bookings
      for (const tripId in selectedTrips) {
        const trip = selectedTrips[tripId];
        for (const seatNo of trip.SelectedSeats) {
          await axios.post('http://localhost:5000/api/bookings', {
            City: trip.City,
            BusTime: trip.BusTime,
            TripID: trip.TripID,
            SeatNo: seatNo,
            UserID: userId
          });
        }
      }

      // Navigate to checkout page with selected trips
      navigate('/checkout', { state: { selectedTrips } });
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    }
  };

  const renderSeats = () => {
    if (!selectedCity) return null;

    const availableSeats = trips.filter(trip => trip.City === selectedCity && !trip.Booked)
      .map(trip => trip.SeatNo);

    // Example layout: 4 seats per row, with an aisle in the middle
    const seatsPerRow = 4; // Modify this based on your bus layout
    const seatRows = [];
    for (let i = 0; i < availableSeats.length; i += seatsPerRow) {
      seatRows.push(availableSeats.slice(i, i + seatsPerRow));
    }

    return (
      <div className="seat-container">
        {seatRows.map((row, rowIndex) => (
          <div className="seat-row" key={rowIndex}>
            {row.map((seatNo, seatIndex) => (
              <>
                {seatIndex === seatsPerRow / 2 && <div className="seat-aisle" />}
                <button
                  key={seatNo}
                  className={isSeatBooked(seatNo) ? 'seat-button booked' : selectedSeats.includes(seatNo) ? 'seat-button selected' : 'seat-button available'}
                  onClick={() => handleSeatSelection(seatNo)}
                  disabled={isSeatBooked(seatNo)}
                >
                  {seatNo}
                </button>
              </>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
    
      <nav className="navbar navbar-expand-sm bg-danger navbar-dark fixed-top">
        <div className="container">
          {/* Brand */}
          <a className="navbar-brand" href="#">
            <img
              src="https://i.postimg.cc/zXFNsGkg/redbus-white.png"
              alt="redBus"
              width="60px"
            />
          </a>
          {/* Toggler/collapsibe Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#menu-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Navbar links */}
          <div className="collapse navbar-collapse" id="menu-nav">
            {/* Left-aligned nav (default) */}
            <div>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link text-white text-uppercase" href="#">
                    Bus Tickets
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white text-uppercase" href="#">
                    Hotels
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white text-uppercase" href="#">
                    Bus Hire
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white text-uppercase" href="#">
                    Pilgrimages
                  </a>
                </li>
              </ul>
            </div>
            {/* Right-aligned nav */}
            <div
              className="collapse navbar-collapse justify-content-end"
              id="menu-nav"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    Help
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-white"
                    href="#"
                    data-toggle="dropdown"
                  >
                    Prasanna@gmail.com
                  </a>
                  {/* <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">
                      Link 1
                    </a>
                    <a className="dropdown-item" href="#">
                      Link 2
                    </a>
                    <a className="dropdown-item" href="#">
                      Link 3
                    </a>
                  </div> */}
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-white"
                    href="#"
                    data-toggle="dropdown"
                  >
                    <i className="fas fa-user-circle" />
                  </a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">
                      Sign In/Sign Up
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <br></br>
      <br></br>
      <br></br>

      <div className="container mt-5">
        <h2>Book a Trip</h2>
        <div className="mt-3">
          <h3>Select City:</h3>
          <select value={selectedCity} onChange={(e) => handleCityChange(e.target.value)}>
            <option value="">Select a city</option>
            {uniqueCities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>
        {selectedCity && (
          <div className="mt-3">
            <h3>{selectedCity}</h3>
            {renderSeats()}
            <button className="btn btn-primary mt-3" onClick={handleSubmit} disabled={selectedSeats.length === 0}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingForm;
