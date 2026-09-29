import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'

const Blog = ({ blogCards = [] }) => {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-violet-300 border border-t-violet-700 border-b-violet-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Cabeçalho */}
        <div className="mb-12 space-y-4 text-center sm:mb-16">
          <p className="mx-auto text-sm font-semibold uppercase tracking-wider text-violet-900 py-2 px-4 bg-purple-200 w-fit rounded-full border border-violet-900">
            Funcionalidades
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-violet-900 md:text-4xl lg:text-5xl">
            Tudo o que você precisa para controlar seu estoque
          </h2>

          <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-700 sm:text-lg">
            Conheça os principais recursos da Fluxora e descubra como
            organizar materiais, acompanhar o estoque e tomar decisões
            com mais facilidade.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogCards.map((item, index) => (
            <Card
              key={index}
              className="group overflow-hidden border border-violet-600 bg-white pt-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-700 hover:shadow-lg"
            >
              {/* Imagem */}
              <CardContent className="px-0">
                <img
                  src={item.img}
                  alt={item.alt}
                  className="aspect-video h-60 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </CardContent>

              {/* Conteúdo */}
              <CardHeader className="flex h-full flex-col justify-between gap-6 p-6">
                <div className="space-y-3">
                  <CardTitle className="text-xl font-semibold text-violet-700">
                    {item.title}
                  </CardTitle>

                  <CardDescription className="text-base leading-relaxed text-gray-700">
                    {item.description}
                  </CardDescription>
                </div>

                {/* Botão */}
                <div>
                  <Button
                    size="lg"
                    className="group/button inline-flex items-center gap-2 bg-violet-500 text-white transition-all duration-300 hover:bg-violet-600"
                    render={
                      <a href={item.blogLink}>
                        <span>Ver Demonstração</span>

                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                      </a>
                    }
                    nativeButton={false}
                  >
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Blog
