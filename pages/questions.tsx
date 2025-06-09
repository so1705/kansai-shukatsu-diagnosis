import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import questions from "../data/questions"; // 40問配列
import ProgressBar from "../components/ProgressBar";
import Image from "next/image";
import axios from "axios";

export default function QuestionsPage() {
  const router = useRouter();
  const { username, grade, department, income, jobType, companies } = router.query;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const companyArr = typeof companies === "string" ? companies.split(",") : [];

  // 選択肢をクリックしたら即次へ
  const handleAnswer = (ans: string) => {
    setAnswers([...answers, ans]);
    setStep(step + 1);
  };

  // 終了時に送信
  useEffect(() => {
    if (answers.length === questions.length) {
      axios.post("/api/sendToDiscord", {
        username,
        grade,
        department,
        income,
        jobType,
        companies: companyArr,
        answers,
      }).then(() => {
        router.replace("/thanks");
      });
    }
  }, [answers]);

  // アクセスバリデーション
  useEffect(() => {
    if (!username) router.replace("/");
  }, [username]);

  // デザイン
  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-lg flex flex-col items-center py-20 px-10 min-h-[500px]">
        {/* ロゴ */}
        <div className="flex flex-col items-center mb-2">
          <Image
            src="/logo.png"
            alt="ロゴ"
            width={100}
            height={100}
            className="mb-6"
            priority
          />
        </div>
        {/* プログレスバー */}
        <div className="w-full max-w-md mb-8">
          <ProgressBar now={step + 1} max={questions.length} />
        </div>
        {/* 設問エリア */}
        {step < questions.length ? (
          <div className="w-full flex flex-col items-center">
            <div className="text-center font-extrabold text-2xl md:text-3xl mb-8 text-[#223a50]">
              {questions[step].question}
            </div>
            <div className="flex flex-col items-center w-full gap-5">
              {questions[step].options.map((opt: string, i: number) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  className="w-full max-w-md py-6 text-2xl md:text-3xl font-bold bg-[#f7fafc] border-2 border-gray-200 rounded-2xl shadow hover:bg-[#fff3e0] hover:border-[#ffb94c] transition text-[#223a50]"
                  style={{ letterSpacing: "0.03em" }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-xl">診断結果を送信中...</div>
        )}
      </div>
    </div>
  );
}
