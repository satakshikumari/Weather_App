import React, { useState } from 'react';
import './TemperatureConvert.scss'; 

const TemperatureConvert = ({ currentTemperature }) => {
  const [selectedUnit, setSelectedUnit] = useState(null);

  const handleUnitClick = (unit) => {
    setSelectedUnit(unit);
  };

  const convertTemperature = (temperature, targetUnit) => {
    if (targetUnit === 'Fahrenheit') {
      return ((temperature - 273.15) * 9 / 5 + 32).toFixed(2) + '°F';
    } else if (targetUnit === 'Kelvin') {
      return temperature.toFixed(2) + 'K';
    }
    return null;
  };

  return (
    <div className="temperature-container">
      <div className="temperature-options">
        <p className="temperature-label">Convert temperature to:</p>
        <button onClick={() => handleUnitClick('Fahrenheit')}>
          {selectedUnit === 'Fahrenheit' ? convertTemperature(currentTemperature, 'Fahrenheit') : '°F'}
        </button>
        <button onClick={() => handleUnitClick('Kelvin')}>
          {selectedUnit === 'Kelvin' ? convertTemperature(currentTemperature, 'Kelvin') : 'K'}
        </button>
      </div>
    </div>
  );
};

export default TemperatureConvert;
