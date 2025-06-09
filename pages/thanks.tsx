import Image from "next/image";

export default function Thanks() {
  return (
    <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-4 relative">
      {/* カード本体 */}
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl py-16 px-6 flex flex-col items-center pb-28">
        <Image src="/logo.png" alt="ロゴ" width={200} height={200} className="mb-8" priority />
        <div className="text-3xl md:text-4xl font-extrabold text-[#223a50] mb-4 text-center">
          ご回答ありがとうございました！
        </div>
        <div className="text-lg text-gray-700 text-center mb-8 leading-relaxed font-semibold">
          回答内容が送信されました。<br />
          結果のフィードバックはLINEやDMでお送りします。
          <div className="mt-8 mb-4">
            <span className="block text-base md:text-lg text-[#223a50] font-bold">
              更に詳しいサポートは下記の公式LINEやインスタURLをクリック！
            </span>
          </div>
          <div className="flex flex-row justify-center items-center gap-5 mt-2">
            <a
              href="https://lin.ee/1ykc4mK"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-xl font-bold shadow hover:bg-green-600 transition text-lg"
            >
              公式LINE
            </a>
            <a
              href="https://www.instagram.com/teppen_syukatsu?igsh=MW9zbnljaHh3c2RieQ%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white rounded-xl font-bold shadow hover:opacity-90 transition text-lg"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
      {/* 戻るボタン：カードの外、画面下部固定 */}
      <div className="fixed inset-x-0 bottom-4 flex justify-center z-10">
        <a
          href="/"
          className="px-10 py-4 bg-[#ffb94c] text-[#223a50] rounded-2xl font-bold text-lg shadow hover:bg-[#ffd488] transition"
        >
          最初の画面へ戻る
        </a>
      </div>
    </div>
  );
}
