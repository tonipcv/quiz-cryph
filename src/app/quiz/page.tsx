'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Shield, 
  LineChart, 
  AlertTriangle, 
  Eye,
  PieChart,
  TrendingUp,
  Lock,
  DollarSign,
  Target,
  Brain,
  Scale,
  ArrowRight,
  User,
  Mail,
  Phone,
  ChartBar
} from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Image from 'next/image';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    icon: JSX.Element;
  }[];
}

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

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Você já perdeu dinheiro por falta de segurança ao investir em criptomoedas?",
    options: [
      { 
        text: "Sim, e foi frustrante", 
        icon: <AlertTriangle className="w-6 h-6 text-teal-600" /> 
      },
      { 
        text: "Não, mas tenho medo que isso aconteça", 
        icon: <Shield className="w-6 h-6 text-teal-600" /> 
      },
      { 
        text: "Nunca pensei nisso", 
        icon: <Brain className="w-6 h-6 text-teal-600" /> 
      }
    ]
  },
  {
    id: 2,
    question: "Você acompanha o desempenho da sua carteira de investimentos regularmente?",
    options: [
      { 
        text: "Sim, estou sempre de olho", 
        icon: <Eye className="w-6 h-6 text-teal-600" /> 
      },
      { 
        text: "Tento, mas é complicado", 
        icon: <PieChart className="w-6 h-6 text-teal-600" /> 
      },
      { 
        text: "Não, confio no mercado", 
        icon: <Scale className="w-6 h-6 text-teal-600" /> 
      }
    ]
  },
  {
    id: 3,
    question: "Qual é sua maior preocupação ao investir em criptomoedas?",
    options: [
      { 
        text: "Perder dinheiro por falta de estratégia", 
        icon: <Target className="w-6 h-6 text-teal-600" /> 
      },
      { 
        text: "Hackers e falta de segurança", 
        icon: <Lock className="w-6 h-6 text-teal-600" /> 
      },
      { 
        text: "Não conseguir acompanhar o mercado em tempo real", 
        icon: <LineChart className="w-6 h-6 text-teal-600" /> 
      }
    ]
  },
  {
    id: 4,
    question: "Se você pudesse maximizar seus lucros com estratégias seguras, como isso impactaria sua vida?",
    options: [
      { 
        text: "Aumentaria minha renda mensal", 
        icon: <DollarSign className="w-6 h-6 text-teal-600" /> 
      },
      { 
        text: "Me ajudaria a alcançar minha independência financeira", 
        icon: <TrendingUp className="w-6 h-6 text-teal-600" /> 
      },
      { 
        text: "Não sei, mas gostaria de descobrir", 
        icon: <Target className="w-6 h-6 text-teal-600" /> 
      }
    ]
  }
];

