import Link from "next/link";
import 'tailwindcss/tailwind.css';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-gray-100 p-4">
      <ul className="space-y-2">
        <li>
          <Link href="/characters/list">
            <p className="block py-2 px-4 rounded-xl hover:bg-gray-700 transition-colors">
              Characters
            </p>
          </Link>
        </li>
        <li>
          <Link href="/episodes/list">
            <p className="block py-2 px-4 rounded-xl hover:bg-gray-700 transition-colors">
              Episodes
            </p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;