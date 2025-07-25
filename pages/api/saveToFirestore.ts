import type { NextApiRequest, NextApiResponse } from "next";
import { collection, query, where, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email } = req.body;
    const now = new Date();
    const timestamp = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    );

    // 🔒 二重送信チェック（同じemailで±1秒以内のtimestampが存在するか）
    const q = query(
      collection(db, "database"),
     // where("email", "==", email),
      where("timestamp", ">=", Timestamp.fromDate(new Date(timestamp.getTime() - 1000))),
      where("timestamp", "<=", Timestamp.fromDate(new Date(timestamp.getTime() + 1000)))
    );

    const existing = await getDocs(q);
    if (!existing.empty) {
      return res.status(409).json({ error: "Duplicate submission" });
    }

    // 🌟 Firestoreに保存
    const data = { ...req.body, timestamp: now };
    const docRef = await addDoc(collection(db, "database"), data);
    return res.status(200).json({ id: docRef.id });

  } catch (err) {
    console.error("保存エラー:", err);
    return res.status(500).json({ error: "Internal error" });
  }
};

export default handler;
