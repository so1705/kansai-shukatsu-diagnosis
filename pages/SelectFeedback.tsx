import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function SelectFeedback() {
  const router = useRouter();
  const {
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
    answers: rawAnswers,
    feedbackType, 
  } = router.query;

  const answers = rawAnswers ? JSON.parse(decodeURIComponent(rawAnswers as string)) : [];

  const hasSubmitted = useRef(false);

  const handleSelect = async (type: string) => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;

    try {
      router.push({
        pathname: "/results",
        query: {
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
          answers: encodeURIComponent(JSON.stringify(answers)),
          feedbackType: type,
        },
      });
    } catch (err: any) {
      alert("遷移エラー：" + (err?.message || "不明なエラー"));
      hasSubmitted.current = false;
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
            onClick={() => handleSelect("面談希望")}
            className="w-full bg-white text-[#223a50] rounded-2xl font-bold text-lg shadow hover:bg-[#ffd488] transition px-8 py-6 flex flex-col items-center border-2 border-[#ffb94c] hover:border-[#ffd488] focus:outline-none"
          >
            <span className="text-3xl md:text-4xl font-extrabold mb-2 text-[#8e24aa]">
              分析結果＋無料オンライン面談
            </span>
            <span className="text-sm font-light text-gray-400 leading-tight mt-1">
              診断結果の詳しい解説と、<br />
              あなた専用のキャリア相談を就活メンターが個別にサポート！！
            </span>
          </button>
          <button
            onClick={() => handleSelect("メール")}
            className="w-full bg-white text-[#223a50] rounded-2xl font-bold text-lg shadow hover:bg-[#ffd488] transition px-8 py-6 flex flex-col items-center border-2 border-[#ffb94c] hover:border-[#ffd488] focus:outline-none"
          >
            <span className="text-3xl md:text-4xl font-extrabold mb-2 text-[#8e24aa]">
              分析結果＋メールでフィードバック
            </span>
            <span className="text-sm font-light text-gray-400 leading-tight mt-1">
              診断結果と丁寧なフィードバックをメールでお届け！
            </span>
          </button>
          <div className="text-lg text-gray-700 text-center mb-8 leading-relaxed font-semibold">
            <br />
            ※次のページもあります<br />
          </div>
        </div>
      </div>
    </div>
  );
}
