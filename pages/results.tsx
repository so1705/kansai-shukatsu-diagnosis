import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Result() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    tel: "",
    gender: "",
    birth: "",
    university: "",
    faculty: "",
    grade: "",
    graduateYear: "",
    graduateMonth: "",
    area: "",
  });
  const [extra, setExtra] = useState<any>({});
  const [answers, setAnswers] = useState<any[]>([]);

  useEffect(() => {
    const storedExtra = localStorage.getItem("extra");
    if (storedExtra) {
      const parsed = JSON.parse(storedExtra);
      setExtra(parsed);
    }

    const storedAnswers = localStorage.getItem("answers");
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post("/api/sendToDiscord", {
        username: extra.instagram,
        lineName: extra.line,
        fullName: formData.lastName + " " + formData.firstName,
        university: extra.university,
        grade: extra.grade,
        industry1: extra.industry1,
        industry2: extra.industry2,
        industry3: extra.industry3,
        job1: extra.job1,
        job2: extra.job2,
        job3: extra.job3,
        feedbackType: "フォーム送信完了",
        answers: answers,
      });

      await axios.post("/api/saveToFirebase", {
      ...formData,
      ...extra,
      answers,
    });

    router.push("/thanks");
  } catch (error) {
    console.error("送信エラー:", error);
  }
};

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">フォーム送信</h1>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="姓"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="名"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          className="border p-2"
        />
        {/* 必要な他のフォーム項目も同様に配置 */}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
      >
        送信して診断を完了する
      </button>
    </div>
  );
}
