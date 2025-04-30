import '../Home/Home.css';
import { useNavigate } from 'react-router-dom';

const services = [
    "Routine Checkups & Cleanings",
    "Teeth Whitening",
    "Cosmetic Dentistry",
    "Dental Implants",
    "Braces & Invisalign",
    "Emergency Dental Care"
  ];

function Home() {
const navigate = useNavigate();

const handleScheduleClick = () => {
    navigate("/booking");
};

    return (
        <div className="homepage-container">
        <h1 className="homepage-title">Welcome to Bright Smile Dental</h1>
        <p className="homepage-description">
          At Bright Smile Dental, we are committed to providing quality, compassionate dental care using the latest technology. Your comfort and health are our priority.
        </p>
  
         <h2 className="homepage-subtitle">Our Services</h2>
        <div className="services-grid">
            {services.map((service, index) => (
            <div key={index} className="service-card">
                <h3>{service}</h3>
            </div>
            ))}
        </div>
  
        <button className="homepage-button" onClick={handleScheduleClick}>
          Schedule an Appointment
        </button>
      </div>
    );
  }
  
  export default Home;