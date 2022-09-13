import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import { LatLong } from "./helper/requestLocation";
import { CurrentWeather } from "./helper/weatherDataHelper";

type Props = Readonly<{location: LatLong}>

export default function WeatherSection(props: Props): ReactElement {
  const [data, setData] = useState<CurrentWeather | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (props.location.latitude === '' || props.location.longitude === '') {
      return;
    }
    setLoading(true);
    axios.get("/api/weather", {params: props.location})
      .then((res) => {
        const jsonData = JSON.parse(res.data.message);
        setData(jsonData.currentWeather);
        setLoading(false);
      });
  }, [props.location]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <div>{data.metadata.longitude}</div>
      <div>{data.metadata.latitude}</div>
      <div>{data.temperature}</div>
    </div>
  );
}
