// Development utilities for chat functionality
import type { Recommendation } from '@/stores/chatStore';
import API_CONFIG from '@/config/api';

/**
 * Mock recommendations for development/testing
 */
export const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    title: 'HubSpot CRM Pro',
    summary: 'Sistema de gestão de clientes adaptado para suas necessidades específicas.',
    description: 'Plataforma completa de CRM que automatiza vendas, marketing e atendimento ao cliente. Ideal para empresas que buscam crescimento escalável.',
    mediaUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80',
    url: 'https://hubspot.com?ref=adapta',
    primaryColor: '#ff7a59',
    secondaryColor: '#ff9777',
    logo: 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png',
    companyName: 'HubSpot',
    price: 'A partir de R$ 299/mês',
    rating: 5,
    cta: 'Saiba Mais',
    relevanceScore: 0.95,
    type: 'product' as const
  },
  {
    id: '2',
    title: 'Consultoria em Marketing Digital',
    summary: 'Serviços especializados em estratégia e implementação de marketing digital.',
    description: 'Consultoria completa em marketing digital com foco em crescimento sustentável. Desenvolvemos estratégias personalizadas para cada negócio.',
    mediaUrl: '',
    image: '',
    url: 'https://agenciadigital.com?ref=adapta',
    primaryColor: '#4f46e5',
    secondaryColor: '#7c3aed',
    logo: 'https://images.unsplash.com/photo-1549921296-3b0d24789407?w=100&h=100&fit=crop&crop=entropy&auto=format&q=80',
    companyName: 'Agência Digital Pro',
    price: 'A partir de R$ 2.500/projeto',
    rating: 5,
    cta: 'Ver Serviço',
    relevanceScore: 0.92,
    type: 'service' as const
  },
  {
    id: '3',
    title: 'Ana Silva - Growth Hacker',
    summary: 'Especialista em crescimento de startups e estratégias de growth hacking.',
    description: 'Growth hacker com mais de 8 anos de experiência ajudando startups a escalar. Especializada em aquisição de usuários e otimização de conversão.',
    mediaUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b2bc?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b2bc?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    url: 'https://anasilva.com?ref=adapta',
    primaryColor: '#ec4899',
    secondaryColor: '#f472b6',
    logo: '',
    companyName: 'Ana Silva',
    price: 'R$ 180/hora',
    rating: 5,
    cta: 'Ver Perfil',
    relevanceScore: 0.88,
    type: 'creator' as const
  }
];

/**
 * Generates a mock response for development
 */
export function generateMockResponse(message: string): string {
  const responses = [
    `Entendo sua pergunta sobre "${message}". Baseado no contexto da nossa conversa, aqui está uma resposta detalhada que pode ajudar você a tomar a melhor decisão para seu negócio.`,
    `Ótima pergunta! Para "${message}", recomendo uma abordagem estratégica que considera tanto o mercado atual quanto as tendências futuras.`,
    `Sobre "${message}", existe uma série de opções e soluções que podem ser aplicadas ao seu contexto específico.`,
    `É uma questão interessante sobre "${message}". Vou compartilhar algumas insights que podem ser úteis para sua situação.`
  ];
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  return `${randomResponse}

Esta resposta está sendo gerada pela integração com a API real do backend. O sistema analisa seu contexto, histórico de conversa e necessidades específicas para fornecer respostas personalizadas e recomendações relevantes.

As recomendações abaixo são baseadas em sua consulta e podem incluir produtos, serviços ou especialistas que podem ajudar com sua necessidade específica.`;
}

/**
 * Simulates streaming response chunks
 */
export function* simulateStreaming(text: string, delay: number = 50): Generator<string, void, unknown> {
  const words = text.split(' ');
  let currentText = '';
  
  for (let i = 0; i < words.length; i++) {
    currentText += (i > 0 ? ' ' : '') + words[i];
    yield currentText;
  }
}

// Development utilities for chat functionality
/**
 * Checks if we should use development mode (when backend is not available)
 */
export function shouldUseDevelopmentMode(): boolean {
  return API_CONFIG.development.useMockApi;
}
