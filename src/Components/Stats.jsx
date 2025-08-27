  import React from "react";
import CountUp from "react-countup";
import Icon1 from '../assets/Images/icons8-profile-48.png';
import Icon2 from '../assets/Images/icons8-clock-50.png';
import Icon3 from '../assets/Images/icons8-globe-50.png';
import Icon4 from '../assets/Images/icons8-suitcase-64.png';
import './Stats.css';

const stats = [
  { icon: Icon1, number: 1783, suffix: "+", label: "Happy Customers" },
  { icon: Icon2, number: 10, suffix: "+", label: "Years of Experience" },
  { icon: Icon4, number: 30, suffix: "+", label: "Services" },
  { icon: Icon3, number: 730, suffix: "k+", label: "Active Users" },
];

const Stats = () => {
  return (
    <section className="stats-section">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <img src={stat.icon} alt={stat.label} className="stat-icon" />
            <h2 className="stat-number">
              <CountUp end={stat.number} duration={2} />
              {stat.suffix}
            </h2>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
