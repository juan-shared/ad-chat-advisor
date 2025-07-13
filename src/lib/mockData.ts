import { ChatHistoryResponse } from "./api";

export const mockChatHistory: ChatHistoryResponse[] = [
  {
    id: "1",
    sessionId: "session-crm-config-123",
    title: "Configuração de CRM",
    messages: [
      {
        id: "msg-1",
        content: "Preciso de ajuda para configurar um CRM para minha empresa",
        role: "user",
        timestamp: "2024-01-15T10:30:00Z",
      },
      {
        id: "msg-2",
        content:
          "Claro! Vou te ajudar a escolher o melhor CRM para sua empresa. Primeiro, me conte um pouco sobre seu negócio - qual o tamanho da equipe e que tipo de clientes vocês atendem?",
        role: "assistant",
        timestamp: "2024-01-15T10:31:00Z",
      },
      {
        id: "msg-3",
        content:
          "Somos uma empresa de 15 pessoas, vendemos software B2B para empresas médias",
        role: "user",
        timestamp: "2024-01-15T10:32:00Z",
      },
    ],
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:32:00Z",
  },
  {
    id: "2",
    sessionId: "session-marketing-auto-456",
    title: "Automação de Marketing",
    messages: [
      {
        id: "msg-4",
        content: "Como posso automatizar meu marketing digital?",
        role: "user",
        timestamp: "2024-01-14T14:20:00Z",
      },
      {
        id: "msg-5",
        content:
          "Existem várias ferramentas excelentes para automação de marketing! Vou recomendar algumas opções baseadas no seu perfil e necessidades.",
        role: "assistant",
        timestamp: "2024-01-14T14:21:00Z",
      },
    ],
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-14T14:21:00Z",
  },
  {
    id: "3",
    sessionId: "session-analysis-tools-789",
    title: "Ferramentas de Análise",
    messages: [
      {
        id: "msg-6",
        content: "Quais são as melhores ferramentas de análise de dados?",
        role: "user",
        timestamp: "2024-01-13T09:15:00Z",
      },
      {
        id: "msg-7",
        content:
          "Para análise de dados, recomendo começar com Google Analytics para web, e depois expandir para ferramentas como Tableau ou Power BI dependendo da complexidade dos seus dados.",
        role: "assistant",
        timestamp: "2024-01-13T09:16:00Z",
      },
      {
        id: "msg-8",
        content: "Interessante! E para análise de redes sociais?",
        role: "user",
        timestamp: "2024-01-13T09:17:00Z",
      },
    ],
    createdAt: "2024-01-13T09:15:00Z",
    updatedAt: "2024-01-13T09:17:00Z",
  },
  {
    id: "4",
    sessionId: "session-ecommerce-setup-101",
    title: "E-commerce Setup",
    messages: [
      {
        id: "msg-9",
        content: "Preciso montar uma loja online. Por onde começar?",
        role: "user",
        timestamp: "2024-01-12T16:45:00Z",
      },
      {
        id: "msg-10",
        content:
          "Ótima pergunta! Para e-commerce, temos várias opções. Vou te mostrar as principais plataformas e suas vantagens.",
        role: "assistant",
        timestamp: "2024-01-12T16:46:00Z",
      },
    ],
    createdAt: "2024-01-12T16:45:00Z",
    updatedAt: "2024-01-12T16:46:00Z",
  },
  {
    id: "5",
    sessionId: "session-project-management-202",
    title: "Gestão de Projetos",
    messages: [
      {
        id: "msg-11",
        content:
          "Nossa equipe está crescendo e precisamos de uma ferramenta de gestão de projetos",
        role: "user",
        timestamp: "2024-01-11T11:30:00Z",
      },
    ],
    createdAt: "2024-01-11T11:30:00Z",
    updatedAt: "2024-01-11T11:30:00Z",
  },
];
