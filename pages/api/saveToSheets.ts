// pages/api/saveToSheets.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const webhookURL = process.env.GOOGLE_SHEETS_WEBHOOK_URL
    if (!webhookURL) {
      throw new Error('Webhook URL not found in environment variables')
    }

    await axios.post(webhookURL, req.body)

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to send to Google Sheets' })
  }
}
