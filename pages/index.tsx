import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const initialExtra = {
  feedbackMethod: "",
  username: "",
  grade: "",
  department: "",
  income: "",
  jobType: "",
  companies: [] as string[],
};

const gradeOptions = ["1回生", "2回生", "3回生", "4回生"];
const incomeOptions = [
  "300万円台",
  "500万円台",
  "800万円台",
  "1000万円以上（外資系や超高年収層）",
];
const jobTypeOptions = [
  "超大手がいい",
  "少し有名な中小企業でいい",
  "あまり有名じゃないとこでいい",
  "若くから裁量があるベンチャー",
  "ネームバリューは気にしない",
  "自分に合った企業に行きたい",
];
const companyOptions = [
  "トップ外資・日系大手（例：三菱商事、P&G、外資コンサル）",
  "業界大手〜準大手（例：大手メーカー、都市銀行など）",
  "中堅企業・地銀・BtoB企業など",
  "ベンチャー・スタートアップ企業",
  "特に決まっていない／迷い中",
];

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [extra, setExtra] = useState(initialExtra);
  const [error, setError] = useState("");

  // 各入力ハンドラ
  const handleFeedbackMethod = (v: string) => {
    setExtra({ ...extra, feedbackMethod: v });
    setError("");
  };
  const handleUsername = (v: string) => {
    setExtra({ ...extra, username: v });
    setError("");
  };
  const handleGrade = (v: string) => {
    setExtra({ ...extra, grade: v });
    setError("");
    setStep(step + 1);
  };
  const handleDepartment = (v: string) => {
    setExtra({ ...extra, department: v });
    setError("");
  };
  const handleIncome = (v: string) => {
    setExtra({ ...extra, income: v });
    setError("");
    setStep(step + 1);
  };
  const handleJobType = (v: string) => {
    setExtra({ ...extra, jobType: v });
    setError("");
    setStep(step + 1);
  };
  const handleCompanies = (v: string) => {
    let arr = [...extra.companies];
    if (arr.includes(v)) arr = arr.filter((item) => item !== v);
    else arr.push(v);
    setExtra({ ...extra, companies: arr });
    setError("");
  };

  const goQuestions = () => {
    if (!extra.feedbackMethod) return setError("フィードバックの受け取り方法を入力してください！");
    if (!extra.username) return setError("インスタのユーザー名かLINEの名前を入力してください！");
    if (!extra.grade) return setError("学年を選択してください");
    if (!extra.department) return setError("大学名を入力してください");
    if (!extra.income) return setError("希望年収はどれくらいですか！？");
    if (!extra.jobType) return setError("希望する職柄を選択してください！");
    if (!extra.companies.length) return setError("志望企業群を一つ以上選択してください！");
    router.push({
      pathname: "/questions",
      query: {
        feedbackMethod: extra.feedbackMethod,
        username: extra.username,
        grade: extra.grade,
        department: extra.department,
        income: extra.income,
        jobType: extra.jobType,
        companies: extra.companies.join(","),
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#fdf8f3] flex flex-col items-center justify-center px-2 relative">
      <div
        className="
          w-full max-w-md mx-auto
          bg-white rounded-3xl shadow-lg
          py-8 md:py-16
          px-4 md:px-10
          flex flex-col items-center
          my-8 md:my-24
          transition-all
          relative
        "
      >
        {/* ロゴ：上部に小さく・余白控えめで表示 */}
        <div className="mt-2 mb-4">
          <Image src="/logo.png" alt="ロゴ" width={180} height={120} />
        </div>

        {/* STEP 0: はじめる */}
        {step === 0 && (
          <>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1d3144] text-center mb-8 mt-2">
              関西就活コミュニティ<br />自己分析診断
            </h1>
            <button
              onClick={() => setStep(1)}
              className="w-full py-7 bg-orange-400 hover:bg-orange-500 text-black text-3xl font-bold rounded-xl transition mb-6 shadow-lg"
            >
              診断スタート！
            </button>
            <p className="text-sm md:text-base text-gray-500 mt-2 mb-4 text-center font-semibold leading-relaxed">
              解答時間約5分！<br />
              8万通りの分析結果から自分の得意不得意がわかる！
            </p>
          </>
        )}

        {/* STEP 1: フィードバック受け取り方法 */}
        {step === 1 && (
          <div className="w-full flex flex-col items-center relative">
            <h2 className="text-xl md:text-2xl font-bold mb-5 text-[#1d3144] text-center">
              フィードバックしてほしい<br />
              媒体を入力してください<br />
              <span className="text-base font-normal text-gray-500">(インスタ or 公式LINE)</span>
            </h2>
            <input
              className="w-full border border-gray-300 rounded-xl px-6 py-5 text-2xl mb-4"
              placeholder="例：インスタ or 公式LINE"
              value={extra.feedbackMethod}
              onChange={(e) => handleFeedbackMethod(e.target.value)}
              maxLength={40}
            />
            {error && <div className="text-red-500 text-base mb-3">{error}</div>}
            <button
              onClick={() =>
                extra.feedbackMethod
                  ? setStep(step + 1)
                  : setError("フィードバックの受け取り方法を入力してください")
              }
              className="w-full py-6 bg-orange-400 hover:bg-orange-500 text-black text-2xl font-bold rounded-xl shadow-md"
            >
              次へ
            </button>
          </div>
        )}

        {/* STEP 2: ユーザー名 */}
        {step === 2 && (
          <div className="w-full flex flex-col items-center relative">
            <h2 className="text-xl md:text-2xl font-bold mb-5 text-[#1d3144] text-center">
              インスタのユーザー名<br />
              またはLINEの名前を入力してください
            </h2>
            <input
              className="w-full border border-gray-300 rounded-xl px-6 py-5 text-2xl mb-4"
              placeholder="例：insta: @xxxx、LINE: 田中太郎"
              value={extra.username}
              onChange={(e) => handleUsername(e.target.value)}
              maxLength={40}
            />
            {error && <div className="text-red-500 text-base mb-3">{error}</div>}
            <button
              onClick={() =>
                extra.username
                  ? setStep(step + 1)
                  : setError("ユーザー名を入力してください")
              }
              className="w-full py-6 bg-orange-400 hover:bg-orange-500 text-black text-2xl font-bold rounded-xl shadow-md"
            >
              次へ
            </button>
            {/* === 画像を下部中央に2枚横並びで表示 === */}
            <div className="flex flex-row justify-center gap-4 mt-10 w-full">
              <Image
                src="/username-illust1.png"
                alt="イラスト1"
                width={190}
                height={190}
                className="rounded-xl drop-shadow-md"
                priority
              />
              <Image
                src="/username-illust2.png"
                alt="イラスト2"
                width={190}
                height={190}
                className="rounded-xl drop-shadow-md"
                priority
              />
            </div>
          </div>
        )}

        {/* STEP 3: 学年 */}
        {step === 3 && (
          <>
            <h2 className="text-xl md:text-2xl font-bold mb-5 text-[#1d3144] text-center">
              現在何回生ですか？
            </h2>
            <div className="w-full grid gap-5 mb-4">
              {gradeOptions.map((v) => (
                <button
                  key={v}
                  className={`w-full py-6 rounded-xl border border-gray-200 text-2xl font-semibold
                  ${extra.grade === v
                    ? "bg-orange-200 text-orange-900"
                    : "bg-orange-50 hover:bg-orange-100 text-gray-900"
                  }`}
                  onClick={() => handleGrade(v)}
                >
                  {v}
                </button>
              ))}
            </div>
            {error && <div className="text-red-500 text-base mb-3">{error}</div>}
          </>
        )}

        {/* STEP 4: 学部 */}
        {step === 4 && (
          <>
            <h2 className="text-xl md:text-2xl font-bold mb-5 text-[#1d3144] text-center">
              大学名教えてください！
            </h2>
            <input
              className="w-full border border-gray-300 rounded-xl px-5 py-5 text-2xl mb-4"
              placeholder="例：〇〇大学"
              value={extra.department}
              onChange={(e) => handleDepartment(e.target.value)}
              maxLength={30}
            />
            {error && <div className="text-red-500 text-base mb-3">{error}</div>}
            <button
              onClick={() =>
                extra.department
                  ? setStep(step + 1)
                  : setError("大学名を入力してください")
              }
              className="w-full py-6 bg-orange-400 hover:bg-orange-500 text-black text-2xl font-bold rounded-xl shadow-md"
            >
              次へ
            </button>
          </>
        )}

        {/* STEP 5: 希望年収 */}
        {step === 5 && (
          <>
            <h2 className="text-xl md:text-2xl font-bold mb-5 text-[#1d3144] text-center">
              希望年収はどれくらいですか！？
            </h2>
            <div className="w-full grid gap-5 mb-4">
              {incomeOptions.map((v) => (
                <button
                  key={v}
                  className={`w-full py-6 rounded-xl border border-gray-200 text-2xl font-semibold
                  ${extra.income === v
                    ? "bg-orange-200 text-orange-900"
                    : "bg-orange-50 hover:bg-orange-100 text-gray-900"
                  }`}
                  onClick={() => handleIncome(v)}
                >
                  {v}
                </button>
              ))}
            </div>
            {error && <div className="text-red-500 text-base mb-3">{error}</div>}
          </>
        )}

        {/* STEP 6: 希望職柄 */}
        {step === 6 && (
          <>
            <h2 className="text-xl md:text-2xl font-bold mb-5 text-[#1d3144] text-center">
              希望する職柄を選択してください！
            </h2>
            <div className="w-full grid gap-5 mb-4">
              {jobTypeOptions.map((v) => (
                <button
                  key={v}
                  className={`w-full py-6 rounded-xl border border-gray-200 text-2xl font-semibold
                  ${extra.jobType === v
                    ? "bg-orange-200 text-orange-900"
                    : "bg-orange-50 hover:bg-orange-100 text-gray-900"
                  }`}
                  onClick={() => handleJobType(v)}
                >
                  {v}
                </button>
              ))}
            </div>
            {error && <div className="text-red-500 text-base mb-3">{error}</div>}
          </>
        )}

        {/* STEP 7: 志望企業群 */}
        {step === 7 && (
          <>
            <h2 className="text-xl md:text-2xl font-bold mb-5 text-[#1d3144] text-center">
              志望企業群を選択してください！（複数選択可）
            </h2>
            <div className="w-full grid gap-5 mb-4">
              {companyOptions.map((v) => (
                <label
                  key={v}
                  className="flex items-center w-full bg-orange-50 rounded-xl py-4 px-3 border border-gray-200 cursor-pointer mb-1"
                >
                  <input
                    type="checkbox"
                    name="companies"
                    value={v}
                    checked={extra.companies.includes(v)}
                    onChange={() => handleCompanies(v)}
                    className="mr-4 scale-125 accent-orange-500"
                  />
                  <span className="text-xl">{v}</span>
                </label>
              ))}
            </div>
            {error && <div className="text-red-500 text-base mb-3">{error}</div>}
            <button
              onClick={goQuestions}
              className="w-full py-7 bg-orange-400 hover:bg-orange-500 text-black text-2xl font-bold rounded-xl mt-2 shadow-lg"
            >
              診断スタート！
            </button>
          </>
        )}
      </div>
    </div>
  );
}
