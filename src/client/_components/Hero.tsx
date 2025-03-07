import Link from 'next/link';
import styles from '../../styles/hero.module.css';

const Hero = () => {
  return (
    <section
      className={`${styles['hero-bg']} relative w-screen h-screen bg-cover bg-center bg-no-repeat `}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-6">
      <div className="space-y-4" data-aos="fade-up">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight sm:leading-snug md:leading-normal lg:leading-relaxed">
        Registros que contam sua história
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
        Fotografia para viagens, negócios e momentos inesquecíveis.
        </p>
        <Link 
          href={`https://wa.me/447542554870?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20seus%20serviços`} 
          className="inline-block mt-6 px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark opacity-60 transition"
          target='_blank'
          rel='noopener noreferrer'
        >
        Entre em contato
        </Link>
      </div>
      </div>
    </section>
  );
};

export default Hero;