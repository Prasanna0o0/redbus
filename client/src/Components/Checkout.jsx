// import React from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';

// // Setup pdfMake with fonts
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// const Checkout = () => {
//   const location = useLocation();
//   const { selectedTrips } = location.state;

//   const handleCheckout = async () => {
//     try {
//       const userId = 1; // Replace with actual user ID
//       const bookings = Object.values(selectedTrips).flatMap(trip =>
//         trip.SelectedSeats.map(seatNo => ({
//           City: trip.City,
//           BusTime: trip.BusTime,
//           TripID: trip.TripID,
//           SeatNo: seatNo,
//           UserID: userId
//         }))
//       );

//       // Calculate total amount
//       const totalAmount = bookings.length * 200; // Assuming each seat costs 200 rupees

//       // Post all bookings
//       await Promise.all(
//         bookings.map(booking =>
//           axios.post('http://localhost:5000/api/bookings', booking)
//         )
//       );

//       // Prepare PDF document definition with total amount
//       const docDefinition = {
//         content: [
//           { text: 'Booking Details', style: 'header' },
//           { text: 'Tickets:', style: 'subheader' },
//           ...bookings.map((booking, index) => ({
//             text: [
//               `Ticket ${index + 1}:`,
//               `Trip ID: ${booking.TripID}`,
//               `City: ${booking.City}`,
//               `Bus Time: ${booking.BusTime}`,
//               `Seat No: ${booking.SeatNo}`,
//               { text: '----------------------', margin: [0, 10] }
//             ]
//           })),
//           { text: `Total Amount: ₹ ${totalAmount}`, style: 'total' } // Display total amount
//         ],
//         styles: {
//           header: {
//             fontSize: 22,
//             bold: true,
//             margin: [0, 0, 0, 10]
//           },
//           subheader: {
//             fontSize: 18,
//             bold: true,
//             margin: [0, 10, 0, 5]
//           },
//           total: {
//             fontSize: 16,
//             bold: true,
//             margin: [0, 15, 0, 0]
//           }
//         }
//       };

//       // Create and download PDF
//       pdfMake.createPdf(docDefinition).download('tickets.pdf');

//       // Notify user
//       alert('Booking confirmed. Tickets downloaded.');
//     } catch (error) {
//       console.error('Checkout failed:', error);
//       alert('Checkout failed. Please try again.');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Checkout</h2>
//       {Object.values(selectedTrips).map(trip => (
//         <div key={trip.TripID} className="mt-3">
//           <h3>Trip ID: {trip.TripID}</h3>
//           <p>City: {trip.City}</p>
//           <p>Bus Time: {trip.BusTime}</p>
//           <p>Selected Seats: {trip.SelectedSeats.join(', ')}</p>
//           <hr />
//         </div>
//       ))}
//       <p>Total Amount: ₹ {Object.values(selectedTrips).reduce((acc, trip) => acc + trip.SelectedSeats.length * 200, 0)}</p>
//       <button className="btn btn-primary" onClick={handleCheckout}>Confirm Booking</button>
//     </div>
//   );
// };

// export default Checkout;



import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import StripeContainer from './Payments/StripeContainer';
import "../Components/Payments/Stripe.css";
// Setup pdfMake with fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Checkout = () => {
  const location = useLocation();
  const { selectedTrips } = location.state;
  const [showStripe, setShowStripe] = useState(false);

  const handleCheckout = async () => {
    try {
      const userId = 1; // Replace with actual user ID
      const bookings = Object.values(selectedTrips).flatMap(trip =>
        trip.SelectedSeats.map(seatNo => ({
          City: trip.City,
          BusTime: trip.BusTime,
          TripID: trip.TripID,
          SeatNo: seatNo,
          UserID: userId
        }))
      );

      // Calculate total amount
      const totalAmount = bookings.length * 200; // Assuming each seat costs 200 rupees

      // Post all bookings
      await Promise.all(
        bookings.map(booking =>
          axios.post('http://localhost:5000/api/bookings', booking)
        )
      );

      // Prepare PDF document definition with total amount
      const docDefinition = {
        content: [
          { text: 'Booking Details', style: 'header' },
          { text: 'Tickets:', style: 'subheader' },
          ...bookings.map((booking, index) => ({
            text: [
              `Ticket ${index + 1}:`,
              `Trip ID: ${booking.TripID}`,
              `City: ${booking.City}`,
              `Bus Time: ${booking.BusTime}`,
              `Seat No: ${booking.SeatNo}`,
              { text: '----------------------', margin: [0, 10] }
            ]
          })),
          { text: `Total Amount: ₹ ${totalAmount}`, style: 'total' } // Display total amount
        ],
        styles: {
          header: {
            fontSize: 22,
            bold: true,
            margin: [0, 0, 0, 10]
          },
          subheader: {
            fontSize: 18,
            bold: true,
            margin: [0, 10, 0, 5]
          },
          total: {
            fontSize: 16,
            bold: true,
            margin: [0, 15, 0, 0]
          }
        }
      };

      // Create and download PDF
      pdfMake.createPdf(docDefinition).download('tickets.pdf');

      // Notify user
      alert('Booking confirmed. Tickets downloaded.');
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed. Please try again.');
    }
  };

  const totalAmount = Object.values(selectedTrips).reduce((acc, trip) => acc + trip.SelectedSeats.length * 200, 0);

  return (
    <div className="container mt-5">
      <h2>Checkout</h2>
      {Object.values(selectedTrips).map(trip => (
        <div key={trip.TripID} className="mt-3">
          <h3>Trip ID: {trip.TripID}</h3>
          <p>City: {trip.City}</p>
          <p>Bus Time: {trip.BusTime}</p>
          <p>Selected Seats: {trip.SelectedSeats.join(', ')}</p>
          <hr />
        </div>
      ))}
      <p>Total Amount: ₹ {totalAmount}</p>
      <button className="btn btn-primary" onClick={handleCheckout}>Confirm Booking</button>
      <button className="btn btn-success" onClick={() => setShowStripe(true)}>Pay with Stripe</button>
      {showStripe && <StripeContainer amount={totalAmount} />}
    </div>
  );
};

export default Checkout;
