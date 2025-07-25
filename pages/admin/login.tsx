import { useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../lib/firebase";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    signInWithPopup(auth, provider).then((result) => {
      const uid = result.user.uid;
      console.log("ログインしたUID:", uid); // ←ここにUIDが出る！
      alert("UIDはコンソールに表示されました");
      router.push("/");
    });
  }, []);

  return <p>ログイン中...</p>;
}
