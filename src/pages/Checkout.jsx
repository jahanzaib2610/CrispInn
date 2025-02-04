import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { clearCart } from '../store/slices/cartSlice';

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { total } = useSelector(state => state.cart);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    if ('geolocation' in navigator) {
      setLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
            );
            const data = await response.json();
            setLocation({
              address: data.display_name,
              coords: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            });
          } catch (error) {
            console.error('Error fetching address:', error);
            toast.error('Failed to get address from coordinates');
          } finally {
            setLoadingLocation(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          toast.error('Failed to get your location');
          setLoadingLocation(false);
        }
      );
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically send the order to your backend
    toast.success('Order placed successfully!');
    dispatch(clearCart());
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const useCurrentLocation = () => {
    if (location) {
      setFormData(prev => ({
        ...prev,
        address: location.address
      }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <form onSubmit={handleSubmit} className="card p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Delivery Address
          </label>
          <div className="flex gap-4 mb-2">
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows="3"
              className="flex-grow px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
            />
            <button
              type="button"
              onClick={useCurrentLocation}
              disabled={loadingLocation || !location}
              className="btn bg-gray-200 dark:bg-gray-700 whitespace-nowrap"
            >
              {loadingLocation ? 'Getting location...' : 'Use current location'}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Payment Method
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              id="cod"
              name="payment"
              value="cod"
              checked
              readOnly
              className="mr-2"
            />
            <label htmlFor="cod">Cash on Delivery</label>
          </div>
        </div>

        <div className="border-t dark:border-gray-700 pt-4 mb-6">
          <div className="text-xl font-bold">
            Total Amount: ${total.toFixed(2)}
          </div>
        </div>

        <button type="submit" className="w-full btn btn-primary">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;





// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { toast } from "react-hot-toast";
// import { clearCart } from "../store/slices/cartSlice";
// import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

// const mapContainerStyle = {
//   width: "100%",
//   height: "400px",
// };

// const defaultCenter = { lat: 37.7749, lng: -122.4194 }; // Default: San Francisco

// function Checkout() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { total } = useSelector((state) => state.cart);
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     address: "",
//   });
//   const [location, setLocation] = useState(null);
//   const [showMap, setShowMap] = useState(false);
//   const [markerPosition, setMarkerPosition] = useState(defaultCenter);
//   const [loadingLocation, setLoadingLocation] = useState(false);

//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       setLoadingLocation(true);
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const userLocation = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };
//           setMarkerPosition(userLocation);
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//           toast.error("Failed to get your location");
//         }
//       );
//       setLoadingLocation(false);
//     }
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     toast.success("Order placed successfully!");
//     dispatch(clearCart());
//     navigate("/");
//   };

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleMapClick = (event) => {
//     setMarkerPosition({
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng(),
//     });
//   };

//   const confirmLocation = () => {
//     setLocation(markerPosition);
//     setFormData((prev) => ({
//       ...prev,
//       address: `Lat: ${markerPosition.lat}, Lng: ${markerPosition.lng}`,
//     }));
//     setShowMap(false);
//   };

//   return (
//     <div className="max-w-2xl mx-auto">
//       <h1 className="text-3xl font-bold mb-8">Checkout</h1>

//       <form onSubmit={handleSubmit} className="card p-6">
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">Full Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">Phone Number</label>
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">Delivery Address</label>
//           <div className="flex gap-4 mb-2">
//             <textarea
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               required
//               rows="2"
//               className="flex-grow px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
//             />
//             <button
//               type="button"
//               onClick={() => setShowMap(true)}
//               className="btn bg-gray-200 dark:bg-gray-700 whitespace-nowrap"
//             >
//               Select Location
//             </button>
//           </div>
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-2">Payment Method</label>
//           <div className="flex items-center">
//             <input
//               type="radio"
//               id="cod"
//               name="payment"
//               value="cod"
//               checked
//               readOnly
//               className="mr-2"
//             />
//             <label htmlFor="cod">Cash on Delivery</label>
//           </div>
//         </div>

//         <div className="border-t dark:border-gray-700 pt-4 mb-6">
//           <div className="text-xl font-bold">Total Amount: ${total.toFixed(2)}</div>
//         </div>

//         <button type="submit" className="w-full btn btn-primary">
//           Place Order
//         </button>
//       </form>

//       {showMap && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl">
//             <h2 className="text-lg font-bold mb-4">Select Delivery Location</h2>
//             <LoadScript googleMapsApiKey="AlzaSyWdlLgwMcyPGSrwhq4sg-9KRvejpI9Ul2s">
//               <GoogleMap
//                 mapContainerStyle={mapContainerStyle}
//                 center={markerPosition}
//                 zoom={15}
//                 onClick={handleMapClick}
//               >
//                 <Marker position={markerPosition} />
//               </GoogleMap>
//             </LoadScript>
//             <div className="flex justify-end gap-4 mt-4">
//               <button onClick={() => setShowMap(false)} className="btn btn-secondary">
//                 Cancel
//               </button>
//               <button onClick={confirmLocation} className="btn btn-primary">
//                 Confirm Location
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Checkout;
