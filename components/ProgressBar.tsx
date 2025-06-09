type Props = {
  now: number;
  max: number;
};

export default function ProgressBar({ now, max }: Props) {
  const percent = Math.round((now / max) * 100);
  return (
    <div className="w-full mb-8">
      <div className="h-3 rounded-full bg-[#e3f2fd]">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-[#64b5f6] to-[#1976d2] transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="mt-2 text-center text-[#1976d2] font-bold text-sm tracking-wider">
        進捗 {now} / {max}
      </div>
    </div>
  );
}