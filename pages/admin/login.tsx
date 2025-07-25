// pages/login.tsx
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { auth, provider } from "../../lib/firebase";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("ログイン成功:", user.uid);

      // 管理者UIDならデータ一覧へ
      if (user.uid === "MLmK2Gdh4dYtHyf2wmWTpCQu9RM2") {
        router.push("/data-list");
      } else {
        alert("アクセス権限がありません");
      }
    } catch (error) {
      console.error("ログイン失敗:", error);
    }
  };

  return (
    <div className="p-10 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4 font-bold">Googleでログイン</h1>
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        Googleでログイン
      </button>
    </div>
  );
}
