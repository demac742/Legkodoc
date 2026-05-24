import { ArrowRight } from "lucide-react";
import Link from "next/link";

type RippleButtonProps = {
  href: string;
  label: string;
  caption?: string;
  className?: string;
};

export function RippleButton({
  href,
  label,
  caption = "ЛЕГКОДОК",
  className = "",
}: RippleButtonProps) {
  return (
    <Link
      className={[
        "group relative block h-[92px] w-full min-w-[300px] max-w-[460px]",
        className,
      ].join(" ")}
      href={href}
    >
      <div className="absolute inset-y-[7px] right-0 w-[94px] rounded-r-[30px] border border-[#d7d2cb] bg-[linear-gradient(180deg,#f3efe9_0%,#ebe5dc_100%)] shadow-[0_18px_40px_rgba(17,17,17,0.10)] transition-all duration-500 ease-out group-hover:rotate-[4deg]" />

      <div className="absolute inset-y-[7px] right-4 flex w-[82px] items-center justify-center rounded-r-[28px] border-l border-[#d8d1c8]">
        <span className="-rotate-90 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.24em] text-[#67645e]">
          {caption}
        </span>
      </div>

      <div className="absolute inset-0 rounded-[30px] border border-[#dbd5ce] bg-[linear-gradient(180deg,#faf8f4_0%,#f3efe8_100%)] shadow-[0_18px_34px_rgba(17,17,17,0.08)]" />

      <div className="absolute inset-y-0 left-0 z-10 w-[calc(100%-30px)] rounded-[30px] border border-[#262628] bg-[linear-gradient(180deg,#343437_0%,#171719_100%)] shadow-[0_22px_42px_rgba(17,17,17,0.22)] transition-transform duration-500 ease-out group-hover:-translate-x-0.5 group-hover:-rotate-[2deg]">
        <div className="flex h-full items-center justify-between gap-4 px-7 md:px-8">
          <span className="sans text-left text-[22px] font-bold text-[#f7f5f1] md:text-[32px] md:leading-none">
            {label}
          </span>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/8 text-[#f7f5f1] transition-colors duration-300 group-hover:bg-white/12">
            <ArrowRight size={24} />
          </span>
        </div>
      </div>
    </Link>
  );
}
