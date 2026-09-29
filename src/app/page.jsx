"use client";

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

import { GoArrowRight } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { Dot, OctagonAlert, ArrowLeftRight, ChartNoAxesCombined, Package } from 'lucide-react';

import { useState } from "react";
import Blog from "@/components/ui/blocks/blog-component-0";
import ImageCarouselHero from "@/components/ui/blocks/image-carousel-hero";
import HeroFormImageAndForm from "@/components/ui/blocks/image-and-form";
import AboutSectionTwoColumn from "@/components/ui/blocks/two-column";



const blogCards = [
  {
    img: '/funcionalidades1.png',
    alt: 'Organização dos materiais no estoque',
    title: 'Organização dos materiais',
    description:
      'Centralize os materiais da sua indústria em um só lugar. Consulte códigos, categorias, quantidades e estoques mínimos de forma simples e organizada.',
    blogLink: '/demo',
  },
  {
    img: '/funcionalidades2.png',
    alt: 'Monitoramento de faltas no estoque',
    title: 'Monitoramento de faltas',
    description:
      'Identifique materiais abaixo do estoque mínimo e acompanhe situações que precisam de atenção para evitar problemas no abastecimento.',
    blogLink: '/demo',
  },
  {
    img: '/funcionalidades3.png',
    alt: 'Indicadores e informações do estoque',
    title: 'Indicadores do estoque',
    description:
      'Visualize informações importantes por meio de indicadores e gráficos que ajudam a entender a situação dos materiais de forma rápida.',
    blogLink: '/demo',
  },
]





