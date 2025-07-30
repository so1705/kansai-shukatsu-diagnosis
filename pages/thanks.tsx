import React from "react";

const Thanks = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center px-4">
        <h1 className="text-3xl font-bold mb-4">診断ありがとうございました！</h1>
        <p className="text-lg">LINEから結果のフィードバックが届くまでお待ちください。</p>
        <p className="mt-6 text-sm text-gray-500">画面はこのまま閉じていただいて構いません。</p>
      </div>
    </div>
  );
};

export default Thanks;
