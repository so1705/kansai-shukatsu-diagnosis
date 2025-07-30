// pages/api/saveToSheets.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const webhookURL = process.env.GOOGLE_SHEETS_WEBHOOK_URL!;
    await axios.post(webhookURL, req.body);
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to save to Google Sheets" });
  }
}
