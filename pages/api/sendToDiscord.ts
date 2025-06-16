import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const {
      feedbackMethod, // 最初の診断用
      feedbackType,   // SelectFeedback用
      username,
      grade,
      department,
      income,
      jobType,
      companies,
      answers,
    } = req.body;

    // メッセージを整形
    let content = `【関西就活コミュニティ 診断回答】\n`;

    if (feedbackMethod) content += `■フィードバック希望媒体：${feedbackMethod}\n`;
    if (feedbackType) {
      if (feedbackType === "interview") {
        content += `■フィードバック希望方法：分析結果＋無料オンライン面談\n`;
      } else if (feedbackType === "resultOnly") {
        content += `■フィードバック希望方法：分析結果＋メールでフィードバック\n`;
      } else {
        content += `■フィードバック希望方法：${feedbackType}\n`;
      }
    }
    if (username) content += `■ユーザー名：${username}\n`;
    if (grade) content += `■学年：${grade}\n`;
    if (department) content += `■大学名：${department}\n`;
    if (income) content += `■希望年収：${income}\n`;
    if (jobType) content += `■希望する職柄：${jobType}\n`;
    if (companies && Array.isArray(companies)) {
      content += `■志望企業群：${companies.join(", ")}\n`;
    }
    if (answers && Array.isArray(answers)) {
      content += `■設問回答\n`;
      answers.forEach((ans: string, i: number) => {
        content += `Q${i + 1}: ${ans}\n`;
      });
    }

    await axios.post(DISCORD_WEBHOOK_URL, { content });
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "送信エラー" });
  }
}
