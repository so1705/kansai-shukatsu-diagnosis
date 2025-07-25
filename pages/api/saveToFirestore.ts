import type { NextApiRequest, NextApiResponse } from "next";
import { collection, query, where, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email } = req.body;

    if (!email) {
      console.error("❗️emailフィールドが送られていません");
      return res.status(400).json({ error: "Missing email field" });
    }

    const now = new Date();
    const timestamp = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    );

    const q = query(
      collection(db, "database"),
      where("email", "==", email),
      where("timestamp", ">=", Timestamp.fromDate(new Date(timestamp.getTime() - 1000))),
      where("timestamp", "<=", Timestamp.fromDate(new Date(timestamp.getTime() + 1000)))
    );

    const existing = await getDocs(q);
    if (!existing.empty) {
      return res.status(409).json({ error: "Duplicate submission" });
    }

    const data = { ...req.body, timestamp: now };

    // 追加ログ
    console.log("📤 Firestoreに保存中のデータ:", data);

    const docRef = await addDoc(collection(db, "database"), data);
    return res.status(200).json({ id: docRef.id });

  } catch (err: any) {
    console.error("🔥 Firestore保存中のサーバーエラー:", err);
    return res.status(500).json({ error: "Internal server error", detail: err.message });
  }
};

export default handler;
