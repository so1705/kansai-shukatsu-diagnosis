import { useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../lib/firebase"; // ← 相対パス注意（libの場所に合わせて）
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const uid = result.user.uid;
        console.log("ログインしたUID:", uid); // 万が一確認したい場合に表示

        if (uid === "MLmK2Gdh4dYtHyf2wmWTpCQu9RM2") {
          router.push("/data-list");
        } else {
          alert("あなたにはアクセス権がありません");
          router.push("/");
        }
      })
      .catch((error) => {
        console.error("ログインエラー:", error);
        alert("ログインに失敗しました");
        router.push("/");
      });
  }, []);

  return <p>ログイン中...</p>;
}
