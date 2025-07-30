import ProgressBar from "./ProgressBar"; // ← 追加

type Props = {
  idx: number;
  total: number;
  question: string;
  options: string[];
  onAnswer: (ans: string) => void;
};

export default function QuestionCard({ idx, total, question, options, onAnswer }: Props) {
  return (
    <div className="w-full flex flex-col items-center">
      {/* プログレスバー追加 */}
      <ProgressBar now={idx + 1} max={total} />
      <div className="text-3xl md:text-5xl font-black text-center text-[#222] mb-14 leading-snug drop-shadow-sm">
        {question}
      </div>
      <div className="flex flex-col gap-10 w-full items-center">
        {options.map((opt, i) => (
          <button
            key={i}
            className="
              w-full 
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
              max-w-[500px]
            "
            style={{ letterSpacing: "0.03em" }}
            onClick={() => onAnswer(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
