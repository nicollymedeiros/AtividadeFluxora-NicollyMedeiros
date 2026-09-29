import { Button } from "./button";

export default function Header(){
    return(<>
        <header className="flex justify-between bg-gray-200 py-4 px-8 border-2 border-b-violet-300">
            <div className="w-100">
                <img src="logo.png" alt="Logo Fluxora" className="h-20 w-auto"/>
            </div>

            <ul className="flex gap-15 justify-between items-center">
                <li className="font-semibold cursor-pointer text-violet-900 hover:text-violet-950">Página Inicial</li>
                <li className="font-semibold cursor-pointer text-violet-900 hover:text-violet-950">Benefícios</li>
                <li className="font-semibold cursor-pointer text-violet-900 hover:text-violet-950">Funcionalidades</li>
                <li className="font-semibold cursor-pointer text-violet-900 hover:text-violet-950">Contato</li>
            </ul>

            <div className="flex justify-end items-center w-100">
                <a href="/demo"><Button className="h-10 bg-purple-900 p-3 rounded-2xl font-bold text-white cursor-pointer text-[15px] hover:bg-purple-950">Ver Demonstração</Button></a>
            </div>
        </header>
    </>);
}