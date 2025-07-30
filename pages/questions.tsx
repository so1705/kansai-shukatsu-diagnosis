import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import questions from "../data/questions";
import ProgressBar from "../components/ProgressBar";
import Image from "next/image";

export default function QuestionsPage() {
  const router = useRouter();
  const {
    feedbackMethod,
    username,
    lineName,
    fullName,
    university,
    grade,
    industry1,
    industry2,
    industry3,
    job1,
    job2,
    job3,
  } = router.query;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (ans: string) => {
    setAnswers([...answers, ans]);
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  // ❌ クエリ未入力時の強制リダイレクトは削除（or 必要なら後で復活させる）
//   useEffect(() => {
//     if (!username) router.replace("/");
//   }, [username]);

  useEffect(() => {
    if (answers.length === questions.length) {
  const encodedAnswers = encodeURIComponent(JSON.stringify(answers));
  router.push({
    pathname: "/SelectFeedback",
    query: {
      feedbackMethod,
      username,
      lineName,
      fullName,
      university,
      grade,
      industry1,
      industry2,
      industry3,
      job1,
      job2,
      job3,
      answers: encodedAnswers,
    },
  });
}

  }, [answers]);

  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-full max-w-md flex justify-center pt-8">
        <Image src="/logo.png" alt="ロゴ" width={180} height={100} className="mb-4" priority />
      </div>

      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-lg flex flex-col items-center py-16 px-6 min-h-[500px] mb-14 text-center">
        <div className="w-full mb-5">
          <div className="text-[#1976d2] text-sm font-bold mb-1 text-center">
            進捗 {step + 1} / {questions.length}
          </div>
          <ProgressBar now={step + 1} max={questions.length} />
        </div>

        {step < questions.length ? (
          <div className="w-full flex flex-col items-center text-center">
            <div className="font-extrabold text-2xl md:text-3xl mb-8 text-[#223a50] max-w-xs mx-auto">
              {questions[step].question}
            </div>

            <div className="flex flex-col gap-6 w-full items-center">
              {questions[step].options.map((opt: string, i: number) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  className="w-full max-w-xs py-6 text-2xl font-bold bg-[#f7fafc] border-2 border-gray-200 rounded-2xl shadow hover:bg-[#fff3e0] hover:border-[#ffb94c] transition text-[#223a50]"
                  style={{ letterSpacing: "0.03em" }}
                >
                  {opt}
                </button>
              ))}

              {step > 0 && (
                <button
                  onClick={handleBack}
                  className="px-6 py-2 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 text-base font-semibold transition shadow mt-8"
                >
                  ← 前の設問に戻る
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-xl">診断結果を送信中...</div>
        )}

        {questions[step]?.image && (
          <div className="mt-12 flex justify-center">
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
