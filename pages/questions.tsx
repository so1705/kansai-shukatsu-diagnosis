import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import questions from "../data/questions"; // 40問配列
import ProgressBar from "../components/ProgressBar";
import Image from "next/image";
import axios from "axios";

export default function QuestionsPage() {
  const router = useRouter();
  // concernも受け取る！
  const { feedbackMethod, username, grade, department, income, jobType, companies, concern } = router.query;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const companyArr = typeof companies === "string" ? companies.split(",") : [];

  // 選択肢をクリックしたら即次へ
  const handleAnswer = (ans: string) => {
    setAnswers([...answers, ans]);
    setStep(step + 1);
  };

  // 前の設問に戻る
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  // 終了時に送信
  useEffect(() => {
    if (answers.length === questions.length) {
      axios.post("/api/sendToDiscord", {
  feedbackMethod,
  username,
  grade,
  department,
  concern,
  income,
  jobType,
  companies: companyArr,
  answers,
}).then(() => {
  // ← ここにスプレッドシート用の送信処理を追加
  axios.post("/api/saveToSheets", {
    feedbackMethod,
    username,
    grade,
    department,
    concern,
    income,
    jobType,
    companies: companyArr,
    answers,
  });

  // そのあと診断結果ページに遷移
  router.replace("/SelectFeedback");
});
    }
  }, [answers]);

  // アクセスバリデーション
  useEffect(() => {
    if (!username) router.replace("/");
  }, [username]);

  // デザイン
  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col items-center justify-center px-4 relative">
      {/* === 上部ロゴ === */}
      <div className="w-full max-w-md flex flex-col items-center pt-8">
        <Image
          src="/logo.png"
          alt="ロゴ"
          width={180}
          height={100}
          className="mb-2"
          priority
        />
        <div className="mb-4"></div>
      </div>

      {/* 質問・選択肢カード */}
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-lg flex flex-col items-center py-16 px-6 min-h-[500px] relative mb-14">
        {/* === 進捗表示＆プログレスバー === */}
        <div className="w-full max-w-md mb-5">
          <div className="text-center text-[#1976d2] text-sm font-bold mb-1">
            進捗 {step + 1} / {questions.length}
          </div>
          <ProgressBar now={step + 1} max={questions.length} />
        </div>
        {/* 設問エリア */}
        {step < questions.length ? (
          <div className="w-full flex flex-col items-center">
            {/* 設問 */}
            <div className="text-center font-extrabold text-2xl md:text-3xl mb-8 text-[#223a50]">
              {questions[step].question}
            </div>
            {/* 選択肢エリア */}
            <div className="flex flex-col w-full gap-8 items-center">
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
              {/* 戻るボタン：下側・やや左寄せ */}
              {step > 0 && (
                <div className="w-full flex justify-start mt-10">
                  <button
                    onClick={handleBack}
                    className="px-6 py-2 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 text-base font-semibold transition shadow"
                  >
                    ← 前の設問に戻る
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-xl">診断結果を送信中...</div>
        )}
        {/* === 下部中央イラスト === */}
        {questions[step]?.image && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[60px]">
            <Image
              src={questions[step].image}
              alt="イラスト"
              width={200}
              height={200}
              className="rounded-xl drop-shadow-md"
              priority
            />
          </div>
        )}
      </div>
    </div>
  );
}
