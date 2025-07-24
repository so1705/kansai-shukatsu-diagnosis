// pages/api/sendToDiscord.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const {
      feedbackMethod,  // 最初に選んだ媒体（インスタ or LINE）
      feedbackType,    // 分析結果のみ or 面談希望
      username,        // ユーザーネーム
      grade,           // 学年
      department,      // 大学名
      faculty,         // 学部（追加）
      birth,           // 生年月日（追加）
      gender,          // 性別（追加）
      address,         // 原住所（追加）
      phone,           // 電話番号（追加）
      email,           // メール（追加）
      graduationYear,  // 卒業予定年（追加）
      graduationMonth, // 卒業予定月（追加）
      industry1,       // 希望業界①
      industry2,       // 希望業界②（任意）
      industry3,       // 希望業界③（任意）
      job1,            // 希望職種①
      job2,            // 希望職種②（任意）
      job3,            // 希望職種③（任意）
      area1,           // 希望勤務地①
      area2,           // 希望勤務地②（任意）
      area3,           // 希望勤務地③（任意）
      concern,         // 現在の悩み
      income,          // 希望年収
      jobType,         // 希望職柄
      companies,       // 志望企業群
      answers,         // 設問回答（配列）
    } = req.body;

    // メッセージ整形
    let content = `【関西就活コミュニティ 診断回答】\n`;

    if (feedbackMethod) content += `■連絡媒体：${feedbackMethod}\n`;
    if (feedbackType === "interview") {
      content += `■フィードバック方法：分析＋面談希望\n`;
    } else if (feedbackType === "resultOnly") {
      content += `■フィードバック方法：分析結果のみ\n`;
    }

    content += `■ユーザーネーム：${username}\n`;
    content += `■学年：${grade}\n`;
    content += `■大学名：${department}\n`;
    content += `■学部：${faculty}\n`;
    content += `■生年月日：${birth}\n`;
    content += `■性別：${gender}\n`;
    content += `■原住所：${address}\n`;
    content += `■電話番号：${phone}\n`;
    content += `■メールアドレス：${email}\n`;
    content += `■卒業予定：${graduationYear}年${graduationMonth}月\n`;

    content += `■希望業界：${industry1 || "-"}${industry2 ? "、" + industry2 : ""}${industry3 ? "、" + industry3 : ""}\n`;
    content += `■希望職種：${job1 || "-"}${job2 ? "、" + job2 : ""}${job3 ? "、" + job3 : ""}\n`;
    content += `■希望勤務地：${area1 || "-"}${area2 ? "、" + area2 : ""}${area3 ? "、" + area3 : ""}\n`;

    content += `■現在の悩み：${concern}\n`;
    content += `■希望年収：${income}\n`;
    content += `■希望する職柄：${jobType}\n`;

    if (companies && Array.isArray(companies)) {
      content += `■志望企業群：${companies.join(", ")}\n`;
    }

    if (answers && Array.isArray(answers)) {
      content += `■設問回答：\n`;
      answers.forEach((ans: string, i: number) => {
        content += `Q${i + 1}: ${ans}\n`;
      });
    }

    // Discordに送信
    await axios.post(DISCORD_WEBHOOK_URL, { content });
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("送信エラー", err);
    res.status(500).json({ error: "送信エラー" });
  }
}
