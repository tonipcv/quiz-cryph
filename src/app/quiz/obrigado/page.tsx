import Image from 'next/image';

const Logo = () => (
  <div className="flex justify-center mb-8">
    <Image
      src="/logo.png"
      alt="Logo"
      width={100}
      height={100}
      className="rounded-lg filter brightness-0"
    />
  </div>
);

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-helvetica">
      <div className="max-w-md mx-auto text-center">
        <Logo />
        <h2 className="text-3xl font-light text-gray-900 mb-8">
          Obrigado por completar o quiz!
        </h2>
        <p className="text-xl text-gray-500 mb-8 font-light">
          Em breve você receberá no seu e-mail uma análise personalizada com base nas suas respostas.
        </p>
        <p className="text-gray-400 font-light">
          Enquanto isso, que tal conhecer mais sobre nossos serviços?
        </p>
        <div className="mt-8">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base 
                     font-light rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700"
          >
            Voltar para a página inicial
          </a>
        </div>
      </div>
    </div>
  );
} 