import Link from "next/link";
import { Button } from "@/components/ui/button";
import 'tailwindcss/tailwind.css';


export default function Login() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="p-8 bg-gray-800 w-full max-w-md rounded-xl">
        <h2 className="text-xl font-bold mb-6 text-gray-100 text-center">Login</h2>
        <form>
          <input
            type="email"
            className="border border-gray-700 p-2 mb-4 w-full bg-gray-700 text-gray-100 rounded-xl"
            placeholder="Email"
          />
          <input
            type="password"
            className="border border-gray-700 p-2 mb-6 w-full bg-gray-700 text-gray-100 rounded-xl"
            placeholder="Password"
          />
          <Link href="/characters/list" passHref>
            <Button variant="default" size="default" className="w-full bg-cyan-600 rounded-xl hover:bg-cyan-700">
              Login
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
}