// pages/results.tsx
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ResultsPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    lastName: "",
    firstName: "",
    birth: "",
    gender: "",
    address: "",
    phone: "",
    email: "",
    university: "",
    faculty: "",
    grade: "",
    graduateYear: "",
    graduateMonth: "",
    industry1: "",
    industry2: "",
    industry3: "",
    job1: "",
    job2: "",
    job3: "",
    location1: "",
    location2: "",
    location3: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const answers = JSON.parse(localStorage.getItem("answers") || "[]");

    try {
      // Firestoreに保存
      await addDoc(collection(db, "formData"), {
        ...formData,
        timestamp: serverTimestamp(),
      });

      // Discordに送信
      await axios.post("/api/sendToDiscord", {
        username: "", // 取得できるなら入れる
        lineName: "", // 取得できるなら入れる
        fullName: formData.fullName,
        university: formData.university,
        grade: formData.grade,
        industry1: formData.industry1,
        industry2: formData.industry2,
        industry3: formData.industry3,
        job1: formData.job1,
        job2: formData.job2,
        job3: formData.job3,
        feedbackType: "フォーム送信完了",
        answers: answers,
      });

      // thanksページへ遷移
      router.push("/thanks");
    } catch (error) {
      console.error("送信エラー", error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">情報の入力</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block text-sm font-semibold mb-1" htmlFor={key}>
              {key}
            </label>
            <input
              id={key}
              name={key}
              type="text"
              value={(formData as any)[key]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          結果を送信
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
