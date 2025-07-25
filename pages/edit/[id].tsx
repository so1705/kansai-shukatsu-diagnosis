// pages/edit/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

const fieldList = [
  "fullName", "lastName", "firstName", "birth", "gender",
  "address", "phone", "email", "university", "faculty",
  "grade", "graduateYear", "graduateMonth",
  "industry1", "industry2", "industry3",
  "job1", "job2", "job3",
  "location1", "location2", "location3",
];

const fieldLabels: Record<string, string> = {
  fullName: "氏名", lastName: "姓", firstName: "名", birth: "生年月日",
  gender: "性別", address: "住所", phone: "電話番号", email: "メールアドレス",
  university: "大学", faculty: "学部", grade: "学年",
  graduateYear: "卒業年", graduateMonth: "卒業月",
  industry1: "志望業界①", industry2: "志望業界②", industry3: "志望業界③",
  job1: "希望職種①", job2: "希望職種②", job3: "希望職種③",
  location1: "勤務地①", location2: "勤務地②", location3: "勤務地③",
};

export default function EditPage() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const docRef = doc(db, "database", String(id));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    const docRef = doc(db, "database", String(id));
    await updateDoc(docRef, formData);
    alert("更新しました");
    router.push("/admin");
  };

  if (loading) return <div>読み込み中...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">編集フォーム</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fieldList.map((field) => (
          <div key={field} className="flex flex-col">
            <label className="font-semibold">{fieldLabels[field] || field}</label>
            <input
              name={field}
              value={formData[field] || ""}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          更新する
        </button>
      </form>
    </div>
  );
}
