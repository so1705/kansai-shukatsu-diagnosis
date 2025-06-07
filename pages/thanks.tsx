import Image from "next/image";

export default function Thanks() {
  return (
    <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl py-16 px-6 flex flex-col items-center">
        <Image src="/logo.png" alt="ロゴ" width={160} height={160} className="mb-8" priority />
        <div className="text-3xl md:text-4xl font-extrabold text-[#223a50] mb-4 text-center">
          ご回答ありがとうございました！
        </div>
        <div className="text-lg text-gray-700 text-center mb-8 leading-relaxed font-semibold">
          回答内容が送信されました。<br />
          結果のフィードバックはLINEやDMでお送りします。
        </div>
        <a
          href="/"
          className="mt-2 px-10 py-4 bg-[#ffb94c] text-[#223a50] rounded-2xl font-bold text-lg shadow hover:bg-[#ffd488] transition"
        >
          最初の画面へ戻る
        </a>
      </div>
    </div>
  );
}
