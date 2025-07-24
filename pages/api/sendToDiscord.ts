import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const {
    instagram, line, lineName, lastName, firstName, university, grade,
    industry1, industry2, industry3,
    job1, job2, job3,
    feedbackMethod, answers  // ← 追加ポイント
  } = req.body;

  const name = `${lastName}${firstName}`;

  const content = `
【自己分析フォーム送信通知】

■Instagram：${instagram}
■LINEユーザー名：${lineName || line}
■氏名：${name}
■大学名：${university}
■学年：${grade}

【希望】
■希望業界：${industry1} ／ ${industry2 || "（なし）"} ／ ${industry3 || "（なし）"}
■希望職種：${job1} ／ ${job2 || "（なし）"} ／ ${job3 || "（なし）"}

■フィードバックタイプ：${feedbackMethod}

【設問回答（全40問）】
${(answers || []).map((ans: string, idx: number) => `Q${idx + 1}: ${ans}`).join("\n")}
`;

  try {
    await axios.post(WEBHOOK_URL, { content });
    res.status(200).json({ message: "success" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "failed to send to Discord" });
  }
}
