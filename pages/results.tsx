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
  "希望無し","北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県", "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県", "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県", "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
];
const grades = ["1回生", "2回生", "3回生", "4回生"];
const graduateYears = ["2026年", "2027年", "2028年", "2029年"];
const graduateMonths = ["3月", "9月"];
const industries = ["自動車・輸送用機器", "電気機器（家電・電子部品など）", "精密機器", "医薬品", "化学（化粧品・化学製品・塗料など）", "鉄鋼・非鉄金属", "機械（工作機械・産業機械など）", "食料・飲料", "繊維・衣料", "ゴム・ガラス・セラミックス","印刷・製紙・パルプ","木材・家電","総合建設（ゼネコン）","建設設計・施工管理","設備工事","不動産売買・仲介","不動産管理・賃貸","デベロッパー","通信（キャリア・インフラ）","ソフトウェア開発","システムインテグレータ（SI）","Webサービス（ポータル・SNSなど）","ゲーム開発","ITコンサルティング","銀行（メガバンク・地銀・信金など）","証券会社","専門商社（食品・繊維・化学品など）","百貨店・量販店","コンビニ・スーパー","EC（ネット通販）","アパレル小売","家電量販店","自動車販売","人材サービス（派遣・紹介・RPO）","広告代理店・マーケティング","コンサルティング（戦略・業務・ITなど）","教育・学習支援（塾・予備校・eラーニングなど）","医療・福祉（病院・介護・クリニック）","ホテル・旅館","外食・フードサービス","エンタメ（映画・音楽・アニメ・スポーツ）","レジャー・観光","美容・理容","冠婚葬祭","警備・清掃","陸運（鉄道・バス・トラック）","海運・航空","倉庫業","宅配・配送サービス","電力・ガス・水道","再生可能エネルギー","ブランド・エンジニアリング","国家公務員・地方公務員","公共団体（独立行政法人など）","教育機関（学校・大学）","NPO・NGO・一般社団法人","こだわらない","特に決めていない"];
const jobs = ["一般事務・営業事務","総理・財務","人事・労務","総務・庶務","法務・コンプライアンス","経営企画・事業企画","広報・IR","法人営業","個人営業","ルートセールス・既存顧客担当","新規開拓営業","インサイドセールス（内勤営業）","海外営業","商品企画・サービス企画","営業企画・販促企画","Webマーケティング・デジタルマーケター","広告企画・プロモーション企画","ブランド・PR企画","システムエンジニア（SE）","プログラマー（PG）","インフラ・ネットワークエンジニア","セキュリティエンジニア","データサイエンティスト・AIエンジニア","QA・テストエンジニア","Webデザイナー・UI/UXデザイナー","グラフィックデザイナー","映像・動画クリエイター","コピーライター・ライター・編集長","アートディレクター","機械設計・電気設計","生産技術・製造オペレーター","品質管理・品質保証","施工管理・建築士","設備管理・メンテナンス","弁護士・司法書士","社会保険労務士・行政書士","不動産鑑定士・不動産管理","通訳・翻訳","医師・歯科医師","看護師・助産師,","薬剤師・医療技術職（検査技術など）","介護福祉士・ケアマネジャー","保育士・幼稚園教師","教員・講師","店舗販売・接客スタッフ","飲食店スタッフ（ホール・キッチン）","カスタマーサポート・コールセンター","ホテル・旅館スタッフ","美容・理容スタッフ","配送ドライバー","倉庫管理・フォークリフトオペレーター","貿易事務・通関士","交通誘導・警備スタッフ","公務員（行政・消防・警察）","自衛官・防衛関連","農林水産業従事者","芸能・モデル・アーティスト","こだわらない","まだ決めてない"];
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
    const fullName = `${extra.lastName}${extra.firstName}`;
    const birth = `${extra.birthYear.replace("年", "")}-${extra.birthMonth.replace("月", "").padStart(2, "0")}-${extra.birthDay.replace("日", "").padStart(2, "0")}`;
    const graduate = `${extra.graduateYear}${extra.graduateMonth}`;

    //await axios.post("/api/sendToDiscord", {
      //...extra,
      //name: fullName,           // 本名（姓＋名）として明示
      //lineName: extra.line,     // LINEユーザー名として明示
      //birth,
      //graduate,
    //});

    await axios.post("/api/saveToFirestore", {
    ...extra,
    fullName: `${extra.lastName} ${extra.firstName}`,
    birth,
   });

    router.push({
  pathname: "/questions",
  query: {
    feedbackMethod: "フォーム入力",
    username: extra.instagram,
    lineName: extra.line,
    fullName: fullName,
    university: extra.university,
    grade: extra.grade,
    industry1: extra.industry1,
    industry2: extra.industry2,
    industry3: extra.industry3,
    job1: extra.job1,
    job2: extra.job2,
    job3: extra.job3,
  },
});


  } catch (err: any) {
  console.error("Firestore保存 or 遷移エラー：", err);
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
) => {
  const placeholder = optional 

  return (
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
        <option value="" disabled hidden>{placeholder}</option>
        {list.map((v) => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>
    </div>
  );
};


  return (
    <div className="min-h-screen bg-[#fdf8f3] flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl flex flex-col items-center mx-auto text-center">
        <Image src="/logo.png" alt="ロゴ" width={180} height={100} className="mb-4" />
        <div className="text-2xl md:text-3xl font-extrabold text-[#223a50] mb-2 text-center"> <br/>より正確な自己分析のために<br/>
        下記詳細の入力お願いします！
        <br/>
        <br/>
        </div>
        <div className="mb-4 text-lg">
          <label className="block font-semibold mb-1">
            フィードバックは公式ラインでさせていただきます！
            <br/>
            本人確認の為にお手数ですが必要なのでご記入ください！
            <br/>
            （最後のページにLINE追加URLあります。）
            　　　<br/>
            </label>
          {input("Instagramユーザー名", "instagram")}
          {input("LINEユーザー名", "line")}
          <div className="mb-4 text-lg">
          <label className="block font-semibold mb-1">お名前</label>
          {input("姓", "lastName")}{input("名", "firstName")}</div>
          <div className="mb-4 text-lg">
          <label className="block font-semibold mb-1">生年月日</label>
          {select("年", "birthYear", years)}{select("月", "birthMonth", months)}{select("日", "birthDay", days)}
          </div>
          <div className="w-full space-y-6 text-lg">
          {select("性別", "gender", genders)}
          <div className="w-full space-y-6 text-lg"></div>
          {select("現住所(都道府県)", "address", prefectures)}
          <div className="mb-4 text-lg">
          <label className="block font-semibold mb-1">電話番号</label>
          {input("電話番号（ハイフンなし）", "phone")}
          </div>

          <div className="mb-4 text-lg">
          <label className="block font-semibold mb-1">メールアドレス</label>
        　{input("メールアドレス", "email")}
          </div>

          <div className="mb-4 text-lg">
          <label className="block font-semibold mb-1">大学名</label>
          {input("大学名（〇〇大学）", "university")}
          </div>
          <div className="w-full space-y-6 text-lg">
          {select("学部", "faculty", faculties)}</div>
          <div className="w-full space-y-6 text-lg">
          {select("学年", "grade", grades)}</div>
          <div className="w-full space-y-6 text-lg">{select("卒業年", "graduateYear", graduateYears)}{select("卒業月", "graduateMonth", graduateMonths)}</div>
          <h2 className="font-bold">希望業界</h2>
          {select("第一希望", "industry1", industries)}
          {select("第二希望", "industry2", industries, true)}
          {select("第三希望", "industry3", industries, true)}
          <h2 className="font-bold">希望職種</h2>
          {select("第一希望", "job1", jobs)}
          {select("第二希望", "job2", jobs, true)}
          {select("第三希望", "job3", jobs, true)}
          <h2 className="font-bold">希望勤務地</h2>
          {select("第一希望", "location1", prefectures)}
          {select("第二希望", "location2", prefectures, true)}
          {select("第三希望", "location3", prefectures, true)}
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button onClick={handleSubmit} className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg mt-6">
            診断スタート！
          </button>
        </div>
      </div>
    </div>
   </div> 
  );
}
