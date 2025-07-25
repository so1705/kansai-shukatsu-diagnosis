import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import { auth, db } from "../lib/firebase";
import LogoutButton from "../components/LogoutButton";

type DataItem = {
  id: string;
  [key: string]: any;
};

const fieldOrder = [
  "fullName", "lastName", "firstName", "birth", "gender",
  "address", "phone", "email", "university", "faculty",
  "grade", "graduateYear", "graduateMonth",
  "industry1", "industry2", "industry3",
  "job1", "job2", "job3",
  "location1", "location2", "location3",
  "timestamp",
];

const fieldLabels: Record<string, string> = {
  timestamp: "登録日時",
  fullName: "氏名",
  lastName: "姓",
  firstName: "名",
  birth: "生年月日",
  gender: "性別",
  address: "住所",
  phone: "電話番号",
  email: "メールアドレス",
  university: "大学",
  faculty: "学部",
  grade: "学年",
  graduateYear: "卒業年",
  graduateMonth: "卒業月",
  industry1: "志望業界①",
  industry2: "志望業界②",
  industry3: "志望業界③",
  job1: "希望職種①",
  job2: "希望職種②",
  job3: "希望職種③",
  location1: "希望勤務地①",
  location2: "希望勤務地②",
  location3: "希望勤務地③",
};

export default function DataList() {
  const [dataList, setDataList] = useState<DataItem[]>([]);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  // 認証チェック
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.uid === "MLmK2Gdh4dYtHyf2wmWTpCQu9RM2") {
        setAuthorized(true);
        fetchData(); // 認証通過後にデータ取得
      } else {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    const snapshot = await getDocs(collection(db, "database"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDataList(data);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("このデータを削除しますか？");
    if (!confirmDelete) return;
    await deleteDoc(doc(db, "database", id));
    fetchData();
  };

  const handleEdit = (id: string) => {
    router.push(`/edit/${id}`);
  };

  if (!authorized) return <p>認証中...</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">登録データ一覧</h1>
        <LogoutButton />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              {fieldOrder.map((field) => (
                <th key={field} className="border px-2 py-1 whitespace-nowrap">
                  {fieldLabels[field] || field}
                </th>
              ))}
              <th className="border px-2 py-1">操作</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                {fieldOrder.map((field) => (
                  <td key={field} className="border px-2 py-1 whitespace-nowrap">
                    {field === "timestamp" && item[field]?.toDate
                      ? item[field].toDate().toLocaleString("ja-JP")
                      : item[field] || "-"}
                  </td>
                ))}
                <td className="border px-2 py-1 whitespace-nowrap text-center">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
