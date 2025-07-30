import React from "react";
import Image from "next/image";

const Thanks = () => {
  return (
    <div className="min-h-screen bg-[#fdf8f3] flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl flex flex-col items-center text-center">
        {/* ロゴ */}
        <Image
          src="/logo.png"
          alt="ロゴ"
          width={180}
          height={100}
          className="mb-6"
        />

        {/* メッセージ */}
        <div className="text-2xl text-[#223a50] font-extrabold mb-4">
          お疲れ様でした！<br/>
          回答結果をもとに丁寧に分析させていただきます！<br/>
          分析終了まで少々お時間いただきます。
        </div>
        <div className="text-lg text-gray-700 font-semibold mb-6">
          分析結果は下記のLINEからお送りします。<br/>
          追加後メッセージを送信してお待ちください。
        </div>

        {/* LINEボタン */}
        <a
          href="https://lin.ee/KwguLiV"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-white border-2 border-[#20b96a] rounded-xl font-bold shadow hover:bg-[#20b96a] transition text-lg text-[#168f52] hover:text-white"
          style={{ letterSpacing: "0.04em" }}
        >
          公式LINE
        </a>
      </div>
    </div>
  );
};

export default Thanks;
