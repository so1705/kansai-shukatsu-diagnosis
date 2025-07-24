import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

// セレクト項目リスト
const years = Array.from({ length: 30 }, (_, i) => `${1995 + i}年`);
const months = Array.from({ length: 12 }, (_, i) => `${i + 1}月`);
const days = Array.from({ length: 31 }, (_, i) => `${i + 1}日`);
const genders = ["男性", "女性", "その他"];
const prefectures = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県", "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県", "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県", "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
];
const grades = ["1回生", "2回生", "3回生", "4回生"];
const graduateYears = ["2026年", "2027年", "2028年", "2029年"];
const graduateMonths = ["3月", "9月"];
const industries = ["メーカー", "商社", "金融", "IT", "マスコミ", "広告", "教育", "医療", "官公庁", "その他"];
const jobs = ["営業", "企画", "事務", "技術", "研究", "マーケ", "人事", "広報", "総合職", "専門職"];
const faculties = [
  "人文科学系", "社会科学系", "理工系", "生命・医療・健康系",
  "農学・環境系", "国際・語学・文化系", "社会福祉・心理・教育系",
  "芸術・文化・デザイン系", "その他"
];

export default function IndexPage() {
  const router = useRouter();
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
    const requiredFields = [
      "instagram", "line", "lastName", "firstName",
      "birthYear", "birthMonth", "birthDay", "gender",
      "address", "phone", "email",
      "university", "faculty", "grade", "graduateYear", "graduateMonth",
      "industry1", "job1", "location1"
    ];
    for (const field of requiredFields) {
      if (!extra[field as keyof typeof extra]) {
        setError("未入力の必須項目があります。全て入力してください。");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      await axios.post("/api/sendToDiscord", {
        ...extra,
        name: `${extra.lastName}${extra.firstName}`,
        birth: `${extra.birthYear}-${extra.birthMonth}-${extra.birthDay}`,
        graduate: `${extra.graduateYear}${extra.graduateMonth}`
      });
      await axios.post("/api/saveToSheets", {
        ...extra,
        fullName: `${extra.lastName} ${extra.firstName}`,
        birth: `${extra.birthYear}-${extra.birthMonth}-${extra.birthDay}`
      });
      router.push({
        pathname: "/questions",
        query: {
          feedbackMethod: "フォーム入力",
          username: `${extra.lastName}${extra.firstName}`,
          grade: extra.grade,
          department: extra.university,
          concern: "",
          income: "",
          jobType: extra.job1,
          companies: [extra.industry1, extra.industry2, extra.industry3].filter(Boolean).join(",")
        }
      });
    } catch (err: any) {
      setError("送信に失敗しました：" + err.message);
    }
  };

  const input = (placeholder: string, key: keyof typeof extra) => (
    <input placeholder={placeholder} className="input" value={extra[key]} onChange={(e) => setExtra({ ...extra, [key]: e.target.value })} />
  );

  const select = (label: string, key: keyof typeof extra, list: string[], optional = false) => (
    <div>
      <label className="font-semibold">
        {label}{optional && <span className="text-sm text-gray-400">（任意）</span>}
      </label>
      <select value={extra[key]} onChange={(e) => setExtra({ ...extra, [key]: e.target.value })} className="input">
        <option value="">{label}</option>
        {list.map((v) => <option key={v}>{v}</option>)}
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fdf8f3] flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl flex flex-col items-center">
        <Image src="/logo.png" alt="ロゴ" width={180} height={100} className="mb-4" />
        <h1 className="text-xl md:text-2xl font-bold text-center mb-8">自己分析スタート前の入力フォーム</h1>
        <div className="w-full space-y-6 text-lg">
          {input("Instagramユーザー名", "instagram")}
          {input("LINEユーザー名", "line")}
          <div className="flex gap-2">{input("姓", "lastName")}{input("名", "firstName")}</div>
          <div className="flex gap-2">{select("年", "birthYear", years)}{select("月", "birthMonth", months)}{select("日", "birthDay", days)}</div>
          {select("性別", "gender", genders)}
          {select("現住所（都道府県）", "address", prefectures)}
          {input("電話番号", "phone")}
          {input("メールアドレス", "email")}
          {input("大学名", "university")}
          {select("学部名", "faculty", faculties)}
          {select("学年", "grade", grades)}
          <div className="flex gap-2">{select("卒業年", "graduateYear", graduateYears)}{select("月", "graduateMonth", graduateMonths)}</div>
          <h2 className="font-bold">希望業界</h2>
          {select("希望業界①", "industry1", industries)}
          {select("希望業界②", "industry2", industries, true)}
          {select("希望業界③", "industry3", industries, true)}
          <h2 className="font-bold">希望職種</h2>
          {select("希望職種①", "job1", jobs)}
          {select("希望職種②", "job2", jobs, true)}
          {select("希望職種③", "job3", jobs, true)}
          <h2 className="font-bold">希望勤務地</h2>
          {select("勤務地①", "location1", prefectures)}
          {select("勤務地②", "location2", prefectures, true)}
          {select("勤務地③", "location3", prefectures, true)}
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button onClick={handleSubmit} className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg mt-6">
            診断スタート！
          </button>
        </div>
      </div>
    </div>
  );
}
