import React from "react";
import CountUp from "react-countup";
import Icon1 from '../assets/Images/icons8-profile-48.png';
import Icon2 from '../assets/Images/icons8-clock-50.png';
import Icon3 from '../assets/Images/icons8-globe-50.png';
import Icon4 from '../assets/Images/icons8-suitcase-64.png';

const stats = [
  { icon: Icon1, number: 1783, suffix: "+", label: "Happy Customers" },
  { icon: Icon2, number: 10, suffix: "+", label: "Years of Experience" },
  { icon: Icon4, number: 30, suffix: "+", label: "Services" },
  { icon: Icon3, number: 730, suffix: "k+", label: "Active Users" },
];

const Stats = () => {
  return (
    <section className="py-[5vw] my-[5vw]" style={{ marginTop: "1vw" }}>
      <div className="max-w-full mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-center gap-y-[3vw] sm:gap-y-0">
        {stats.map((stat, index) => (
          <div key={index} className="w-full sm:w-1/4 flex flex-col items-center">
            <img
              src={stat.icon}
              alt={stat.label}
              className="w-[2.2vw] h-[2.2vw] mb-[1vw]"
              style={{ objectFit: "contain" }}
            />
            <h2 className="text-[1.6vw] font-bold text-white">
              <CountUp end={stat.number} duration={2} />
              {stat.suffix}
            </h2>
            <p className="text-[1vw] text-white mt-[0.5vw]">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