export default function Home() {

  const [abaAtual, setAbaAtual] = useState(0);

  return (<>
    <Header />

    <ImageCarouselHero/>

    <div className="mx-auto w-full max-w-[1050px] text-center mb-16 mt-25">

      <div className="flex items-center justify-center gap-4 mb-5">
        <div className="h-0.5 w-12 bg-violet-400 rounded-full"></div>
        <span className="text-sm font-semibold uppercase tracking-[6px] text-violet-600">Controle inteligente</span>
        <div className="h-0.5 w-12 bg-violet-400 rounded-full"></div>
      </div>

      <div className="mx-auto text-center">
        <h1 className="text-5xl font-bold text-violet-900">Mais clareza para o estoque</h1>
        <h1 className="text-5xl font-bold text-violet-500">Mais eficiência para a indústria</h1>
      </div>

      <p className="mt-7 mx-auto max-w-[820px] text-[19px] leading-8 text-gray-600">A Fluxora reúne materiais, movimentações e indicadores em um só lugar, tornando as informações do estoque mais claras e a rotina da sua indústria mais organizada.</p>

    </div>

    <div className="flex mx-auto w-full max-w-[1800px] px-15 justify-between mb-20">
      <div className="bg-violet-200 w-[900px] p-10 border border-violet-400 border-r-violet-900 rounded-l-2xl">
        <div className="w-fit mx-auto">
          <ul className="flex bg-violet-300 p-4 py-2 gap-8 rounded-2xl border border-violet-900 text-purple-900 font-semibold mb-8">
            <li onClick={() => setAbaAtual(0)} className="transition-transform duration-300 cursor-pointer hover:text-purple-950 hover:-translate-y-0.5">Organização</li>
            <li onClick={() => setAbaAtual(1)} className="transition-transform duration-300 cursor-pointer hover:text-purple-950 hover:-translate-y-0.5">Faltas</li>
            <li onClick={() => setAbaAtual(2)} className="transition-transform duration-300 cursor-pointer hover:text-purple-950 hover:-translate-y-0.5">Indicadores</li>
            <li onClick={() => setAbaAtual(3)} className="transition-transform duration-300 cursor-pointer hover:text-purple-950 hover:-translate-y-0.5">Movimentações</li>
          </ul>
        </div>

        {abaAtual === 0 && (
          <div className="relative flex min-h-[360px] justify-between">

            <div className="max-w-2xl">
              
              <span className="flex items-center gap-2 mb-3 block text-sm font-semibold uppercase tracking-[2px] text-violet-500"><Package /> Organização do estoque</span>

              <h1 className="mb-5 text-4xl font-semibold leading-tight text-violet-900">Organização dos materiais</h1>

              <p className="mb-6 max-w-[650px] text-lg leading-8 text-gray-600 text-justify indent-8">Centralize todos os materiais da sua indústria em um único lugar. Tenha acesso às informações de cada item de forma organizada, acompanhe seus dados com facilidade e encontre rapidamente o que precisa para manter o controle do estoque no dia a dia.</p>

              <ul className="mb-7 space-y-2 text-gray-700">
                <li className="flex items-center"><Dot className="mr-1 text-violet-500" /> Materiais organizados</li>
                <li className="flex items-center"><Dot className="mr-1 text-violet-500" /> Informações centralizadas</li>
                <li className="flex items-center"><Dot className="mr-1 text-violet-500" /> Consulta rápida</li>
              </ul>

              <Button className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-5 text-md font-semibold shadow-md shadow-violet-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-700 cursor-pointer">
                Saiba Mais <GoArrowRight className="text-lg" />
              </Button>

            </div>

            <div className="absolute bottom-0 right-0">
              <span className="select-none text-8xl font-bold leading-none text-violet-400">01</span>
            </div>

          </div>
        )}

        {abaAtual === 1 && (

          <div className="relative flex min-h-[360px] justify-between">

            <div className="max-w-2xl">

              <span className="flex items-center gap-2 mb-3 block text-sm font-semibold uppercase tracking-[2px] text-violet-500"><OctagonAlert /> Monitoramento do estoque</span>

              <h1 className="mb-5 text-4xl font-semibold leading-tight text-violet-900">Identifique as faltas rapidamente</h1>

              <p className="mb-6 max-w-[650px] text-lg leading-8 text-gray-600 text-justify indent-8">Acompanhe os materiais que estão abaixo do estoque mínimo e identifique rapidamente quais itens precisam de reposição. Assim, você consegue visualizar possíveis faltas com antecedência e evitar que a falta de materiais atrapalhe o andamento da produção.</p>

              <ul className="mb-7 space-y-2 text-gray-700">
                <li className="flex items-center"><Dot className="mr-1 text-violet-500" /> Estoque mínimo</li>
                <li className="flex items-center"><Dot className="mr-1 text-violet-500" /> Alertas de reposição</li>
                <li className="flex items-center"><Dot className="mr-1 text-violet-500" /> Prevenção de faltas</li>
              </ul>

              <Button className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-5 text-md font-semibold shadow-md shadow-violet-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-700 cursor-pointer">
                Saiba Mais <GoArrowRight className="text-lg" />
              </Button>

            </div>

            <div className="absolute bottom-0 right-0">
              <span className="select-none text-8xl font-bold leading-none text-violet-400">02</span>
            </div>

          </div>

        )}

        {abaAtual === 2 && (
          <div className="relative flex min-h-[360px] justify-between">

            <div className="max-w-2xl">

              <span className="flex items-center gap-2 mb-3 block text-sm font-semibold uppercase tracking-[2px] text-violet-500"><ChartNoAxesCombined /> Visão do estoque</span>

              <h1 className="mb-5 text-4xl font-semibold leading-tight text-violet-900">Indicadores mais claros</h1>

              <p className="mb-6 max-w-[650px] text-lg leading-8 text-gray-600 text-justify indent-8">Visualize informações importantes sobre o estoque por meio de indicadores simples e objetivos. Acompanhe a situação dos materiais, entenda melhor os dados disponíveis e tenha uma visão mais clara para auxiliar na análise e na tomada de decisões.</p>

              <ul className="mb-7 space-y-2 text-gray-700">
                <li className="flex items-center"><Dot className="mr-1 text-violet-500" /> Dados do estoque</li>
                <li className="flex items-center"><Dot className="mr-1 text-violet-500" /> Visão geral</li>
                <li className="flex items-center"><Dot className="mr-1 text-violet-500" /> Apoio à decisão</li>
              </ul>

              <Button className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-5 text-md font-semibold shadow-md shadow-violet-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-700 cursor-pointer">
                Saiba Mais <GoArrowRight className="text-lg" />
              </Button>

            </div>

            <div className="absolute bottom-0 right-0">
              <span className="select-none text-8xl font-bold leading-none text-violet-400">03</span>
            </div>

          </div>
        )}

        {abaAtual === 3 && (
          <div className="relative flex min-h-[360px] justify-between">

            <div className="max-w-2xl">

              <span className="flex items-center gap-2 mb-3 block text-sm font-semibold uppercase tracking-[2px] text-violet-500"><ArrowLeftRight /> Movimentação do estoque</span>

              <h1 className="mb-5 text-4xl font-semibold leading-tight text-violet-900">Controle das movimentações</h1>

              <p className="mb-6 max-w-[650px] text-lg leading-8 text-gray-600 text-justify indent-8">Registre entradas e saídas de materiais e acompanhe todas as movimentações do estoque de forma organizada. Tenha mais clareza sobre o que foi movimentado, acompanhe as alterações realizadas e mantenha as informações sempre atualizadas.</p>

              <ul className="mb-7 space-y-2 text-gray-700">
                <li className="flex items-center"><Dot className="mr-1 text-violet-500" /> Entradas e saídas</li>
                <li className="flex items-center"><Dot className="mr-1 text-violet-500" /> Histórico atualizado</li>
                <li className="flex items-center"><Dot className="mr-1 text-violet-500" /> Controle dos registros</li>
              </ul>

              <Button className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-5 text-md font-semibold shadow-md shadow-violet-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-700 cursor-pointer">
                Saiba Mais <GoArrowRight className="text-lg" />
              </Button>

            </div>

            <div className="absolute bottom-0 right-0">
              <span className="select-none text-8xl font-bold leading-none text-violet-400">04</span>
            </div>

          </div>
        )}

      </div>

      <div className="bg-violet-200 w-[900px] h-[570px] flex items-center justify-center border border-violet-400 rounded-r-2xl overflow-hidden">

        {abaAtual === 0 && (
          <img src="/beneficios1.png" alt="Dashboard Fluxora" className="w-full h-full object-cover"/>
        )}

        {abaAtual === 1 && (
          <img src="/beneficios2.png" alt="Estoque Fluxora" className="w-full h-full object-cover"/>
        )}

        {abaAtual === 2 && (
          <img src="/beneficios3.png" alt="Indicadores Fluxora" className="w-full h-full object-cover"/>
        )}

        {abaAtual === 3 && (
          <img src="/beneficios4.png" alt="Materiais Fluxora" className="w-full h-full object-cover"/>
        )}

      </div>

    </div>

    <Blog blogCards={blogCards}/>

    <AboutSectionTwoColumn/>

    <HeroFormImageAndForm/>

    <Footer/>

  </>);
}