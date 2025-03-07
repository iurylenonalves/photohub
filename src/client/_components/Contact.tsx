import Image from 'next/image';
import { MessageCircle } from 'lucide-react';

const Contact = () => {
  return (
      <section className="py-16 px-6 bg-gray-50 scrool-mt-16" id="contact">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold text-gray-900">Contato</h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
            <div className="w-full md:w-1/2">
              <Image
                src="/images/contact-image-large.webp"
                alt="Fotógrafa"
                className="rounded-lg shadow-lg object-contain w-full"
                width={600}
                height={400}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                priority
              />
            </div>
            <div className="w-full md:w-1/2 text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Entre em Contato
              </h2>              
              <p className="text-lg text-gray-700 mb-8">
                Quer transformar seus momentos em registros inesquecíveis? Seja para sua viagem, sua marca ou um retrato especial, estou aqui para capturar sua essência em cada clique.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                📩 Me mande uma mensagem e vamos conversar sobre o ensaio perfeito para você!
              </p>
              <p className="text-lg text-gray-700 mb-8">
                📸 Vamos eternizar seus momentos juntos?
              </p>
              <div className="mt-8 text-center">
                <a
                  href={`https://wa.me/447542554870?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20seus%20serviços`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-white bg-green-600 text-lg font-semibold rounded-md shadow-md hover:bg-green-700 transition"
                >
                  <MessageCircle size={20} />
                  Fale conosco no WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default Contact;