// Thanks.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Thanks() {
  const router = useRouter();

  useEffect(() => {
    // クエリパラメータから情報を取得
    const {
      username, lineName, fullName, lastName, firstName, birthdate, gender,
      phone, email, address, university, faculty, grade, gradYear, gradMonth,
      industry1, industry2, industry3,
      occupation1, occupation2, occupation3,
      location1, location2, location3
    } = router.query;

    // Google Sheets用に保存
    fetch("/api/saveToSheets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        username,
        lineName,
        fullName,
        lastName,
        firstName,
        birthdate,
        gender,
        phone,
        email,
        address,
        university,
        faculty,
        grade,
        gradYear,
        gradMonth,
        industry1,
        industry2,
        industry3,
        occupation1,
        occupation2,
        occupation3,
        location1,
        location2,
        location3
      }),
    });
  }, [router.query]);

  return (
    <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-4 relative">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl py-16 px-6 flex flex-col items-center pb-28">
        <Image src="/logo.png" alt="ロゴ" width={230} height={200} className="mb-8" priority />
        <div className="text-lg text-gray-700 text-center mb-8 leading-relaxed font-semibold">
          \ 注意 /<br />
          分析結果はLINEで送らせていただきます！<br />
          下記リンクから追加後、「1」とメッセージを送信してお待ちください。<br />
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