export default function Quiz() {
  const router = useRouter();
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [currentGraph, setCurrentGraph] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [showExitPopup, setShowExitPopup] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) { // Se o mouse sair pelo topo da página
        setShowExitPopup(true);
      }
    };

    // Adiciona o evento apenas quando não estiver no showWelcome
    if (!showWelcome) {
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [showWelcome]); // Adiciona showWelcome como dependência

  const handleRedirectToOffer = () => {
    window.location.href = 'https://checkout.k17.com.br/pay/fip-promocional';
  };

  const handleStartQuiz = () => {
    setShowWelcome(false);
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion === 1) {
      setShowGraph(true);
      setCurrentGraph(0);
    } else if (currentQuestion === 2) {
      setShowGraph(true);
      setCurrentGraph(1);
    } else if (currentQuestion === 3) {
      setShowGraph(true);
      setCurrentGraph(2);
    } else if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowForm(true);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const quizData = {
      answers,
      userData: formData
    };
    console.log('Quiz completado:', quizData);
    router.push('/quiz/obrigado');
  };

  const handleContinueFromGraph = () => {
    setShowGraph(false);
    setCurrentQuestion(currentQuestion + 1);
  };

  const renderGraph = () => {
    const graphs = [
      {
        title: "Crescimento do Patrimônio",
        description: "Veja como o patrimônio de investidores cresce ao utilizarem ferramentas inteligentes.",
        data: {
          labels: ['0', '3', '6', '9', '12'],
          datasets: [
            {
              label: 'Com ferramentas inteligentes',
              data: [1000, 2000, 3500, 5000, 7000],
              borderColor: 'rgb(59, 130, 246)',
              tension: 0.1
            },
            {
              label: 'Sem ferramentas inteligentes',
              data: [1000, 1200, 1100, 1300, 1250],
              borderColor: 'rgb(156, 163, 175)',
              tension: 0.1
            }
          ]
        }
      },
      {
        title: "Redução de Riscos",
        description: "Descubra como nossa solução reduz drasticamente os riscos ao investir.",
        data: {
          labels: ['Carteira Tradicional', 'Carteira Inteligente'],
          datasets: [
            {
              label: 'Probabilidade de Perdas (%)',
              data: [70, 5],
              backgroundColor: ['rgb(239, 68, 68)', 'rgb(34, 197, 94)'],
              borderColor: ['rgb(239, 68, 68)', 'rgb(34, 197, 94)'],
            }
          ]
        }
      },
      {
        title: "Projeção de Lucros",
        description: "Veja o potencial de lucros com uma estratégia otimizada.",
        data: {
          labels: ['Mês 1', 'Mês 2', 'Mês 3', 'Mês 4', 'Mês 5', 'Mês 6'],
          datasets: [
            {
              label: 'Estratégia otimizada',
              data: [100, 150, 225, 340, 510, 765],
              borderColor: 'rgb(34, 197, 94)',
              tension: 0.1
            },
            {
              label: 'Estratégia comum',
              data: [100, 110, 120, 125, 130, 135],
              borderColor: 'rgb(156, 163, 175)',
              tension: 0.1
            }
          ]
        }
      }
    ];

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
          labels: {
            color: 'rgb(55, 65, 81)' // text-gray-700
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgb(229, 231, 235)' // text-gray-200
          },
          ticks: {
            color: 'rgb(55, 65, 81)' // text-gray-700
          }
        },
        y: {
          grid: {
            color: 'rgb(229, 231, 235)' // text-gray-200
          },
          ticks: {
            color: 'rgb(55, 65, 81)' // text-gray-700
          }
        }
      }
    };

    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-900">{graphs[currentGraph].title}</h3>
        <p className="text-gray-600">{graphs[currentGraph].description}</p>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          {currentGraph === 1 ? (
            <Bar data={graphs[currentGraph].data} options={options} />
          ) : (
            <Line data={graphs[currentGraph].data} options={options} />
          )}
        </div>
        <button
          onClick={handleContinueFromGraph}
          className="w-full flex justify-center items-center space-x-2 py-3 px-4 
                   border-2 border-gray-800 text-gray-800 rounded-lg transition-colors 
                   font-light hover:bg-gray-50"
        >
          <span>Continuar</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  };

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-helvetica">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <Logo />
          <h1 className="text-3xl font-light text-gray-900 mb-6">
            Bem-vindo ao Quiz de Estratégias para Criptomoedas!
          </h1>
          <p className="text-gray-500 mb-8 font-light">
            Descubra em poucos minutos como sua estratégia de investimentos pode estar deixando 
            oportunidades incríveis de lucro e segurança de lado. Pronto para começar?
          </p>
          <button
            onClick={handleStartQuiz}
            className="w-full flex justify-center items-center space-x-2 py-3 px-4 
                     border-2 border-gray-800 text-gray-800 rounded-lg transition-colors 
                     font-light hover:bg-gray-50"
          >
            <span>Começar Quiz</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  const currentQuestionData = quizQuestions[currentQuestion];
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-helvetica">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <Logo />
        {showGraph ? (
          renderGraph()
        ) : !showForm && currentQuestionData ? (
          <>
            <div className="mb-8">
              <div className="text-sm text-gray-400 mb-2 font-light">
                Pergunta {currentQuestion + 1} de {quizQuestions.length}
              </div>
              <h2 className="text-2xl font-light text-gray-900">
                {currentQuestionData.question}
              </h2>
            </div>
            <div className="space-y-4">
              {currentQuestionData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.text)}
                  className="w-full flex items-center space-x-3 px-4 py-3 
                           border-2 border-gray-300 rounded-lg bg-white 
                           hover:border-gray-800 hover:text-gray-800 
                           transition-colors duration-200 focus:outline-none 
                           focus:ring-2 focus:ring-gray-800 font-light"
                >
                  <div className="flex-shrink-0">
                    {option.icon}
                  </div>
                  <span className="flex-grow text-left text-gray-600">{option.text}</span>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </div>
          </>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-8">
            <h2 className="text-2xl font-light text-gray-900 mb-8">
              Ótimo! Agora precisamos de alguns dados para enviar sua análise personalizada
            </h2>
            <div className="space-y-2">
              <label htmlFor="name" className="block text-base font-light text-gray-700">
                Nome completo
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-6 w-6 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  required
                  className="pl-12 block w-full rounded-md border-gray-300 
                           shadow-sm focus:ring-gray-500 focus:border-gray-500
                           py-4 text-lg font-light"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-base font-light text-gray-700">
                E-mail
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-6 w-6 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  required
                  className="pl-12 block w-full rounded-md border-gray-300 
                           shadow-sm focus:ring-gray-500 focus:border-gray-500
                           py-4 text-lg font-light"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-base font-light text-gray-700">
                Telefone
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-6 w-6 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  required
                  className="pl-12 block w-full rounded-md border-gray-300 
                           shadow-sm focus:ring-gray-500 focus:border-gray-500
                           py-4 text-lg font-light"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center items-center space-x-2 py-4 px-6 
                       border-2 border-gray-800 text-gray-800 rounded-lg 
                       transition-colors font-light text-lg mt-8 hover:bg-gray-50"
            >
              <span>Receber análise personalizada</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </form>
        )}
      </div>
      
      {/* Exit Popup */}
      {showExitPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowExitPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center">
              <div className="mb-4">
                <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded">
                  Oferta Especial
                </span>
              </div>
              
              <h3 className="text-2xl font-light text-gray-900 mb-4">
                Espere! Não perca esta oportunidade única
              </h3>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  80% OFF
                </p>
                <p className="text-gray-600 font-light">
                  Aproveite agora este desconto exclusivo para transformar sua jornada nos investimentos
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleRedirectToOffer}
                  className="w-full flex justify-center items-center space-x-2 py-4 px-6 
                           bg-gray-800 text-white rounded-lg transition-colors 
                           font-light text-lg hover:bg-gray-700"
                >
                  <span>Quero aproveitar o desconto</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => setShowExitPopup(false)}
                  className="w-full py-2 px-4 text-gray-500 font-light hover:text-gray-700"
                >
                  Não, prefiro pagar mais depois
                </button>
              </div>

              <p className="mt-6 text-sm text-gray-500 font-light">
                *Oferta por tempo limitado
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 