interface QuestionCardProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
  onBack: () => void;
  step: number;
  total: number;
  image?: string;
}

export default function QuestionCard({
  question,
  options,
  onAnswer,
  onBack,
  step,
  total,
  image,
}: QuestionCardProps) {
  return (
    <div className="w-full max-w-md bg-white rounded-[2rem] shadow-lg flex flex-col items-center py-16 px-6 min-h-[500px] relative mb-14 text-center">
      {/* プログレス */}
      <div className="w-full mb-5 text-center">
        <div className="text-[#1976d2] text-sm font-bold mb-1">
          進捗 {step + 1} / {total}
        </div>
      </div>

      {/* 質問文 */}
      <div className="w-full flex justify-center">
        <div className="text-3xl md:text-5xl font-black text-center text-[#222] mb-14 leading-snug drop-shadow-sm max-w-[500px]">
          {question}
        </div>
      </div>

      {/* 選択肢ボタン */}
      <div className="flex flex-col gap-10 w-full items-center">
        {options.map((opt, i) => (
          <button
            key={i}
            className="
              w-full 
              max-w-[500px]
              mx-auto
              py-8
              text-3xl font-bold
              bg-white hover:bg-[#ffe0b2]
              rounded-full
              border-2 border-[#90caf9]
              shadow
              text-[#1976d2]
              hover:scale-105
              duration-100
              transition
            "
            style={{ letterSpacing: "0.03em" }}
            onClick={() => onAnswer(opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* 戻るボタン */}
      {step > 0 && (
        <div className="w-full flex justify-center mt-10">
          <button
            onClick={onBack}
            className="px-6 py-2 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 text-base font-semibold transition shadow"
          >
            ← 前の設問に戻る
          </button>
        </div>
      )}

      {/* イラスト */}
      {image && (
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[60px]">
          <img
            src={image}
            alt="イラスト"
            width={200}
            height={200}
            className="rounded-xl drop-shadow-md"
          />
        </div>
      )}
    </div>
  );
}
