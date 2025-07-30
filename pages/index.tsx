// index.tsx（簡略版：診断スタートだけ）
import { useRouter } from "next/router";
import Image from "next/image";

export default function IndexPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#fdf8f3] flex flex-col items-center justify-center px-4 text-center">
      <Image src="/logo.png" alt="ロゴ" width={180} height={100} className="mb-4" />
      <h1 className="text-2xl font-bold mb-4">自己分析ツールへようこそ</h1>
      <p className="mb-6 text-lg text-gray-600">あなたの特性に合ったキャリアを見つけよう！</p>
      <button
        onClick={() => router.push("/questions")}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 text-xl"
      >
        診断スタート！
      </button>
    </div>
  );
}
