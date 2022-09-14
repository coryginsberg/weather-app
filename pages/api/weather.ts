// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import axios from "axios";
import validator from "validator";

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
    const latLongCombined = `${latitude},${longitude}`;
    if (!validator.isLatLong(latLongCombined)) {
      res.status(422).json({
        message:
          "User coordinates failed validation. Please let me know how you did this.",
      });
    }
    const latLongSplit = latLongCombined.split(",");
    const dataSets = "currentWeather,forecastDaily";
    const locale = "en_US";
    const timezone = "America/Chicago";
    const { data } = await axios.get(
      `${process.env.WEATHERKIT_BASE_URL}/${locale}/${latLongSplit[0]}/${latLongSplit[1]}?dataSets=${dataSets}&timezone=${timezone}`,
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
