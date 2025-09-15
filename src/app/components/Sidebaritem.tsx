export default function Sidebaritem({
  icon,
  text,
  active,
}: {
  text: string;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <div className="hoverEffect flex items-center text-gray-700 justify-center xl:justify-start text-lg space-x-3">
      {icon}
      <span className={`${active && "font-bold"} hidden xl:inline`}>
        {text}
      </span>
    </div>
  );
}
