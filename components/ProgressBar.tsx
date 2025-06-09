type Props = {
  now: number;
  max: number;
};

export default function ProgressBar({ now, max }: Props) {
  const percent = Math.round((now / max) * 100);
  return (
    <div className="w-full mb-8">
      <div className="h-4 rounded-full bg-[#e3f2fd]">
        <div
          className="h-4 rounded-full bg-gradient-to-r from-[#64b5f6] to-[#1976d2] transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
