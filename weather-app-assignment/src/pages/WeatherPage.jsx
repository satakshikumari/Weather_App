import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { WeatherIcons, WeatherInfoIcons } from "../Icons";
import TemperatureConvert from "./TemperatureConvert"

const BackButton = styled.button`
    margin-top: 20px;
    padding: 7px 14px;
    font-size: 12px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
}
`;
const Location = styled.span`
margin: 8px auto;
text-transform: capitalize;
font-size: 25px;
font-weight: bold;
`;
const Condition = styled.span`
margin: 5px auto;
text-transform: capitalize;
font-size: 14px;
& span {
  font-size: 28px;
}
`;
const WeatherInfoLabel = styled.span`
margin: 20px 25px 10px;
text-transform: capitalize;
text-align: start;
width: 90%;
font-weight: bold;
font-size: 14px;
`;
const WeatherIcon = styled.img`
width: 100px;
height: 100px;
margin: 5px auto;
`;
const WeatherContainer = styled.div`
display: flex;
width: 100%;
margin: 30px auto;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

const WeatherInfoContainer = styled.div`
display: flex;
width: 90%;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
flex-wrap: wrap;
`;
const InfoContainer = styled.div`
display: flex;
margin: 5px 10px;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
`;
const InfoIcon = styled.img`
width: 36px;
height: 36px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 20px 10px;
  margin: auto;
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 #555;
  background: white;
  font-family: Montserrat;
`;
const InfoLabel = styled.span`
display: flex;
flex-direction: column;
font-size: 14px;
margin: 15px;
& span {
  font-size: 12px;
  text-transform: capitalize;
}
`;

const WeatherInfoComponent = (props) => {
  const { name, value } = props;
  return (
    <InfoContainer>
      <InfoIcon src={WeatherInfoIcons[name]} />
      <InfoLabel>
        {value}
        <span>{name}</span>
      </InfoLabel>
    </InfoContainer>
  );
};

export default function WeatherPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const storedWeatherData = JSON.parse(window.localStorage.getItem('weatherData'));
  const storedCityName = window.localStorage.getItem('cityName');

  const { weatherData, cityName } = location.state || {};
  const weather = weatherData || storedWeatherData;

  const isDay = weather?.weather[0].icon?.includes('d')
  const getTime = (timeStamp) => {
    return `${new Date(timeStamp * 1000).getHours()} : ${new Date(timeStamp * 1000).getMinutes()}`
  }

  const handleBackClick = () => {
    navigate(`/cities`);
  };

  return (
    <>
      <Container>
        <WeatherContainer>
          <Condition>
            <span>{`${Math.floor(weather?.main?.temp - 273)}°C`}</span>
            {`  |  ${weather?.weather[0].description}`}
          </Condition>
          <WeatherIcon src={WeatherIcons[weather?.weather[0].icon]} />
        </WeatherContainer>
        <Location>{`${weather?.name}, ${weather?.sys?.country}`}</Location>

        <WeatherInfoLabel>Weather Info</WeatherInfoLabel>
        <WeatherInfoContainer>
          <WeatherInfoComponent name={isDay ? "sunset" : "sunrise"}
            value={`${getTime(weather?.sys[isDay ? "sunset" : "sunrise"])}`} />
          <WeatherInfoComponent name={"humidity"} value={weather?.main?.humidity} />
          <WeatherInfoComponent name={"wind"} value={weather?.wind?.speed} />
          <WeatherInfoComponent name={"pressure"} value={weather?.main?.pressure} />
        </WeatherInfoContainer>
        <TemperatureConvert currentTemperature={weather?.main?.temp}>
          Convert Temperature
        </TemperatureConvert>
        <BackButton onClick={handleBackClick}>Back</BackButton>
      </Container>

    </>

  );
}
