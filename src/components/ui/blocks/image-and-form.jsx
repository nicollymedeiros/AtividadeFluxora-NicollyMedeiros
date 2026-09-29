import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function HeroFormImageAndForm() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-[1400px] items-center gap-16 px-6 py-20 lg:px-10 lg:py-24">

        <div className="w-full md:w-1/2 lg:w-[520px]">

          <h1 className="text-4xl font-extrabold tracking-tight text-violet-800 lg:text-5xl">
            Vamos conversar sobre o seu estoque?
          </h1>

          <p className="mt-4 text-lg leading-8 text-gray-600">
            Conte um pouco sobre sua empresa e descubra como a Fluxora pode
            ajudar sua equipe a organizar materiais, acompanhar estoques e
            visualizar informações importantes.
          </p>

          <div className="mt-8">
            <Button
              variant="outline"
              type="button"
              className="h-12 w-full justify-center gap-3 rounded-xl border-violet-300 bg-violet-300 px-4 text-base font-medium text-purple-950 transition-all hover:bg-violet-400 cursor-pointer"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 46 47"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                    fill="#4285F4"
                  />

                  <path
                    d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                    fill="#34A853"
                  />

                  <path
                    d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                    fill="#FBBC05"
                  />

                  <path
                    d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                    fill="#EB4335"
                  />
                </svg>
              </span>

              <span>Entre com Google</span>
            </Button>
          </div>

          <Separator className="my-10 mt-3">
            <div className="flex bg-white px-5 text-sm uppercase text-muted-foreground text-center items-center gap-2">
              <div className="flex-1 h-0.5 bg-violet-400 rounded-full"></div>
              Ou
              <div className="flex-1 h-0.5 bg-violet-400 rounded-full"></div>
            </div>
          </Separator>

          <form>
            <div className="mb-4">
              <Label htmlFor="nome" className="text-violet-900 text-md mb-1">Nome Completo:</Label>
              <Input type="text" id="nome" placeholder="Ex: Nicolly Medeiros" className="h-12 rounded-[9px] border-violet-400 bg-white" required/>
            </div>

            <div className="mb-4">
              <Label htmlFor="empresa" className="text-violet-900 text-md mb-1">Sua empresa:</Label>
              <Input type="text" id="empresa" placeholder="Ex: Fluxora" className="h-12 rounded-[9px] border-violet-400 bg-white" required/>
            </div>

            <div className="mb-4">
              <Label htmlFor="email" className="text-violet-900 text-md mb-1">E-mail corporativo:</Label>
              <Input type="email" id="email" placeholder="Ex: suaempresa@email.com.br" className="h-12 rounded-[9px] border-violet-400 bg-white" required/>
            </div>

            <div className="mb-4">
              <Label htmlFor="fluxora-area" className="text-violet-900 text-md mb-1">Área de interesse:</Label>

              <Select required>
                <SelectTrigger id="fluxora-area" className="py-5.5 w-full rounded-[9px] border-violet-400 bg-white shadow-sm">
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Selecione uma opção" disabled>Selecione uma opção</SelectItem>
                  <SelectItem value="Controle de estoque">Controle de estoque</SelectItem>
                  <SelectItem value="Organização de materiais">Organização de materiais</SelectItem>
                  <SelectItem value="Indicadores e relatórios">Indicadores e relatórios</SelectItem>
                  <SelectItem value="Falar com a equipe">Falar com a equipe</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="h-12 w-full cursor-pointer rounded-[9px] bg-violet-900 text-base font-semibold hover:bg-violet-950">Enviar Mensagem</Button>
          </form>
        </div>

        <div className="hidden flex-1 flex-col items-center gap-8 md:flex">
          <div className="flex w-full justify-center">
            <img src="/formulario1.png" alt="Formulário 1 Fluxora" className="max-h-[380px] w-auto object-contain drop-shadow-sm rounded-2xl shadow-[0_15px_30px_rgba(124,58,237,0.35)] border border-violet-600"/>
          </div>

          <div className="flex w-full justify-center ">
            <img src="/formulario2.png" alt="Formulário 2 Fluxora" className="max-h-[380px] w-auto object-contain drop-shadow-sm rounded-2xl shadow-[0_15px_30px_rgba(124,58,237,0.35)] border border-violet-600"/>
          </div>
        </div>
      </div>
    </section>
  );
}