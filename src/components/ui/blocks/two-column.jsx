import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

const competencies = [
  'Controle de estoque',
  'Materiais organizados',
  'Alertas de faltas',
  'Indicadores claros',
  'Movimentações rápidas',
  'Visão do estoque'
];

export default function AboutSectionTwoColumn() {
  return (
    <section className="container mx-auto px-4 py-24 md:px-6 2xl:max-w-[1400px] bg-violet-50">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

        <div className="relative aspect-square overflow-hidden rounded-2xl border border-violet-400 shadow-sm">
          <img
            src="/previa.png"
            alt="Equipe trabalhando em conjunto"
            className="w-full object-content"
          />
        </div>

        <div className="space-y-6">

          <div>
            <h4 className="mb-2 font-semibold text-violet-700">
              Prévia do Sistema
            </h4>

            <h2 className="text-3xl font-bold tracking-tight text-violet-950 md:text-4xl">
              Mais organização para quem precisa ter o estoque sob controle
            </h2>
          </div>

          <p className="leading-relaxed text-violet-900/70 indent-8 text-justify">
            A Fluxora ajuda indústrias a acompanhar suas matérias-primas de
            forma simples e organizada. Em um único sistema, você pode
            visualizar materiais, acompanhar quantidades e identificar o que
            precisa de atenção.
          </p>

          <p className="leading-relaxed text-violet-900/70 indent-8 text-justify">
            Transformamos informações do estoque em uma visão clara do que
            está acontecendo, facilitando o acompanhamento dos materiais e as
            decisões do dia a dia.
          </p>

          <div className="pt-2">
            <h3 className="mb-4 text-lg font-bold text-violet-950">
              O que a Fluxora oferece:
            </h3>

            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {competencies.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-violet-900"
                >
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-violet-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">

            <Button
              
              className="rounded-xl bg-violet-600 px-6 text-white hover:bg-violet-700"
            >
              <a href="/demo">
                Ver demonstração
              </a>
            </Button>

            <Button
              variant="outline"
              
              className="rounded-xl border-violet-300 bg-white px-6 text-violet-700 hover:bg-violet-100 hover:text-violet-800"
            >
              <a href="" >
                Conhecer funcionalidades
              </a>
            </Button>

          </div>

        </div>
      </div>
    </section>
  );
}
