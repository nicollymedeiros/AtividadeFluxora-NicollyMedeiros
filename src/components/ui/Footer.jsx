export default function Footer(){
    return(<>
        <footer className="mt-15 w-full border-t border-violet-800 bg-violet-300">
            <div className="container mx-auto px-4 py-10 md:px-6 2xl:max-w-[1400px]">

                <div className="flex flex-col items-center justify-between gap-8 md:flex-row">

                    <div className="flex flex-col items-center gap-2 md:items-start">
                        <img src="/logo.png" alt="Logo Fluxora" className="w-auto h-20" />
                        <p className="max-w-sm text-center text-sm leading-relaxed text-violet-900 md:text-left">Controle de matéria-prima de forma simples,
                        organizada e inteligente.</p>
                    </div>

                    <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3">
                        <a href="#" className="text-sm font-semibold text-violet-900 transition-colors hover:text-violet-700">Página Inicial</a>
                        <a href="#" className="text-sm font-semibold text-violet-900 transition-colors hover:text-violet-700">Benefícios</a>
                        <a href="#" className="text-sm font-semibold text-violet-900 transition-colors hover:text-violet-700">Funcionalidades</a>
                        <a href="#" className="text-sm font-semibold text-violet-900 transition-colors hover:text-violet-700">Contato</a>
                        <a href="/demo" className="text-sm font-semibold text-violet-900 transition-colors hover:text-violet-700">Ver Demonstração</a>
                    </nav>

                </div>

                <div className="my-8 h-px bg-violet-900 rounded-full" />

                <div className="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
                    <p className="text-sm text-violet-900/70">© {new Date().getFullYear()} Fluxora. Todos os direitos reservados.</p>
                    <p className="text-sm text-violet-900/70">Sistema de controle de matéria-prima</p>
                </div>
            </div>
        </footer>
    </>);
}