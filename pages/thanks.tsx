import Image from "next/image";

export default function Thanks() {
  return (
    <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-4 relative">
      {/* カード本体 */}
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl py-16 px-6 flex flex-col items-center pb-28">
        <Image src="/logo.png" alt="ロゴ" width={230} height={200} className="mb-8" priority />
        <div className="text-3xl md:text-4xl font-extrabold text-[#223a50] mb-4 text-center">
        </div>
        <div className="text-lg text-gray-700 text-center mb-8 leading-relaxed font-semibold">
          \  注意  /<br />
          分析結果はLINEで送らせていただきます！<br />
          下記リンクから追加後、「1」とメッセージを送信してお待ちください。<br />
          <div className="mt-8 mb-4">
            <span className="block text-base md:text-lg text-[#223a50] font-bold">
            </span>
          </div>
          <div className="flex flex-row justify-center items-center gap-16 mt-8 mb-2">
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
      </div>
      </div>
  );
}
