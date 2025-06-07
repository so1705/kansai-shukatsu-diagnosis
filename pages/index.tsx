import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const initialExtra = {
  username: "",
  grade: "",
  department: "",
  income: "",
  jobType: "",
  companies: [] as string[],
};

const gradeOptions = ["1回生", "2回生", "3回生", "4回生", "その他"];
const incomeOptions = [
  "300万円台",
  "400万円台",
  "500万円以上",
  "800万円以上（外資系や超高年収層）",
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
    if (!extra.username) return setError("インスタのユーザー名かLINEの名前の名前を入力してください！");
    if (!extra.grade) return setError("学年を選択してください");
    if (!extra.department) return setError("学部を入力してください");
    if (!extra.income) return setError("希望年収はどれくらいですか！？");
    if (!extra.jobType) return setError("希望する職柄を選択してください！");
    if (!extra.companies.length) return setError("志望企業群を一つ以上選択してください！");
    router.push({
      pathname: "/questions",
      query: {
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
    <div className="min-h-screen bg-[#fdf8f3] flex flex-col items-center justify-center px-2">
      <div className="w-full max-w-lg mx-auto bg-white rounded-3xl shadow-lg py-10 px-6 flex flex-col items-center">
        {/* ロゴ */}
        <div className="mb-6">
          <Image src="/logo.png" alt="ロゴ" width={300} height={300} />
        </div>
        {/* STEP 0: はじめる */}
        {step === 0 && (
          <>
            <h1 className="text-3xl font-bold text-[#1d3144] text-center mb-8">
              関西就活コミュニティ<br />自己分析診断
            </h1>
            <button
              onClick={() => setStep(1)}
              className="w-full py-4 bg-orange-400 hover:bg-orange-500 text-black text-2xl font-bold rounded-xl transition mb-4"
            >
              診断スタート！
            </button>
          </>
        )}
        {/* STEP 1: ユーザー名 */}
        {step === 1 && (
          <>
            <h2 className="text-xl font-bold mb-3 text-[#1d3144]">インスタのユーザー名かLINEの名前の名前を入力してください</h2>
            <input
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg mb-3"
              placeholder="例：insta: @xxxx、LINE: 田中太郎"
              value={extra.username}
              onChange={(e) => setExtra({ ...extra, username: e.target.value })}
              maxLength={40}
            />
            {error && <div className="text-red-500 text-base mb-2">{error}</div>}
            <button
              onClick={() =>
                extra.username ? setStep(step + 1) : setError("ユーザー名を入力してください")
              }
              className="w-full py-3 bg-orange-400 hover:bg-orange-500 text-black text-xl font-bold rounded-xl"
            >
              次へ
            </button>
          </>
        )}
        {/* STEP 2: 学年 */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-bold mb-3 text-[#1d3144]">現在何回生ですか？</h2>
            <div className="w-full grid gap-3 mb-3">
              {gradeOptions.map((v) => (
                <button
                  key={v}
                  className={`w-full py-3 rounded-xl border border-gray-200 text-lg font-semibold 
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
            {error && <div className="text-red-500 text-base mb-2">{error}</div>}
          </>
        )}
        {/* STEP 3: 学部 */}
        {step === 3 && (
          <>
            <h2 className="text-xl font-bold mb-3 text-[#1d3144]">学部は何ですか？</h2>
            <input
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg mb-3"
              placeholder="例：経済学部"
              value={extra.department}
              onChange={(e) => handleDepartment(e.target.value)}
              maxLength={30}
            />
            {error && <div className="text-red-500 text-base mb-2">{error}</div>}
            <button
              onClick={() =>
                extra.department ? setStep(step + 1) : setError("学部を入力してください")
              }
              className="w-full py-3 bg-orange-400 hover:bg-orange-500 text-black text-xl font-bold rounded-xl"
            >
              次へ
            </button>
          </>
        )}
        {/* STEP 4: 希望年収 */}
        {step === 4 && (
          <>
            <h2 className="text-xl font-bold mb-3 text-[#1d3144]">希望年収はどれくらいですか！？</h2>
            <div className="w-full grid gap-3 mb-3">
              {incomeOptions.map((v) => (
                <button
                  key={v}
                  className={`w-full py-3 rounded-xl border border-gray-200 text-lg font-semibold 
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
            {error && <div className="text-red-500 text-base mb-2">{error}</div>}
          </>
        )}
        {/* STEP 5: 希望職柄 */}
        {step === 5 && (
          <>
            <h2 className="text-xl font-bold mb-3 text-[#1d3144]">希望する職柄を選択してください！</h2>
            <div className="w-full grid gap-3 mb-3">
              {jobTypeOptions.map((v) => (
                <button
                  key={v}
                  className={`w-full py-3 rounded-xl border border-gray-200 text-lg font-semibold 
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
            {error && <div className="text-red-500 text-base mb-2">{error}</div>}
          </>
        )}
        {/* STEP 6: 志望企業群 */}
        {step === 6 && (
          <>
            <h2 className="text-xl font-bold mb-3 text-[#1d3144]">志望企業群を一つ以上選択してください！</h2>
            <div className="w-full grid gap-3 mb-3">
              {companyOptions.map((v) => (
                <label key={v} className="flex items-center w-full bg-orange-50 rounded-xl py-3 px-2 border border-gray-200 cursor-pointer mb-1">
                  <input
                    type="checkbox"
                    name="companies"
                    value={v}
                    checked={extra.companies.includes(v)}
                    onChange={() => handleCompanies(v)}
                    className="mr-3 scale-125 accent-orange-500"
                  />
                  <span className="text-lg">{v}</span>
                </label>
              ))}
            </div>
            {error && <div className="text-red-500 text-base mb-2">{error}</div>}
            <button
              onClick={goQuestions}
              className="w-full py-3 bg-orange-400 hover:bg-orange-500 text-black text-xl font-bold rounded-xl mt-2"
            >
              診断スタート！
            </button>
          </>
        )}
      </div>
    </div>
  );
}
