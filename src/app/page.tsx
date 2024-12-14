'use client'
import { useState } from "react";
import Link from 'next/link'

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+55',
    whatsapp: ''
  });
  const [verificationStep, setVerificationStep] = useState<'form' | 'verify'>('form');
  const [verificationCode, setVerificationCode] = useState('');
  const [userInputCode, setUserInputCode] = useState('');
  
  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const code = generateCode();
      setVerificationCode(code);
      
      const cleanNumber = formData.whatsapp.replace(/\D/g, '');
      const fullNumber = `${formData.countryCode}${cleanNumber}`;
      
      console.log('Enviando código para:', {
        number: fullNumber,
        code: code
      });
      
      const response = await fetch('/api/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: fullNumber,
          code: code
        }),
      });

      const data = await response.json();
      console.log('Resposta completa:', data);

      if (data.success) {
        setVerificationStep('verify');
      } else {
        throw new Error(`Falha ao enviar código: ${data.error} (${data.code})`);
      }
    } catch (error: any) {
      alert(`Erro ao enviar código: ${error.message}`);
      console.error('Erro detalhado:', error);
    }
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userInputCode === verificationCode) {
      alert('Código verificado com sucesso! Cadastro concluído.');
      // Aqui você pode adicionar a lógica para salvar os dados
      console.log('Dados do cadastro:', formData);
    } else {
      alert('Código incorreto. Tente novamente.');
    }
  };

  if (verificationStep === 'verify') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Verificar Código
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Digite o código enviado para seu WhatsApp
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleVerifyCode}>
            <div>
              <input
                type="text"
                maxLength={6}
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center text-2xl tracking-widest"
                placeholder="000000"
                value={userInputCode}
                onChange={(e) => setUserInputCode(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Verificar Código
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Cadastro
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSendCode}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">
                WhatsApp
              </label>
              <div className="flex">
                <select
                  className="appearance-none rounded-l-lg relative block w-24 px-3 py-2 border border-r-0 border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.countryCode}
                  onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
                >
                  <option value="+55">+55</option>
                  <option value="+1">+1</option>
                  <option value="+351">+351</option>
                  <option value="+44">+44</option>
                </select>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  required
                  className="appearance-none rounded-r-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="(11) 98765-4321"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Enviar Código de Verificação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
