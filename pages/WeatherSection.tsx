import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import { LatLong } from "../helper/requestLocation";
import { CurrentWeather } from "../helper/weatherDataHelper";

type Props = Readonly<{
  location: LatLong;
}>;

export default function WeatherSection(props: Props): ReactElement {
  const [data, setData] = useState<CurrentWeather | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (props.location.latitude === "" || props.location.longitude === "") {
      return;
    }
    setLoading(true);
    axios.get("/api/weather", { params: props.location }).then((res) => {
      const jsonData = JSON.parse(res.data.message);
      setData(jsonData.currentWeather);
      setLoading(false);
    });
  }, [props.location]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <div>
        <span>
          Current Location:{' '}
            {data.metadata.latitude}, {data.metadata.longitude}
        </span>
        <div>
          <h1>
            {data.temperature.toFixed(1)}ºC {data.conditionCode}.
          </h1>
          <h3>Feels Like: {data.temperatureApparent.toFixed(1)}º</h3>
        </div>
      </div>
    </div>
  );
}
