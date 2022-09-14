// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import axios from "axios";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const buff = Buffer.from(process.env.WEATHERKIT_KEY ?? "").toString();

    // Get team, key, and app id
    const teamId = process.env.WEATHERKIT_TEAM_ID;
    const keyId = process.env.WEATHERKIT_KEY_ID;
    const appId = process.env.WEATHERKIT_APP_ID;
    const headerId = process.env.WEATHERKIT_HEADER_ID;

    const jwtToken = jwt.sign({}, buff, {
      issuer: teamId,
      expiresIn: "1h",
      subject: appId,
      jwtid: headerId,
      header: {
        alg: "ES256",
        kid: keyId,
      },
    });

    // Get coordinates from parameters
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    // Get current weather from WeatherKit
    const { data } = await axios.get(
      `${process.env.WEATHERKIT_BASE_URL}/en/${latitude}/${longitude}?dataSets=currentWeather,forecastDaily&countryCode=us&timezone=America/Chicago`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    res.status(200).json({ message: JSON.stringify(data) });
  } catch (err) {
    res.status(500).send({ message: "failed to fetch data: " + err });
  }
}
