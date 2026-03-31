
"use client";

import { useAuth } from "@/context/userContext";

const Home = () => {
    const { token } = useAuth();
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <h2>Welcome to CMC Telehealth PWA</h2>
            <p>Token: {token}</p>
        </div>
    );
}

export default Home;