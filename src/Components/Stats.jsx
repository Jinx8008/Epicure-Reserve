import React from "react";
import CountUp from "react-countup";

const stats = [
  { icon: "👤", number: 1783, suffix: "+", label: "Happy Customers" },
  { icon: "🕒", number: 10, suffix: "+", label: "Years of Experience" },
  { icon: "🧰", number: 30, suffix: "+", label: "Services" },
  { icon: "🌍", number: 730, suffix: "k+", label: "Active Users" },
];

const Stats = () => {
  return (
    <section className="py-16 my-16" style={{ marginTop:"1vw"}}>
      <div className="max-w-full mx-auto px-4 flex flex-col sm:flex-row justify-between align-center text-center gap-y-8 sm:gap-y-0">
        {stats.map((stat, index) => (
          <div key={index} className="w-full sm:w-1/4 flex flex-col items-center">
            <div className="text-4xl mb-2">{stat.icon}</div>
            <h2 className="text-3xl font-bold white">
              <CountUp end={stat.number} duration={2} />
              {stat.suffix}
            </h2>
            <p className="text-white mt-1">{stat.label}</p>
            
          </div>

        ))}
      </div>
    </section>
  );
};

export default Stats;
