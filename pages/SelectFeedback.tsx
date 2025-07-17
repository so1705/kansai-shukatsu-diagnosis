import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";

export default function SelectFeedback() {
  const router = useRouter();
  const {
    username,
    grade,
    department,
    income,
    jobType,
    companies,
    answers
  } = router.query;

  const handleSelect = async (type: string) => {
    try {
      await axios.post("/api/sendToDiscord", {
        username,
        grade,
        department,
        income,
        jobType,
        companies: companies?.toString().split(","),
        answers: answers ? JSON.parse(answers as string) : [],
        feedbackType: type,
      });
      router.push("/thanks");
    } catch (err) {
      alert("送信エラー：" + err?.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl py-12 px-6 flex flex-col items-center">
        <div className="w-full flex justify-center mb-6">
          <Image
            src="/thanks.png"
            alt="フィードバックイラスト"
            width={230}
            height={230}
            className="object-contain"
            priority
          />
        </div>
        <div className="text-2xl md:text-3xl font-extrabold text-[#223a50] mb-2 text-center">
          ご回答いただきありがとうございました！
        </div>
        <div className="text-lg text-gray-700 text-center mb-8 font-semibold">
          フィードバックの受け取り方法をお選びください。
        </div>
        <div className="w-full flex flex-col gap-6">
          <button
            onClick={() => handleSelect("interview")}
            className="w-full bg-white text-[#223a50] rounded-2xl font-bold text-lg shadow hover:bg-[#ffd488] transition px-8 py-6 flex flex-col items-center border-2 border-[#ffb94c] hover:border-[#ffd488] focus:outline-none"
          >
            <span className="text-3xl md:text-4xl font-extrabold mb-2 text-[#8e24aa]">分析結果＋無料オンライン面談</span>
            <span className="text-sm font-light text-gray-400 leading-tight mt-1">
              診断結果の詳しい解説と、<br />
              あなた専用のキャリア相談を個別にサポート！！
            </span>
          </button>
          <button
            onClick={() => handleSelect("resultOnly")}
            className="w-full bg-white text-[#223a50] rounded-2xl font-bold text-lg shadow hover:bg-[#ffd488] transition px-8 py-6 flex flex-col items-center border-2 border-[#ffb94c] hover:border-[#ffd488] focus:outline-none"
          >
            <span className="text-3xl md:text-4xl font-extrabold mb-2 text-[#8e24aa]">分析結果＋メールでフィードバック</span>
            <span className="text-sm font-light text-gray-400 leading-tight mt-1">
              診断結果と丁寧なフィードバックをメールでお届け！
            </span>
          </button>
          <div className="text-lg text-gray-700 text-center mb-8 leading-relaxed font-semibold">
          　　　　　　　　　　　<br/>
          ※次のページもあります<br />
          </div>
        </div>
      </div>
    </div>
  );
}
