"use client";

import materiaisIniciais from "./materiais.json";

import { useMemo, useState } from "react";

import { Search, Package, PackageCheck, PackageX, AlertTriangle, Plus, ArrowDownToLine, ArrowUpFromLine, RotateCcw, Database, Boxes, Dot, ChartNoAxesCombined, ChartColumnStacked } from "lucide-react";

import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


function getSituacao(material) {
  if (material.quantidade === 0) {
    return "Sem estoque";
  }

  if (material.quantidade < material.minimo) {
    return "Estoque baixo";
  }

  return "Normal";
}

function getSituacaoClasses(situacao) {
  if (situacao === "Normal") {
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  }

  if (situacao === "Estoque baixo") {
    return "bg-amber-100 text-amber-700 border-amber-200";
  }

  return "bg-red-100 text-red-700 border-red-200";
}



export default function Demonstracao() {
  const [materiais, setMateriais] = useState(materiaisIniciais);

  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todas as categorias");
  const [situacao, setSituacao] = useState("Todas as situações");

  const [dialogAberto, setDialogAberto] = useState(false);

  const [novoMaterial, setNovoMaterial] = useState({
    nome: "",
    categoria: "",
    unidade: "",
    quantidade: "",
    minimo: "",
  });

  const [movimentacao, setMovimentacao] = useState(null);

  const [quantidadeMovimentacao, setQuantidadeMovimentacao] =
    useState("");

  const [mensagem, setMensagem] = useState("");

  const categorias = [
    "Metais",
    "Plásticos",
    "Polímeros",
    "Químicos",
  ];

  const materiaisFiltrados = useMemo(() => {
    return materiais.filter((material) => {
      const textoBusca = busca.toLowerCase();

      const correspondeBusca =
        material.nome.toLowerCase().includes(textoBusca) ||
        material.codigo.toLowerCase().includes(textoBusca);

      const correspondeCategoria =
        categoria === "Todas as categorias" || material.categoria === categoria;

      const correspondeSituacao =
        situacao === "Todas as situações" ||
        getSituacao(material) === situacao;

      return (
        correspondeBusca &&
        correspondeCategoria &&
        correspondeSituacao
      );
    });
  }, [materiais, busca, categoria, situacao]);

  const totalMateriais = materiais.length;

  const materiaisNormais = materiais.filter(
    (material) => getSituacao(material) === "Normal"
  ).length;

  const materiaisBaixos = materiais.filter(
    (material) => getSituacao(material) === "Estoque baixo"
  ).length;

  const materiaisSemEstoque = materiais.filter(
    (material) => getSituacao(material) === "Sem estoque"
  ).length;

  const dadosCategorias = categorias.map((categoriaAtual) => ({
    categoria: categoriaAtual,
    quantidade: materiais.filter(
      (material) => material.categoria === categoriaAtual
    ).length,
  }));

  const dadosSituacao = [
    {
        nome: "Normal",
        quantidade: materiaisNormais,
        fill: "#8b5cf6",
    },
    {
        nome: "Baixo",
        quantidade: materiaisBaixos,
        fill: "#facc15",
    },
    {
        nome: "Sem estoque",
        quantidade: materiaisSemEstoque,
        fill: "#f87171",
    },
];
  function limparFiltros() {
    setBusca("");
    setCategoria("Todas as categorias");
    setSituacao("Todas as situações");
  }

  function cadastrarMaterial() {
    if (
      !novoMaterial.nome ||
      !novoMaterial.categoria ||
      !novoMaterial.unidade ||
      novoMaterial.quantidade === "" ||
      novoMaterial.minimo === ""
    ) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    const quantidade = Number(novoMaterial.quantidade);
    const minimo = Number(novoMaterial.minimo);

    if (quantidade < 0 || minimo < 0) {
      setMensagem("Os valores não podem ser negativos.");
      return;
    }

    const proximoNumero =
      materiais.length + 1;

    const novo = {
      id: Date.now(),
      codigo: `MP-${String(proximoNumero).padStart(3, "0")}`,
      nome: novoMaterial.nome,
      categoria: novoMaterial.categoria,
      unidade: novoMaterial.unidade,
      quantidade,
      minimo,
    };

    setMateriais((atual) => [...atual, novo]);

    setNovoMaterial({
      nome: "",
      categoria: "",
      unidade: "",
      quantidade: "",
      minimo: "",
    });

    setMensagem("");
    setDialogAberto(false);
  }

  function abrirMovimentacao(material, tipo) {
    setMovimentacao({
      material,
      tipo,
    });

    setQuantidadeMovimentacao("");
    setMensagem("");
  }

  function realizarMovimentacao() {
    if (!movimentacao) {
      return;
    }

    const quantidade = Number(quantidadeMovimentacao);

    if (!quantidade || quantidade <= 0) {
      setMensagem("Informe uma quantidade maior que zero.");
      return;
    }

    if (
      movimentacao.tipo === "saida" &&
      quantidade > movimentacao.material.quantidade
    ) {
      setMensagem(
        "A saída não pode ser maior que o saldo disponível."
      );
      return;
    }

    setMateriais((atual) =>
      atual.map((material) => {
        if (material.id !== movimentacao.material.id) {
          return material;
        }

        const novaQuantidade =
          movimentacao.tipo === "entrada"
            ? material.quantidade + quantidade
            : material.quantidade - quantidade;

        return {
          ...material,
          quantidade: novaQuantidade,
        };
      })
    );

    setMovimentacao(null);
    setQuantidadeMovimentacao("");
    setMensagem("");
  }

  

    return (<>
        <header className=" flex border-b border-violet-200 bg-white  items-center justify-between py-5 px-15">
    
            <img src="logo.png" alt="Logo Fluxora" className="w-auto h-15"/>

            <div className="items-center gap-2 rounded-full border border-violet-400 bg-violet-200 px-4 py-2 text-sm font-medium text-violet-700 sm:flex">
                <Database className="h-4 w-4" />Ambiente de demonstração
            </div>

        </header>

        <div className="mx-auto w-[1500px] px-10 py-8">

            <div className="mb-8">

                <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="rounded-full border border-violet-400 bg-violet-200 px-3 py-1 text-xs font-semibold text-violet-700">DEMONSTRAÇÃO</span>

                    <div className="flex items-center gap-3 text-sm font-semibold text-violet-700">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-700 bg-violet-200"><AlertTriangle className="h-6 w-6 text-violet-700"/></div>
                        <span className="text-[15px] underline underline-offset-2">Os dados presentes nessa página são fictícios!</span>
                    </div>
                </div>

                <div className="mt-18 flex items-center justify-center">
                    <div className="flex w-30 h-[2px] bg-violet-400 rounded-full"></div>
                    <Dot className="w-9 h-9 text-violet-500"/>
                    <h2 className="text-4xl font-bold tracking-tight text-violet-800"> Estoque sob controle</h2>
                    <Dot className="w-9 h-9 text-violet-500"/>
                    <div className="flex w-30 h-[2px] bg-violet-400 rounded-full"></div>
                </div>

                <p className="mt-2 w-[700px] text-gray-600 mx-auto text-center">Acompanhe suas matérias-primas, identifique faltas e visualize os principais indicadores do estoque.</p>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                <Card className="group bg-violet-100 border border-violet-400 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-700">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total de materiais</p>
                            <span className="mt-2 block text-4xl font-bold text-violet-800">{totalMateriais}</span>
                        </div>

                        <div className="rounded-xl border-violet-400 bg-violet-200 p-3 transition-colors border group-hover:border-violet-700">
                            <Package className="h-6 w-6 text-violet-700" />
                        </div>
                    </div>

                    <p className="text-sm text-violet-700">Materiais cadastrados</p>
                </Card>

                <Card className="group bg-green-100 border border-green-500 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-green-700">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Estoque normal</p>
                            <span className="mt-2 block text-4xl font-bold text-green-800">{materiaisNormais}</span>
                        </div>

                        <div className="rounded-xl border-green-500 bg-green-200 p-3 transition-colors border group-hover:border-green-700">
                            <PackageCheck className="h-6 w-6 text-green-700" />
                        </div>
                    </div>

                    <p className="text-sm text-green-700">Quantidade dentro do mínimo</p>
                </Card>

                <Card className="group bg-[#FFF9DB] border border-yellow-400 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-600">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Estoque baixo</p>
                            <span className="mt-2 block text-4xl font-bold text-yellow-600">{materiaisBaixos}</span>
                        </div>

                        <div className="rounded-xl border-yellow-400 bg-yellow-100 p-3 transition-colors border group-hover:border-yellow-600">
                            <AlertTriangle className="h-6 w-6 text-yellow-600" />
                        </div>
                    </div>

                    <p className="text-sm text-yellow-600">Reposição recomendada</p>
                </Card>

                <Card className="group bg-red-100 border border-red-500 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-700">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Sem estoque</p>
                            <span className="mt-2 block text-4xl font-bold text-red-800">{materiaisSemEstoque}</span>
                        </div>

                        <div className="rounded-xl border-red-400 bg-red-200 p-3 transition-colors border group-hover:border-red-700">
                            <PackageX className="h-6 w-6 text-red-700" />
                        </div>
                    </div>

                    <p className="text-sm text-red-700">Necessita reposição</p>
                </Card>

            </div>

            <div className="mb-8 grid gap-6 lg:grid-cols-3">
                <Card className="overflow-hidden border border-violet-300 col-span-2">
                    <CardHeader >
                        <div className="flex items-start justify-between">
                            <div>
                                <CardTitle className="text-2xl font-bold text-violet-800">Materiais por categoria</CardTitle>
                                <p className="mt-1 text-xs text-gray-600">Distribuição dos materiais cadastrados.</p>
                            </div>

                            <div className="rounded-xl bg-violet-200 p-3 border border-violet-700">
                                <ChartColumnStacked className="h-6 w-6 text-violet-700" />
                            </div>
                        </div>

                        <div className="mt-5 border-b border-violet-300 h-2 rounded-full "></div>
                    </CardHeader>

                    <CardContent className="pt-6">
                        <div className="h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={dadosCategorias} barCategoryGap="30%">
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ede9fe"/>
                                    <XAxis dataKey="categoria" axisLine={false} tickLine={false} tick={{ fontSize: 15, fill: "#64748b" }}/>
                                    <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 15, fill: "#64748b" }}/>
                                    <Tooltip cursor={{ fill: "#f5f3ff" }}/>
                                    <Bar dataKey="quantidade" radius={[8, 8, 0, 0]} fill="#6030b3"/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="overflow-hidden border border-violet-300">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div>
                                <CardTitle className="text-2xl font-bold text-violet-800">Situação do estoque</CardTitle>
                                <p className="mt-1 text-xs text-gray-600">Visão geral dos materiais.</p>
                            </div>

                            <div className="rounded-xl bg-violet-200 p-3 border border-violet-700">
                                <ChartNoAxesCombined className="h-6 w-6 text-violet-700" />
                            </div>
                        </div>

                        <div className="mt-5 border-b border-violet-300 h-2 rounded-full "></div>
                    </CardHeader>

                    <CardContent className="pt-6">
                        <div className="h-[170px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                    data={dadosSituacao}
                                    dataKey="quantidade"
                                    nameKey="nome"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={85}
                                    innerRadius={58}
                                    paddingAngle={4}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="space-y-3 pt-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="h-2.5 w-2.5 rounded-full bg-violet-400" />
                                    <span className="text-sm text-slate-600">Normal</span>
                                </div>

                                <span className="font-semibold text-violet-950">{materiaisNormais}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                                    <span className="text-sm text-slate-600">Estoque baixo</span>
                                </div>

                                <span className="font-semibold text-violet-950">{materiaisBaixos}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="h-2.5 w-2.5 rounded-full bg-violet-700" />
                                    <span className="text-sm text-slate-600">Sem estoque</span>
                                </div>

                                <span className="font-semibold text-violet-950">{materiaisSemEstoque}</span>
                            </div>
                        </div>

                    </CardContent>
                </Card>
            </div>

            <Card className="border border-violet-300 py-11 px-4">
                <CardHeader>
                    <div className="flex justify-between gap-5 flex-row items-center">
                        <div>
                            <CardTitle className="flex items-center gap-2 text-4xl font-bold text-violet-800">
                                <Boxes className="h-7 w-7 text-violet-600"/> Matérias-primas
                            </CardTitle>

                            <p className="mt-2 text-md text-gray-600">Consulte e gerencie os materiais do estoque.</p>
                        </div>

                        <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
                            <DialogTrigger render={<Button className="bg-violet-700 hover:bg-violet-900 cursor-pointer">
                                    <Plus className="h-4 w-4"/>Cadastrar material
                                </Button>}>
                                
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle className={"text-2xl font-semibold text-violet-800"}>Cadastrar material</DialogTitle>
                                    <DialogDescription className={"text-gray-600"}>Adicione uma nova matéria-prima ao estoque.</DialogDescription>
                                </DialogHeader>

                                <div className="grid gap-5 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="nome" className={"text-violet-800"}>Nome do material</Label>
                                        <Input id="nome" placeholder="Ex.: Chapa de aço" value={novoMaterial.nome} onChange={(e) => setNovoMaterial({...novoMaterial, nome: e.target.value})} className={"border border-violet-400"}/>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label className={"text-violet-800"}>Categoria</Label>

                                        <Select value={novoMaterial.categoria} onValueChange={(value) => setNovoMaterial({...novoMaterial, categoria: value})}>
                                            <SelectTrigger className={"border border-violet-400 p-2 w-full"}>
                                                <SelectValue placeholder="Selecione uma categoria"/>
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem disabled>Selecione uma categoria</SelectItem>
                                                {categorias.map((item) => (
                                                    <SelectItem key={item} value={item}>
                                                        {item}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label className={"text-violet-800"}>Unidade</Label>

                                        <Select value={novoMaterial.unidade} onValueChange={(value) => setNovoMaterial({...novoMaterial, unidade: value})}>
                                            <SelectTrigger className={"border border-violet-400 p-2 w-full"}>
                                                <SelectValue placeholder="Selecione a unidade" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem disabled>Selecione a unidade</SelectItem>
                                                <SelectItem value="kg">Kilogramas (kg)</SelectItem>
                                                <SelectItem value="L">Litros (L)</SelectItem>
                                                <SelectItem value="un">Unidade (1, 2, 3...)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label className={"text-violet-800"} htmlFor="quantidade">Quantidade</Label>
                                            <Input id="quantidade" type="number" min="0" value={novoMaterial.quantidade} onChange={(e) => setNovoMaterial({...novoMaterial, quantidade: e.target.value})} className={"border border-violet-400 w-full"} placeholder="1, 2, 3..."/>
                                        </div>

                                        <div className="grid gap-2">
                                            <Label className={"text-violet-800"} htmlFor="minimo">Estoque mínimo</Label>
                                            <Input id="minimo" type="number" min="0" value={novoMaterial.minimo} onChange={(e) => setNovoMaterial({...novoMaterial, minimo: e.target.value})}  className={"border border-violet-400 w-full"} placeholder="Ex: min. 150"/>
                                        </div>
                                    </div>

                                    {mensagem && (
                                        <p className="text-sm font-medium text-red-700">{mensagem}</p>
                                    )}
                                </div>

                                <DialogFooter>
                                    <Button onClick={cadastrarMaterial} className="bg-violet-700 hover:bg-violet-800">Cadastrar Produto</Button>
                                </DialogFooter>

                            </DialogContent>

                        </Dialog>

                    </div>


                    <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_auto]">
                        <div className="relative border border-gray-500 rounded-md">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"/>
                            <Input placeholder="Buscar por nome ou código..." value={busca} onChange={(e) => setBusca(e.target.value)} className="pl-9 placeholder:text-gray-500"/>
                        </div>

                        <Select value={categoria} onValueChange={setCategoria}>
                            <SelectTrigger className={"border border-gray-500 w-full"}>
                                <SelectValue placeholder="Categoria" className={"placeholer:text-gray-500"} />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="Todas as categorias" disabled>Todas as categorias</SelectItem>

                                {categorias.map((item) => (
                                    <SelectItem key={item} value={item}>
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={situacao} onValueChange={setSituacao}>
                            <SelectTrigger className={"border border-gray-500 w-full"}>
                                <SelectValue placeholder="Situação" className={"placeholer:text-gray-500"} />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="Todas as situações" disabled>Todas as situações</SelectItem>
                                <SelectItem value="Normal">Normal</SelectItem>
                                <SelectItem value="Estoque baixo">Estoque baixo</SelectItem>
                                <SelectItem value="Sem estoque">Sem estoque</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button variant="outline" onClick={limparFiltros} className="border-violet-700 text-violet-700 border w-full hover:text-violet-700 hover:bg-violet-200">
                        <RotateCcw className="mr-2 h-4 w-4" />Limpar</Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <table className="w-full border border-violet-600 rounded-2xl overflow-hidden border-separate border-spacing-0">
                        <thead>
                            <tr className="">
                                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-violet-700 bg-violet-200 rounded-tl-2xl border border-b-violet-700 border-transparent">Código</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-violet-700 bg-violet-200 border border-b-violet-700 border-transparent">Material</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-violet-700 bg-violet-200 border border-b-violet-700 border-transparent">Categoria</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-violet-700 bg-violet-200 border border-b-violet-700 border-transparent">Unidade</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-violet-700 bg-violet-200 border border-b-violet-700 border-transparent">Quantidade</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-violet-700 bg-violet-200 border border-b-violet-700 border-transparent">Mínimo</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-violet-700 bg-violet-200 border border-b-violet-700 border-transparent">Situação</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wide text-violet-700 bg-violet-200 rounded-tr-2xl border border-b-violet-700 border-transparent">Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {materiaisFiltrados.map((material) => {
                                const status = getSituacao(material);
                                
                                return (
                                    <tr key={material.id} className="border-b border-gray-300 last:border-b-0">
                                        <td className="px-6 py-5 text-sm font-semibold text-violet-700">{material.codigo}</td>
                                        <td className="px-6 "><p className="font-medium text-violet-900">{material.nome}</p></td>
                                        <td className="px-6 text-sm text-gray-600">{material.categoria}</td>
                                        <td className="px-6 text-sm text-gray-600">{material.unidade}</td>
                                        <td className="px-6 text-sm font-semibold text-gray-800">{material.quantidade}</td>
                                        <td className="px-6 text-sm text-gray-600">{material.minimo}</td>
                                        <td className="px-6 ">
                                            <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getSituacaoClasses(status)}`}>{status}</span>
                                        </td>
                                        <td className="pr-6 ">
                                            <div className="flex justify-end gap-2">
                                                <Button size="sm" variant="outline" onClick={() => abrirMovimentacao(material,"entrada")} className="border-green-600 text-green-600 hover:bg-green-200 hover:text-green-800">
                                                    <ArrowDownToLine className="h-4 w-4" />Entrada
                                                </Button>

                                                <Button size="sm" variant="outline" onClick={() => abrirMovimentacao(material,"saida")} className="border-red-600 text-red-600 hover:bg-red-200 hover:text-red-800">
                                                    <ArrowDownToLine className="h-4 w-4" />Saída
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {materiaisFiltrados.length === 0 && (
                        <div className="flex flex-col items-center justify-center px-6 py-8 text-center">
                            <div className="mb-4 rounded-2xl bg-violet-200 p-4 text-violet-700 border border-violet-500">
                                <PackageX className="h-8 w-8" />
                            </div>

                            <h3 className="text-lg font-semibold text-violet-800">Nenhum material encontrado</h3>
                            <p className="mt-1 max-w-[400px] text-sm text-slate-500">Não encontramos materiais com os filtros selecionados. Tente alterar sua busca.</p>
                        </div>
                    )}

                </CardContent>
            </Card>
        </div>


    {/* DIALOG DE MOVIMENTAÇÃO */}

    <Dialog
    open={!!movimentacao}
    onOpenChange={(aberto) => {
        if (!aberto) {
        setMovimentacao(null);
        setMensagem("");
        }
    }}
    >

    <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
            <DialogTitle className={"text-2xl text-violet-800"}>
                {movimentacao?.tipo === "entrada" ? "Registrar entrada" : "Registrar saída"}
            </DialogTitle>

            <DialogDescription className={"text-gray-600 text-[15px]"}>
                {movimentacao?.material.nome}{" — "}Saldo atual:{" "}
                <strong>{movimentacao?.material.quantidade}{" "}{movimentacao?.material.unidade}</strong>
            </DialogDescription>
        </DialogHeader>


        <div className="grid gap-4 py-4">

        <div className="grid gap-2">

            <Label htmlFor="movimentacao">
            Quantidade
            </Label>

            <Input
            id="movimentacao"
            type="number"
            min="1"
            placeholder="Digite a quantidade"
            value={quantidadeMovimentacao}
            onChange={(e) =>
                setQuantidadeMovimentacao(
                e.target.value
                )
            }
            />

        </div>


        {mensagem && (

            <p className="text-sm font-medium text-red-600">
            {mensagem}
            </p>

        )}

        </div>


        <DialogFooter>

        <Button
            variant="outline"
            onClick={() => {
            setMovimentacao(null);
            setMensagem("");
            }}
        >
            Cancelar
        </Button>

        <Button
            onClick={realizarMovimentacao}
            className={
            movimentacao?.tipo === "entrada"
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-red-600 hover:bg-red-700"
            }
        >

            {movimentacao?.tipo === "entrada"
            ? "Registrar entrada"
            : "Registrar saída"}

        </Button>

        </DialogFooter>

    </DialogContent>

    </Dialog>


    {/* RODAPÉ */}

    <footer className="border-t border-violet-200 bg-white">

    <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-3 px-6 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-10">

        <div>

        <p className="font-bold text-violet-900">
            Fluxora
        </p>

        <p>
            Sistema de controle de matéria-prima.
        </p>

        </div>

        <p>
        Ambiente demonstrativo • Dados fictícios
        </p>

    </div>

    </footer>

  </>);
}
