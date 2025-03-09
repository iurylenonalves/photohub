import Image from "next/image";
import { MessageCircle } from "lucide-react";

const About = () => {
  return (
    <section className="py-16 px-6 bg-gray-50 scroll-mt-16" id="about">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        <h2 className="text-4xl font-bold text-gray-900">Bruna Alves</h2>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
          <div className="w-full md:w-1/2">
            <Image
              src="/images/about-image-large.webp"
              alt="Fotógrafa"
              className="rounded-lg shadow-lg object-cover w-full h-96"
              width={600}
              height={400}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
              priority
            />
          </div>
          <div className="w-full md:w-1/2 text-left">
            <p className="text-lg text-gray-700 leading-relaxed text-justify">
              Oi! Eu sou a Bruna, mas você também pode me chamar de Bru (coisa de paulistana, né?!).
              Londres sempre foi o meu sonho de adolescente, e em 2018 tive a felicidade de realizá-lo. 
              Me mudei para cá com meu marido e minha filha, e foi aqui que nossa família cresceu ainda mais, 
              com a chegada de mais dois filhos.
            </p>
            <p className="text-lg text-gray-700 mt-4 leading-relaxed text-justify">
              Desde então, estive em busca de novas experiências, e foi nessa cidade incrível que encontrei o 
              cenário perfeito para transformar minha paixão em profissão. A fotografia sempre foi meu grande amor, 
              e meu maior desejo é eternizar momentos especiais —assim como minha mãe sempre fez — porque acredito que 
              todos merecem guardar lembranças inesquecíveis!
            </p>
            <div className="mt-8 text-center">
                <a
                  href={`https://wa.me/447542554870?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20seus%20serviços`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-white bg-green-600 text-lg font-semibold rounded-md shadow-md hover:bg-green-700 transition"
                  //className="bg-green-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-green-600 transition"
                >
                  <MessageCircle size={20} />
                  Fale comigo no WhatsApp
                </a>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;