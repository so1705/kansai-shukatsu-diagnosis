import Image from "next/image";
import { useRouter } from "next/router";

export default function SelectFeedback() {
  const router = useRouter();

  const handleSelect = (type) => {
    // 例：サンクスページへ遷移。type情報をクエリで渡すなども可能
    router.push("/thanks");
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl py-12 px-6 flex flex-col items-center">
        {/* ===== イラスト（上部に配置） ===== */}
        <div className="w-full flex justify-center mb-6">
          <Image
            src="/thanks.png" // publicディレクトリ直下に画像を入れてください
            alt="フィードバックイラスト"
            width={180}
            height={110}
            className="object-contain"
            priority
          />
        </div>
        {/* ===== ロゴやタイトルはその下に配置 ===== */}
        <Image src="/logo.png" alt="ロゴ" width={130} height={100} className="mb-6" priority />
        <div className="text-2xl md:text-3xl font-extrabold text-[#223a50] mb-2 text-center">
          ご回答いただきありがとうございました！
        </div>
        <div className="text-lg text-gray-700 text-center mb-8 font-semibold">
          フィードバックの受け取り方法をお選びください。
        </div>
        <div className="w-full flex flex-col gap-6">
          <button
            onClick={() => handleSelect("interview")}
            className="w-full bg-[#ffb94c] text-[#223a50] rounded-2xl font-bold text-lg shadow hover:bg-[#ffd488] transition px-8 py-6 flex flex-col items-center border-2 border-[#ffb94c] hover:border-[#ffd488] focus:outline-none"
          >
            <span className="text-xl font-bold mb-1">分析結果＋無料オンライン面談</span>
            <span className="text-base font-normal text-gray-700">
              診断結果の解説や今後の相談を個別でサポート。<br />
              自分に合った進路のヒントが欲しい方におすすめ！
            </span>
          </button>
          <button
            onClick={() => handleSelect("resultOnly")}
            className="w-full bg-white text-[#223a50] rounded-2xl font-bold text-lg shadow border-2 border-[#bfcad6] hover:border-[#ffb94c] transition px-8 py-6 flex flex-col items-center focus:outline-none"
          >
            <span className="text-xl font-bold mb-1">分析結果のみ</span>
            <span className="text-base font-normal text-gray-700">
              診断結果だけを受け取りたい方向け。<br />
              気軽に自己分析結果を確認したい方はこちら。
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
