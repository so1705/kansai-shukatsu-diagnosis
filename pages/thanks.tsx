import React from "react";

const Thanks = () => {
  return (
    <div className="text-center my-8">
      <div className="text-xl text-gray-700 font-semibold mb-4">
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
    </div>
  );
};

export default Thanks;
