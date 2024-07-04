import Image from "next/image";
import { redirect } from "next/navigation";

const Home = ({ children }) => {


    redirect('/homepage')


    return (
        <>
            <main className="light flex flex-col items-center min-h-screen ">
                    {children}
            </main>
        </>
    );
}

export default Home;
