// pages/results.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

// セレクトリスト（index.tsx と同じ）
const years = Array.from({ length: 30 }, (_, i) => `${1995 + i}年`);
const months = Array.from({ length: 12 }, (_, i) => `${i + 1}月`);
const days = Array.from({ length: 31 }, (_, i) => `${i + 1}日`);
const genders = ["男性", "女性", "その他"];
const prefectures = [ "希望無し", "北海道", "青森県", "岩手県", "宮城県", /* ... */ "沖縄県" ];
const grades = ["1回生", "2回生", "3回生", "4回生"];
const graduateYears = ["2026年", "2027年", "2028年", "2029年"];
const graduateMonths = ["3月", "9月"];
const industries = ["自動車・輸送用機器", "電気機器", "医薬品", "コンサル", "こだわらない"];
const jobs = ["法人営業", "商品企画", "事務職", "エンジニア", "こだわらない"];
const faculties = ["人文科学系", "社会科学系", "理工系", "その他"];

export default function ResultsPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [extra, setExtra] = useState({
    instagram: "", line: "", lastName: "", firstName: "",
    birthYear: "", birthMonth: "", birthDay: "", gender: "",
    address: "", phone: "", email: "",
    university: "", faculty: "", grade: "", graduateYear: "", graduateMonth: "",
    industry1: "", industry2: "", industry3: "",
    job1: "", job2: "", job3: "",
    location1: "", location2: "", location3: ""
  });

  const validate = () => {
    const required = [
      "instagram", "line", "lastName", "firstName",
      "birthYear", "birthMonth", "birthDay", "gender",
      "address", "phone", "email", "university",
      "faculty", "grade", "graduateYear", "graduateMonth",
      "industry1", "job1", "location1"
    ];
    for (const key of required) {
      if (!extra[key as keyof typeof extra]) {
        setError("未入力の必須項目があります。全て入力してください。");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      const fullName = `${extra.lastName} ${extra.firstName}`;
      const birth = `${extra.birthYear.replace("年", "")}-${extra.birthMonth.replace("月", "").padStart(2, "0")}-${extra.birthDay.replace("日", "").padStart(2, "0")}`;
      const graduate = `${extra.graduateYear}${extra.graduateMonth}`;

      // Firestore保存
      await axios.post("/api/saveToFirestore", {
        ...extra,
        fullName,
        birth,
        graduate,
        timestamp: new Date().toISOString(),
      });

      // Discord送信
      await axios.post("/api/sendToDiscord", {
        username: extra.instagram,
        lineName: extra.line,
        fullName,
        university: extra.university,
        grade: extra.grade,
        industry1: extra.industry1,
        industry2: extra.industry2,
        industry3: extra.industry3,
        job1: extra.job1,
        job2: extra.job2,
        job3: extra.job3,
        feedbackType: "フォーム送信完了", // 任意
        answers: [],
      });

      setSubmitted(true);
    } catch (err: any) {
      console.error("送信エラー：", err);
      setError("送信に失敗しました：" + err.message);
    }
  };

  const input = (placeholder: string, key: keyof typeof extra) => (
    <input placeholder={placeholder} className="input" value={extra[key]} onChange={(e) => setExtra({ ...extra, [key]: e.target.value })} />
  );

  const select = (
    label: string,
    key: keyof typeof extra,
    list: string[],
    optional = false
  ) => (
    <div className="mb-4">
      <label className="block font-semibold mb-1">
        {label}
        {optional && <span className="text-sm text-gray-400">（任意）</span>}
      </label>
      <select
        value={extra[key]}
        onChange={(e) => setExtra({ ...extra, [key]: e.target.value })}
        className="input"
      >
        <option value="" disabled hidden>{optional ? "選択（任意）" : "選択してください"}</option>
        {list.map((v) => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fdf8f3] flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl text-center">
        <Image src="/logo.png" alt="ロゴ" width={180} height={100} className="mb-4" />
        <h1 className="text-2xl font-bold mb-6">最後に、あなたの情報を入力してください</h1>

        {!submitted ? (
          <>
            {input("Instagramユーザー名", "instagram")}
            {input("LINEユーザー名", "line")}
            <div className="mb-4">{input("姓", "lastName")} {input("名", "firstName")}</div>
            <div className="mb-4">{select("年", "birthYear", years)} {select("月", "birthMonth", months)} {select("日", "birthDay", days)}</div>
            {select("性別", "gender", genders)}
            {select("現住所", "address", prefectures)}
            {input("電話番号", "phone")}
            {input("メールアドレス", "email")}
            {input("大学名", "university")}
            {select("学部", "faculty", faculties)}
            {select("学年", "grade", grades)}
            {select("卒業年", "graduateYear", graduateYears)} {select("卒業月", "graduateMonth", graduateMonths)}
            <h2 className="font-bold mt-6">希望業界</h2>
            {select("第一希望", "industry1", industries)}
            {select("第二希望", "industry2", industries, true)}
            {select("第三希望", "industry3", industries, true)}
            <h2 className="font-bold mt-6">希望職種</h2>
            {select("第一希望", "job1", jobs)}
            {select("第二希望", "job2", jobs, true)}
            {select("第三希望", "job3", jobs, true)}
            <h2 className="font-bold mt-6">希望勤務地</h2>
            {select("第一希望", "location1", prefectures)}
            {select("第二希望", "location2", prefectures, true)}
            {select("第三希望", "location3", prefectures, true)}
            {error && <p className="text-red-500">{error}</p>}
            <button onClick={handleSubmit} className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg mt-6">
              送信して分析を完了する
            </button>
          </>
        ) : (
          <>
            <div className="text-xl text-gray-700 font-semibold my-8">
              ご入力ありがとうございました！<br />
              分析結果は下記のLINEからお送りします。
            </div>
            <a
              href="https://lin.ee/KwguLiV"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white border-2 border-[#20b96a] rounded-xl font-bold shadow hover:bg-[#20b96a] transition text-lg text-[#168f52] hover:text-white"
              style={{ letterSpacing: "0.04em" }}
            >
              公式LINE
            </a>
          </>
        )}
      </div>
    </div>
  );
}
