import Image from "next/image";

export default function Sidebar() {
  return (
    <div>
      <div>
        <Image src="/logo.png" width="50" height="50" alt="logo" priority />
      </div>
    </div>
  );
}
