import React, { useState } from 'react';
import {
  LayoutDashboard,
  Calendar as CalendarIcon,
  FileText,
  Video,
  Share2,
  Bell,
  Search,
  CheckCircle2,
  Clock,
  Heart,
  ShieldCheck,
  Users,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  MessageSquare,
  Plus,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  UserCheck,
  ClipboardList,
  Lock,
  Unlock,
  Send,
  Menu,
  X,
  MapPin,
  Stethoscope
} from 'lucide-react';

// ==========================================
// DADOS INICIAIS (MOCK DATA - VISÃO PSICÓLOGO)
// ==========================================

const INITIAL_PATIENTS = [
  {
    id: 1,
    name: 'Mariana Silva',
    age: 27,
    babyAge: '2 meses (1ª viagem)',
    origin: 'Encaminhamento ACS • UBS Jardim Esperança (SUS)',
    acsAgent: 'Agente Cláudia Ferreira',
    nextSession: '22 de Outubro às 14:00',
    modality: 'Acolhimento Online via SUS',
    edinburghScore: 13,
    maxScore: 15,
    riskLevel: 'Alto Risco (Sobrecarga e Sintomas de DPP)',
    supportNetwork: 'Sem rede de apoio familiar presente; renda limitada.',
    patientQuote:
      'Eu sinto uma tristeza profunda e a culpa por não conseguir me conectar com meu bebê. Sem conseguir consulta pelo plano ou posto, sofro em silêncio.',
    edinburghBreakdown: [
      { question: 'Capaz de rir e achar graça das coisas', answer: 'Não, de jeito nenhum', points: 3 },
      { question: 'Culpou-se sem necessidade quando as coisas saíram erradas', answer: 'Sim, na maioria das vezes', points: 3 },
      { question: 'Esteve ansiosa ou preocupada sem motivo claro', answer: 'Sim, com muita frequência', points: 3 },
      { question: 'Sentiu que as coisas estavam tão difíceis que não ia dar conta', answer: 'Sim, na maioria das vezes me sinto sobrecarregada', points: 2 },
      { question: 'Sentiu-se tão triste que teve vontade de chorar', answer: 'Sim, bastante vezes', points: 2 }
    ],
    clinicalNotes: [
      {
        id: 101,
        date: '14/10/2026 - 10:15',
        author: 'Agente Cláudia (ACS - Visita Domiciliar)',
        text: 'Puérpera apresentou choro fácil durante a visita domiciliar. Relata exaustão extrema, isolamento e sentimento de culpa constante. Triagem digital preenchida no celular com pontuação de alerta (13/15). Prioridade solicitada.'
      }
    ]
  },
  {
    id: 2,
    name: 'Beatriz Santos',
    age: 24,
    babyAge: '4 meses',
    origin: 'Autoavaliação no App • Vaga Social Florável',
    acsAgent: 'Demanda Espontânea Digital',
    nextSession: '22 de Outubro às 15:30',
    modality: 'Vaga Social Gratuita',
    edinburghScore: 9,
    maxScore: 15,
    riskLevel: 'Risco Moderado (Ansiedade Perinatal)',
    supportNetwork: 'Mora com a mãe, mas enfrenta jornada dupla e privação de sono.',
    patientQuote:
      'Tenho tido crises de ansiedade à noite quando o bebê chora e medo constante de não ser uma boa mãe.',
    edinburghBreakdown: [
      { question: 'Capaz de rir e achar graça das coisas', answer: 'Não tanto quanto antes', points: 1 },
      { question: 'Culpou-se sem necessidade', answer: 'Sim, algumas vezes', points: 2 },
      { question: 'Ansiosa ou preocupada sem motivo claro', answer: 'Sim, com muita frequência', points: 3 },
      { question: 'Sentiu que não ia dar conta', answer: 'Sim, às vezes', points: 2 },
      { question: 'Tristeza com vontade de chorar', answer: 'Só ocasionalmente', points: 1 }
    ],
    clinicalNotes: [
      {
        id: 102,
        date: '12/10/2026 - 16:00',
        author: 'Dra. Helena Souza',
        text: 'Primeira sessão de escuta realizada. Paciente validada em suas dores maternas. Recomendada participação na Roda de Conversa de quinta-feira.'
      }
    ]
  },
  {
    id: 3,
    name: 'Larissa Oliveira',
    age: 31,
    babyAge: 'Gestante (32 semanas)',
    origin: 'Pré-Natal UBS Central • SUS',
    acsAgent: 'Agente Marcos Vinicius',
    nextSession: '23 de Outubro às 09:00',
    modality: 'Acolhimento Pré-Natal SUS',
    edinburghScore: 11,
    maxScore: 15,
    riskLevel: 'Atenção Preventiva (Sinais na Gestação)',
    supportNetwork: 'Mãe solo, desempregada recentemente.',
    patientQuote:
      'As mudanças de humor e o medo do futuro têm tirado meu sono durante a gravidez.',
    edinburghBreakdown: [
      { question: 'Capaz de rir e achar graça das coisas', answer: 'Sem dúvida, menos que antes', points: 2 },
      { question: 'Culpou-se sem necessidade', answer: 'Sim, algumas vezes', points: 2 },
      { question: 'Ansiosa ou preocupada sem motivo claro', answer: 'Sim, com muita frequência', points: 3 },
      { question: 'Sentiu que não ia dar conta', answer: 'Sim, às vezes', points: 2 },
      { question: 'Tristeza com vontade de chorar', answer: 'Sim, bastante vezes', points: 2 }
    ],
    clinicalNotes: [
      {
        id: 103,
        date: '13/10/2026 - 11:30',
        author: 'Agente Marcos (ACS - Pré-Natal)',
        text: 'Identificados sinais de ansiedade intensa e tristeza durante acompanhamento na gestação. Encaminhada via Florável para prevenção antes que a crise se instale.'
      }
    ]
  }
];

const INITIAL_SUS_REFERRALS = [
  {
    id: 501,
    name: 'Fernanda Lima',
    age: 22,
    babyAge: '3 semanas',
    ubs: 'UBS Vila Nova • Ferraz de Vasconcelos',
    acs: 'Agente Patrícia Nunes',
    score: 14,
    date: 'Hoje, há 40 min',
    symptoms: ['Tristeza profunda', 'Perda de interesse', 'Sentimento de culpa', 'Isolamento'],
    status: 'Aguardando Vínculo'
  },
  {
    id: 502,
    name: 'Juliana Rocha',
    age: 29,
    babyAge: 'Gestante (28 semanas)',
    ubs: 'UBS Santo Antônio',
    acs: 'Agente Roberto Carlos',
    score: 10,
    date: 'Ontem, 17:20',
    symptoms: ['Ansiedade gestacional', 'Mudanças bruscas de humor', 'Sem rede de apoio'],
    status: 'Aguardando Vínculo'
  }
];

const INITIAL_SLOTS = [
  { time: '08:30', status: 'bloqueado', label: 'Horário Bloqueado' },
  { time: '09:30', status: 'livre_sus', label: 'Vaga Social SUS Disponível' },
  { time: '11:00', status: 'livre_social', label: 'Vaga Rede Florável Disponível' },
  { time: '14:00', status: 'ocupado', label: 'Mariana Silva (Triagem SUS)' },
  { time: '15:30', status: 'ocupado', label: 'Beatriz Santos (Acolhimento)' },
  { time: '17:00', status: 'livre_sus', label: 'Vaga Social SUS Disponível' },
  { time: '19:00', status: 'roda', label: 'Roda de Conversa (11/15 mães)' }
];

export default function FloravelPsychologistPortal() {
  // Navegação: 'dashboard' | 'agenda' | 'prontuario' | 'videochamada' | 'encaminhamentos'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Estados de Dados
  const [patients, setPatients] = useState(INITIAL_PATIENTS);
  const [selectedPatientId, setSelectedPatientId] = useState(1); // Mariana por padrão
  const [susQueue, setSusQueue] = useState(INITIAL_SUS_REFERRALS);

  // Estados da Agenda
  const [selectedDay, setSelectedDay] = useState(22);
  const [slots, setSlots] = useState(INITIAL_SLOTS);

  // Estados do Prontuário
  const [newNoteText, setNewNoteText] = useState('');
  const [susFeedbackStatus, setSusFeedbackStatus] = useState('Acompanhamento Iniciado');
  const [noteSavedToast, setNoteSavedToast] = useState(false);

  // Estados da Sala de Videochamada
  const [micActive, setMicActive] = useState(true);
  const [camActive, setCamActive] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const [sessionNotes, setSessionNotes] = useState('');
  const [sessionFinishedModal, setSessionFinishedModal] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'Mariana Silva',
      time: '14:01',
      text: 'Boa tarde, Dra. Helena. Obrigada por me atender, o bebê acabou de dormir um pouquinho.'
    },
    {
      sender: 'Dra. Helena Souza',
      time: '14:02',
      text: 'Olá, Mariana! Fique totalmente em paz, este espaço é seguro e no seu tempo.Se precisar pausar para cuidar dele, não tem problema algum.'
    }
  ]);

  const currentPatient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  // ==========================================
  // HANDLERS E AÇÕES INTERATIVAS
  // ==========================================

  const openPatientRecord = (patientId) => {
    setSelectedPatientId(patientId);
    setActiveTab('prontuario');
    setMobileMenuOpen(false);
  };

  const startVideoWithPatient = (patientId) => {
    setSelectedPatientId(patientId);
    setSessionFinishedModal(false);
    setActiveTab('videochamada');
    setMobileMenuOpen(false);
  };

  const handleAddClinicalNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const newNote = {
      id: Date.now(),
      date: '15/10/2026 - Agora',
      author: 'Dra. Helena Souza (Psicóloga Perinatal)',
      text: `[Status SUS: ${susFeedbackStatus}] ${newNoteText}`
    };

    setPatients(
      patients.map((p) =>
        p.id === currentPatient.id
          ? { ...p, clinicalNotes: [newNote, ...p.clinicalNotes] }
          : p
      )
    );
    setNewNoteText('');
    setNoteSavedToast(true);
    setTimeout(() => setNoteSavedToast(false), 3000);
  };

  const toggleSlotStatus = (index) => {
    const updated = [...slots];
    const current = updated[index];
    if (current.status === 'ocupado' || current.status === 'roda') return;

    if (current.status === 'bloqueado') {
      updated[index] = { time: current.time, status: 'livre_sus', label: 'Vaga Social SUS Disponível' };
    } else if (current.status === 'livre_sus') {
      updated[index] = { time: current.time, status: 'livre_social', label: 'Vaga Rede Florável Disponível' };
    } else {
      updated[index] = { time: current.time, status: 'bloqueado', label: 'Horário Bloqueado' };
    }
    setSlots(updated);
  };

  const handleAcceptReferral = (referral) => {
    const newPatient = {
      id: referral.id,
      name: referral.name,
      age: referral.age,
      babyAge: referral.babyAge,
      origin: `Encaminhamento ACS • ${referral.ubs}`,
      acsAgent: referral.acs,
      nextSession: '22 de Outubro às 17:00',
      modality: 'Acolhimento Online via SUS',
      edinburghScore: referral.score,
      maxScore: 15,
      riskLevel: referral.score >= 12 ? 'Alto Risco (Prioridade ACS)' : 'Risco Moderado',
      supportNetwork: 'Encaminhada via busca ativa domiciliar da Atenção Básica.',
      patientQuote: 'Sinalizada pelo Agente Comunitário de Saúde durante visita domiciliar.',
      edinburghBreakdown: [
        { question: 'Sintomas sinalizados na triagem mobile pelo ACS', answer: referral.symptoms.join(', '), points: referral.score }
      ],
      clinicalNotes: [
        {
          id: Date.now(),
          date: '15/10/2026',
          author: referral.acs,
          text: `Paciente acolhida na fila digital sem perda de papel. Sintomas observados: ${referral.symptoms.join(', ')}.`
        }
      ]
    };

    setPatients([newPatient, ...patients]);
    setSusQueue(susQueue.filter((item) => item.id !== referral.id));
    setSelectedPatientId(newPatient.id);
    setActiveTab('prontuario');
  };

  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages([
      ...chatMessages,
      { sender: 'Dra. Helena Souza', time: 'Agora', text: chatInput }
    ]);
    setChatInput('');
  };

  const handleFinishVideoSession = () => {
    if (sessionNotes.trim()) {
      const autoNote = {
        id: Date.now(),
        date: '22/10/2026 - Pós-Sessão',
        author: 'Dra. Helena Souza (Evolução de Videochamada)',
        text: sessionNotes
      };
      setPatients(
        patients.map((p) =>
          p.id === currentPatient.id
            ? { ...p, clinicalNotes: [autoNote, ...p.clinicalNotes] }
            : p
        )
      );
      setSessionNotes('');
    }
    setSessionFinishedModal(true);
  };

  // ==========================================
  // NAVEGAÇÃO LATERAL DO PROFISSIONAL
  // ==========================================

  const menuItems = [
    { id: 'dashboard', label: 'Visão Geral do Dia', icon: LayoutDashboard },
    { id: 'agenda', label: 'Gestão de Agenda', icon: CalendarIcon },
    { id: 'prontuario', label: 'Prontuário & Triagem DPP', icon: FileText },
    { id: 'videochamada', label: 'Sala de Acolhimento', icon: Video, live: true },
    {
      id: 'encaminhamentos',
      label: 'Fila Rede Básica (SUS)',
      icon: Share2,
      count: susQueue.length
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9F4F4] text-[#4A3B3B] flex font-sans">
      {/* SIDEBAR DO PSICÓLOGO (DESKTOP) */}
      <aside className="hidden lg:flex lg:w-76 bg-white border-r border-[#F2D2D5] flex-col justify-between p-6 shrink-0">
        <div>
          {/* Logo Florável Profissional */}
          <div
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 mb-10 px-2 cursor-pointer select-none"
          >
            <div className="w-11 h-11 rounded-full bg-[#F2D2D5] border-2 border-[#7C9070] flex items-center justify-center shadow-xs relative">
              <Heart className="w-5 h-5 text-[#A96461] fill-[#A96461]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-2xl text-[#4A3B3B]">Florável</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7C9070]/15 text-[#7C9070] font-bold uppercase">
                  Psi
                </span>
              </div>
              <span className="block text-[10px] uppercase tracking-widest text-[#A96461] font-semibold">
                Portal do Terapeuta Social
              </span>
            </div>
          </div>

          <div className="mb-3 px-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#4A3B3B]/45">
              Clínica Social & Integração SUS
            </p>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-[#A96461] text-white font-semibold shadow-sm'
                      : 'text-[#4A3B3B]/75 hover:bg-[#F9F4F4] hover:text-[#4A3B3B]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#A96461]'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.live && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                        isActive ? 'bg-white text-[#A96461]' : 'bg-[#F2D2D5] text-[#A96461]'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A96461] animate-pulse" />
                      Online
                    </span>
                  )}

                  {item.count > 0 && (
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-white text-[#A96461]' : 'bg-[#7C9070] text-white'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Rodapé da Sidebar: Princípio Ético Florável */}
        <div className="space-y-4">
          <div className="p-4 rounded-3xl bg-[#F9F4F4] border border-[#F2D2D5]">
            <div className="flex items-center gap-2 text-[#7C9070] font-bold text-xs mb-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Tecnologia como Logística</span>
            </div>
            <p className="text-[11px] text-[#4A3B3B]/75 leading-relaxed">
              O Florável substitui o papel no socorro para garantir zero perdas, mantendo o cuidado
              100% conduzido por profissionais capacitados.
            </p>
          </div>

          <div className="flex items-center gap-3 px-2 pt-2 border-t border-[#F2D2D5]">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
              alt="Dra. Helena Souza"
              className="w-10 h-10 rounded-2xl object-cover border border-[#F2D2D5]"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#4A3B3B] truncate">Dra. Helena Souza</p>
              <p className="text-[11px] text-[#7C9070] font-medium">CRP 06/145892 • Perinatal</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MENU MOBILE OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs lg:hidden flex">
          <div className="w-72 bg-white h-full p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-serif font-bold text-2xl text-[#4A3B3B]">Florável Psi</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-[#F9F4F4]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium ${
                        activeTab === item.id
                          ? 'bg-[#A96461] text-white font-semibold'
                          : 'text-[#4A3B3B]/80'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOPBAR */}
        <header className="bg-white/85 backdrop-blur-md border-b border-[#F2D2D5] px-6 lg:px-10 py-4 sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2.5 rounded-2xl bg-[#F9F4F4]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-[#4A3B3B]">
                Bom dia, Dra. Helena Souza
              </h1>
              <p className="text-xs text-[#7C9070] font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#7C9070]" />
                Conectada à Rede de Atenção Primária (SUS) • Zero Perdas de Encaminhamento
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Seletor Rápido de Paciente em Foco */}
            <div className="hidden md:flex items-center gap-2 bg-[#F9F4F4] px-3.5 py-2 rounded-2xl border border-[#F2D2D5]">
              <span className="text-xs text-[#4A3B3B]/60 font-medium">Paciente ativa:</span>
              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(Number(e.target.value))}
                className="bg-transparent text-xs font-bold text-[#A96461] focus:outline-none cursor-pointer"
              >
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (Score: {p.edinburghScore}/15)
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setActiveTab('encaminhamentos')}
              className="relative p-2.5 rounded-2xl bg-[#F9F4F4] hover:bg-[#F2D2D5]/60 transition"
              title="Encaminhamentos SUS"
            >
              <Bell className="w-5 h-5 text-[#4A3B3B]" />
              {susQueue.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#A96461]" />
              )}
            </button>
          </div>
        </header>

        {/* ÁREA DINÂMICA DAS ABAS */}
        <main className="p-6 lg:p-10 max-w-6xl w-full mx-auto flex-1">
          {/* =========================================================
              1. DASHBOARD DO PROFISSIONAL (VISÃO GERAL DO DIA)
          ========================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Métricas Rápidas no Topo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-5 rounded-3xl border border-[#F2D2D5] shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4A3B3B]/60">
                      Acolhimentos na Semana
                    </span>
                    <div className="w-9 h-9 rounded-2xl bg-[#F2D2D5] text-[#A96461] flex items-center justify-center">
                      <Heart className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-[#4A3B3B]">14</p>
                  <p className="text-xs text-[#7C9070] font-semibold mt-1">
                    100% gratuitos via SUS / Vaga Social
                  </p>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-[#F2D2D5] shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4A3B3B]/60">
                      Triagens (Edimburgo)
                    </span>
                    <div className="w-9 h-9 rounded-2xl bg-[#7C9070]/15 text-[#7C9070] flex items-center justify-center">
                      <ClipboardList className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-[#4A3B3B]">{patients.length}</p>
                  <p className="text-xs text-[#A96461] font-semibold mt-1">
                    1 caso prioritário (Score ≥ 12)
                  </p>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-[#F2D2D5] shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4A3B3B]/60">
                      Roda de Conversa Hoje
                    </span>
                    <div className="w-9 h-9 rounded-2xl bg-[#F2D2D5] text-[#A96461] flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-[#4A3B3B]">11/15</p>
                  <p className="text-xs text-[#4A3B3B]/60 font-medium mt-1">
                    Mães inscritas • Hoje às 19:00
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab('encaminhamentos')}
                  className="bg-white p-5 rounded-3xl border border-[#F2D2D5] shadow-xs cursor-pointer hover:border-[#A96461] transition"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4A3B3B]/60">
                      Fila Agentes SUS (ACS)
                    </span>
                    <div className="w-9 h-9 rounded-2xl bg-[#7C9070]/15 text-[#7C9070] flex items-center justify-center">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-[#4A3B3B]">{susQueue.length}</p>
                  <p className="text-xs text-[#7C9070] font-semibold mt-1 flex items-center gap-1">
                    Ver novas fichas digitais <ChevronRight className="w-3.5 h-3.5" />
                  </p>
                </div>
              </div>

              {/* Card de Destaque: Próximo Acolhimento (Mariana Silva) */}
              <div className="rounded-3xl bg-[#F2D2D5] p-6 lg:p-8 border border-[#A96461]/20 shadow-xs">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-3 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#A96461] text-white text-xs font-bold">
                        Próximo Acolhimento Prioritário
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/80 text-[#4A3B3B] text-xs font-semibold">
                        22 de Outubro às 14:00 • Acolhimento Online via SUS
                      </span>
                    </div>

                    <h2 className="text-2xl lg:text-3xl font-serif font-bold text-[#4A3B3B]">
                      Mariana Silva, 27 anos
                    </h2>

                    <p className="text-sm text-[#4A3B3B]/85 leading-relaxed">
                      <strong>Contexto da Triagem:</strong> Mãe de primeira viagem (bebê de 2 meses),
                      sem rede de apoio. Sinalizada pela Agente Comunitária de Saúde com{' '}
                      <span className="underline font-bold text-[#A96461]">
                        Pontuação 13/15 na Escala de Edimburgo
                      </span>{' '}
                      (indicativo de tristeza profunda, isolamento e culpa materna).
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                    <button
                      onClick={() => startVideoWithPatient(1)}
                      className="px-6 py-4 rounded-2xl bg-[#A96461] hover:bg-[#935350] text-white font-semibold text-sm shadow-sm transition flex items-center justify-center gap-2"
                    >
                      <Video className="w-4 h-4" />
                      Iniciar Sala de Vídeo
                    </button>
                    <button
                      onClick={() => openPatientRecord(1)}
                      className="px-6 py-3.5 rounded-2xl bg-white hover:bg-white/90 text-[#4A3B3B] font-semibold text-xs transition flex items-center justify-center gap-2"
                    >
                      <FileText className="w-4 h-4 text-[#A96461]" />
                      Abrir Prontuário & Escala de Edimburgo
                    </button>
                  </div>
                </div>
              </div>

              {/* Lista de Todos os Próximos Acolhimentos */}
              <div className="bg-white rounded-3xl border border-[#F2D2D5] p-6 lg:p-8 shadow-xs">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#4A3B3B]">
                      Pacientes Acolhidas na Sua Rede
                    </h3>
                    <p className="text-xs text-[#4A3B3B]/65">
                      Clique em uma mãe para revisar a triagem digital antes da sessão.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('agenda')}
                    className="text-xs font-bold text-[#A96461] hover:underline flex items-center gap-1"
                  >
                    Gerenciar horários livres <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {patients.map((patient) => (
                    <div
                      key={patient.id}
                      className="p-5 rounded-2xl bg-[#F9F4F4] border border-transparent hover:border-[#F2D2D5] transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-base font-bold text-[#4A3B3B]">
                            {patient.name}, {patient.age} anos
                          </h4>
                          <span className="text-xs text-[#4A3B3B]/60">• {patient.babyAge}</span>
                          <span
                            className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ${
                              patient.edinburghScore >= 12
                                ? 'bg-[#A96461]/15 text-[#A96461]'
                                : 'bg-[#7C9070]/15 text-[#7C9070]'
                            }`}
                          >
                            Edimburgo: {patient.edinburghScore}/{patient.maxScore}
                          </span>
                        </div>
                        <p className="text-xs text-[#4A3B3B]/75">
                          <strong>Sessão:</strong> {patient.nextSession} •{' '}
                          <span className="text-[#7C9070] font-semibold">{patient.origin}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 w-full md:w-auto">
                        <button
                          onClick={() => openPatientRecord(patient.id)}
                          className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-white border border-[#F2D2D5] hover:bg-[#F2D2D5]/40 text-xs font-semibold text-[#4A3B3B] transition"
                        >
                          Ver Triagem
                        </button>
                        <button
                          onClick={() => startVideoWithPatient(patient.id)}
                          className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-[#A96461] hover:bg-[#935350] text-white text-xs font-semibold transition flex items-center justify-center gap-1.5"
                        >
                          <Video className="w-3.5 h-3.5" /> Sala Online
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              2. GESTÃO DE AGENDA E HORÁRIOS (DISPONIBILIDADE)
          ========================================================= */}
          {activeTab === 'agenda' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif font-bold text-[#4A3B3B] mb-1">
                  Gestão de Agenda & Vagas Sociais
                </h2>
                <p className="text-sm text-[#4A3B3B]/70">
                  Abra horários para encaminhamentos gratuitos do SUS, vagas sociais da plataforma ou
                  rodas de conversa.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Calendário de Outubro 2026 */}
                <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-[#F2D2D5] shadow-xs">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-base font-bold text-[#4A3B3B]">Outubro 2026</span>
                    <span className="text-xs px-3 py-1 rounded-full bg-[#F2D2D5] text-[#A96461] font-semibold">
                      Dia selecionado: {selectedDay}/10
                    </span>
                  </div>

                  <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-bold text-[#4A3B3B]/50 mb-3">
                    <span>Dom</span>
                    <span>Seg</span>
                    <span>Ter</span>
                    <span>Qua</span>
                    <span>Qui</span>
                    <span>Sex</span>
                    <span>Sáb</span>
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                      const isSelected = selectedDay === day;
                      const hasPriority = day === 22 || day === 23;
                      return (
                        <button
                          key={day}
                          onClick={() => setSelectedDay(day)}
                          className={`h-11 rounded-2xl text-xs font-semibold transition relative flex flex-col items-center justify-center ${
                            isSelected
                              ? 'bg-[#A96461] text-white shadow-xs'
                              : 'bg-[#F9F4F4] text-[#4A3B3B] hover:bg-[#F2D2D5]'
                          }`}
                        >
                          <span>{day}</span>
                          {hasPriority && (
                            <span
                              className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                                isSelected ? 'bg-white' : 'bg-[#7C9070]'
                              }`}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 pt-5 border-t border-[#F9F4F4] flex flex-wrap gap-4 text-xs text-[#4A3B3B]/70">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#7C9070]" /> Vaga Social SUS
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#A96461]" /> Paciente Agendada
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#4A3B3B]/30" /> Bloqueado
                    </span>
                  </div>
                </div>

                {/* Configuração de Horários do Dia */}
                <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-[#F2D2D5] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-bold text-[#4A3B3B]">
                        Horários de {selectedDay} de Outubro
                      </h3>
                      <span className="text-[11px] text-[#4A3B3B]/60">
                        Clique nos horários livres para alternar a modalidade
                      </span>
                    </div>

                    <div className="space-y-3">
                      {slots.map((slot, index) => {
                        const isOccupied = slot.status === 'ocupado' || slot.status === 'roda';
                        return (
                          <div
                            key={slot.time}
                            onClick={() => toggleSlotStatus(index)}
                            className={`p-4 rounded-2xl border flex items-center justify-between transition ${
                              slot.status === 'ocupado'
                                ? 'bg-[#F2D2D5]/60 border-[#A96461]/40 cursor-default'
                                : slot.status === 'roda'
                                ? 'bg-[#7C9070]/15 border-[#7C9070]/40 cursor-default'
                                : slot.status === 'livre_sus'
                                ? 'bg-white border-[#7C9070] cursor-pointer hover:bg-[#7C9070]/5'
                                : slot.status === 'livre_social'
                                ? 'bg-white border-[#F2D2D5] cursor-pointer hover:bg-[#F2D2D5]/20'
                                : 'bg-[#F9F4F4] border-transparent opacity-60 cursor-pointer'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-bold text-[#4A3B3B] w-14">
                                {slot.time}
                              </span>
                              <div>
                                <p className="text-xs font-bold text-[#4A3B3B]">{slot.label}</p>
                                <p className="text-[11px] text-[#4A3B3B]/60">
                                  {isOccupied
                                    ? 'Sessão confirmada na agenda'
                                    : 'Clique para alternar: Vaga SUS → Vaga Florável → Bloqueado'}
                                </p>
                              </div>
                            </div>

                            <div>
                              {slot.status === 'bloqueado' ? (
                                <Lock className="w-4 h-4 text-[#4A3B3B]/50" />
                              ) : isOccupied ? (
                                <CheckCircle2 className="w-4 h-4 text-[#A96461]" />
                              ) : (
                                <Unlock className="w-4 h-4 text-[#7C9070]" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              3. PRONTUÁRIO E TRIAGEM DA PACIENTE (FOCO EM DPP)
          ========================================================= */}
          {activeTab === 'prontuario' && (
            <div className="space-y-6">
              {/* Barra de Seleção de Paciente */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-[#F2D2D5]">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4A3B3B]/60 px-2">
                    Prontuários Ativos:
                  </span>
                  {patients.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPatientId(p.id)}
                      className={`px-4 py-2 rounded-2xl text-xs font-semibold transition ${
                        currentPatient.id === p.id
                          ? 'bg-[#A96461] text-white'
                          : 'bg-[#F9F4F4] text-[#4A3B3B] hover:bg-[#F2D2D5]'
                      }`}
                    >
                      {p.name} ({p.edinburghScore}/15)
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => startVideoWithPatient(currentPatient.id)}
                  className="px-5 py-2.5 rounded-2xl bg-[#7C9070] hover:bg-[#6a7c5f] text-white text-xs font-semibold flex items-center gap-2"
                >
                  <Video className="w-4 h-4" /> Iniciar Videochamada com {currentPatient.name.split(' ')[0]}
                </button>
              </div>

              {/* Cabeçalho do Prontuário da Paciente */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Coluna Esquerda: Perfil e Escala de Edimburgo */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-white p-6 lg:p-8 rounded-3xl border border-[#F2D2D5] shadow-xs space-y-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold text-[#7C9070] uppercase tracking-wider">
                          {currentPatient.origin}
                        </span>
                        <h2 className="text-2xl font-serif font-bold text-[#4A3B3B] mt-1">
                          {currentPatient.name}, {currentPatient.age} anos
                        </h2>
                        <p className="text-xs text-[#4A3B3B]/70 mt-0.5">
                          Período Perinatal: <strong>{currentPatient.babyAge}</strong> • Responsável
                          ACS: <strong>{currentPatient.acsAgent}</strong>
                        </p>
                      </div>

                      <div className="text-right bg-[#F2D2D5] px-4 py-3 rounded-2xl">
                        <span className="block text-[10px] font-bold uppercase text-[#A96461]">
                          Score Edimburgo
                        </span>
                        <span className="text-2xl font-bold text-[#A96461]">
                          {currentPatient.edinburghScore}/{currentPatient.maxScore}
                        </span>
                      </div>
                    </div>

                    {/* Relato em Primeira Pessoa da Mãe */}
                    <div className="p-4 rounded-2xl bg-[#F9F4F4] border-l-4 border-[#A96461]">
                      <p className="text-xs font-bold text-[#4A3B3B] mb-1">
                        Relato na Triagem Acolhedora:
                      </p>
                      <p className="text-xs italic text-[#4A3B3B]/85 leading-relaxed">
                        "{currentPatient.patientQuote}"
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-[#4A3B3B] mb-1">
                        Contexto Socioeconômico e Rede de Apoio:
                      </p>
                      <p className="text-xs text-[#4A3B3B]/75">{currentPatient.supportNetwork}</p>
                    </div>
                  </div>

                  {/* Detalhamento das Respostas da Escala de Edimburgo */}
                  <div className="bg-white p-6 lg:p-8 rounded-3xl border border-[#F2D2D5] shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-base font-bold text-[#4A3B3B]">
                          Respostas da Triagem Digital (Escala de Edimburgo)
                        </h3>
                        <p className="text-xs text-[#4A3B3B]/60">
                          Dados coletados previamente para apoiar a condução clínica.
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#A96461]/15 text-[#A96461] text-xs font-bold">
                        {currentPatient.riskLevel}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {currentPatient.edinburghBreakdown.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-2xl bg-[#F9F4F4] flex items-center justify-between gap-4"
                        >
                          <div>
                            <p className="text-xs font-semibold text-[#4A3B3B]">{item.question}</p>
                            <p className="text-xs text-[#A96461] font-medium mt-0.5">
                              Resposta: "{item.answer}"
                            </p>
                          </div>
                          <span className="px-2.5 py-1 rounded-xl bg-white text-xs font-bold text-[#4A3B3B] shrink-0">
                            +{item.points} pts
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Coluna Direita: Notas Clínicas e Devolutiva para o SUS */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-white p-6 rounded-3xl border border-[#F2D2D5] shadow-xs">
                    <h3 className="text-base font-bold text-[#4A3B3B] mb-1">
                      Evolução Clínica & Devolutiva SUS
                    </h3>
                    <p className="text-xs text-[#4A3B3B]/65 mb-4">
                      Registre suas anotações e atualize o status do encaminhamento para a UBS.
                    </p>

                    <form onSubmit={handleAddClinicalNote} className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4A3B3B]/70 mb-1.5">
                          Status na Rede Básica (SUS)
                        </label>
                        <select
                          value={susFeedbackStatus}
                          onChange={(e) => setSusFeedbackStatus(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F9F4F4] text-xs font-semibold text-[#7C9070] focus:outline-none"
                        >
                          <option value="Acompanhamento Iniciado">
                            ✓ Acompanhamento Psicológico Iniciado (Sem fila)
                          </option>
                          <option value="Inserida em Roda de Conversa">
                            ✓ Inserida em Roda de Conversa Semanal
                          </option>
                          <option value="Solicitar Visita Domiciliar ACS">
                            ! Solicitar Nova Visita Domiciliar do ACS
                          </option>
                          <option value="Encaminhamento Psiquiatria UBS">
                            ! Compartilhar Cuidado com Médico da UBS
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4A3B3B]/70 mb-1.5">
                          Anotação do Prontuário
                        </label>
                        <textarea
                          rows={4}
                          value={newNoteText}
                          onChange={(e) => setNewNoteText(e.target.value)}
                          placeholder="Registre observações da escuta, fatores de proteção e plano terapêutico..."
                          className="w-full p-3.5 rounded-2xl bg-[#F9F4F4] text-xs focus:outline-none focus:ring-2 focus:ring-[#A96461]/40"
                        />
                      </div>

                      {noteSavedToast && (
                        <div className="p-3 rounded-xl bg-[#7C9070]/15 text-[#7C9070] text-xs font-semibold flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" /> Evolução salva e sincronizada com a rede!
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-2xl bg-[#A96461] hover:bg-[#935350] text-white font-semibold text-xs transition"
                      >
                        Salvar Evolução & Atualizar Prontuário
                      </button>
                    </form>

                    {/* Histórico de Anotações */}
                    <div className="mt-6 pt-6 border-t border-[#F9F4F4] space-y-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#4A3B3B]/50">
                        Histórico de Registros ({currentPatient.clinicalNotes.length})
                      </p>
                      {currentPatient.clinicalNotes.map((note) => (
                        <div key={note.id} className="p-3.5 rounded-2xl bg-[#F9F4F4] space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-bold text-[#A96461]">{note.author}</span>
                            <span className="text-[#4A3B3B]/50">{note.date}</span>
                          </div>
                          <p className="text-xs text-[#4A3B3B]/80 leading-relaxed">{note.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              4. SALA DE ACOLHIMENTO (SIMULAÇÃO DE VIDEOCHAMADA)
          ========================================================= */}
          {activeTab === 'videochamada' && (
            <div className="space-y-6">
              {sessionFinishedModal ? (
                <div className="bg-white rounded-3xl border border-[#F2D2D5] p-10 text-center max-w-xl mx-auto space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#7C9070]/15 text-[#7C9070] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-[#4A3B3B]">
                    Sessão de Acolhimento Finalizada
                  </h2>
                  <p className="text-sm text-[#4A3B3B]/75">
                    A evolução clínica de <strong>{currentPatient.name}</strong> foi registrada no
                    prontuário e o status de atendimento foi atualizado junto à Unidade Básica de
                    Saúde (SUS), garantindo zero perda de acompanhamento.
                  </p>
                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      onClick={() => openPatientRecord(currentPatient.id)}
                      className="px-6 py-3 rounded-2xl bg-[#A96461] text-white text-xs font-semibold"
                    >
                      Ver Prontuário Atualizado
                    </button>
                    <button
                      onClick={() => setActiveTab('dashboard')}
                      className="px-6 py-3 rounded-2xl bg-[#F9F4F4] text-[#4A3B3B] text-xs font-semibold"
                    >
                      Voltar ao Painel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Área Principal de Vídeo */}
                  <div className="lg:col-span-8 bg-[#362B2B] rounded-3xl overflow-hidden relative min-h-[460px] flex flex-col justify-between p-6 text-white shadow-md">
                    {/* Topo da Chamada */}
                    <div className="flex items-center justify-between z-10">
                      <div className="flex items-center gap-3 bg-black/35 backdrop-blur-md px-4 py-2 rounded-2xl">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#7C9070] animate-pulse" />
                        <div>
                          <p className="text-xs font-bold">{currentPatient.name}</p>
                          <p className="text-[10px] text-white/75">
                            {currentPatient.modality} • Score Edimburgo: {currentPatient.edinburghScore}/15
                          </p>
                        </div>
                      </div>

                      <div className="bg-black/35 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs font-mono">
                        00:24:18
                      </div>
                    </div>

                    {/* Simulação Visual da Paciente e Miniatura da Psicóloga */}
                    <div className="my-auto text-center space-y-3 z-10 py-12">
                      <div className="w-24 h-24 rounded-full bg-[#F2D2D5] text-[#A96461] font-serif font-bold text-3xl flex items-center justify-center mx-auto border-4 border-white/20 shadow-lg">
                        {currentPatient.name.charAt(0)}
                      </div>
                      <p className="text-base font-semibold">{currentPatient.name}</p>
                      <p className="text-xs text-white/70 max-w-sm mx-auto">
                        Conexão segura e criptografada • Ambiente de escuta humanizada Florável
                      </p>
                    </div>

                    {/* Miniatura da Dra. Helena */}
                    <div className="absolute bottom-24 right-6 w-36 h-24 rounded-2xl bg-[#4A3B3B] border-2 border-white/30 overflow-hidden shadow-md flex items-center justify-center">
                      {camActive ? (
                        <img
                          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80"
                          alt="Dra. Helena"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-[11px] text-white/60">Câmera desligada</span>
                      )}
                      <span className="absolute bottom-1.5 left-2 text-[10px] bg-black/50 px-2 py-0.5 rounded-md">
                        Você (Dra. Helena)
                      </span>
                    </div>

                    {/* Barra de Controles de Áudio / Vídeo / Encerramento */}
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-white/10 z-10">
                      <button
                        onClick={() => setMicActive(!micActive)}
                        className={`p-3.5 rounded-2xl transition ${
                          micActive ? 'bg-white/15 hover:bg-white/25' : 'bg-[#A96461] text-white'
                        }`}
                        title="Alternar Microfone"
                      >
                        {micActive ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                      </button>

                      <button
                        onClick={() => setCamActive(!camActive)}
                        className={`p-3.5 rounded-2xl transition ${
                          camActive ? 'bg-white/15 hover:bg-white/25' : 'bg-[#A96461] text-white'
                        }`}
                        title="Alternar Câmera"
                      >
                        {camActive ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                      </button>

                      <button
                        onClick={handleFinishVideoSession}
                        className="px-5 py-3.5 rounded-2xl bg-[#A96461] hover:bg-[#935350] text-white text-xs font-bold flex items-center gap-2 transition shadow-sm"
                      >
                        <PhoneOff className="w-4 h-4" />
                        Finalizar Sessão e Registrar Evolução
                      </button>
                    </div>
                  </div>

                  {/* Painel Lateral da Videochamada: Chat + Notas Rápidas */}
                  <div className="lg:col-span-4 flex flex-col gap-4">
                    {/* Bloco de Notas Rápidas da Sessão */}
                    <div className="bg-white p-5 rounded-3xl border border-[#F2D2D5] shadow-xs">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#A96461] mb-2">
                        Registro Rápido de Evolução
                      </p>
                      <textarea
                        rows={3}
                        value={sessionNotes}
                        onChange={(e) => setSessionNotes(e.target.value)}
                        placeholder="Anote pontos importantes durante a fala da mãe (salvo automaticamente ao finalizar)..."
                        className="w-full p-3 rounded-2xl bg-[#F9F4F4] text-xs focus:outline-none"
                      />
                    </div>

                    {/* Chat de Apoio da Chamada */}
                    <div className="bg-white p-5 rounded-3xl border border-[#F2D2D5] shadow-xs flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#7C9070] mb-3">
                          Chat de Apoio (Caso o bebê esteja dormindo)
                        </p>
                        <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                          {chatMessages.map((msg, i) => (
                            <div
                              key={i}
                              className={`p-3 rounded-2xl text-xs ${
                                msg.sender.includes('Helena')
                                  ? 'bg-[#F2D2D5]/60 text-[#4A3B3B] ml-4'
                                  : 'bg-[#F9F4F4] text-[#4A3B3B] mr-4'
                              }`}
                            >
                              <div className="flex justify-between text-[10px] font-bold text-[#A96461] mb-1">
                                <span>{msg.sender}</span>
                                <span>{msg.time}</span>
                              </div>
                              <p>{msg.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <form onSubmit={handleSendChatMessage} className="mt-4 flex gap-2">
                        <input
                          type="text"
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          placeholder="Enviar mensagem acolhedora..."
                          className="flex-1 px-3.5 py-2.5 rounded-2xl bg-[#F9F4F4] text-xs focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="p-2.5 rounded-2xl bg-[#A96461] text-white"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================
              5. INTEGRAÇÃO COM AGENTES DE SAÚDE (FILA REDE BÁSICA SUS)
          ========================================================= */}
          {activeTab === 'encaminhamentos' && (
            <div className="space-y-6">
              <div className="bg-[#F2D2D5] p-6 lg:p-8 rounded-3xl border border-[#A96461]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-white text-[#A96461] text-xs font-bold mb-2">
                    Integração Atenção Primária • Zero Papel
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-[#4A3B3B]">
                    Encaminhamentos da Rede Básica (SUS)
                  </h2>
                  <p className="text-xs lg:text-sm text-[#4A3B3B]/80 max-w-2xl mt-1">
                    Mães triadas pelos Agentes Comunitários de Saúde (ACS) no celular durante
                    visitas domiciliares. Ao assumir um caso, a mãe recebe o agendamento direto sem
                    filas e sem risco de perder a guia de encaminhamento.
                  </p>
                </div>
              </div>

              {susQueue.length === 0 ? (
                <div className="bg-white p-10 rounded-3xl border border-[#F2D2D5] text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#7C9070] mx-auto" />
                  <h3 className="text-lg font-bold text-[#4A3B3B]">
                    Todas as mães encaminhadas pelos ACS já foram acolhidas!
                  </h3>
                  <p className="text-xs text-[#4A3B3B]/70">
                    Nenhuma ficha parada na fila. Você pode revisar os casos aceitos na aba de
                    Prontuários.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {susQueue.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-6 rounded-3xl border border-[#F2D2D5] shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                    >
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-[#A96461] text-white text-xs font-bold">
                            Score Edimburgo: {item.score}/15
                          </span>
                          <span className="text-xs font-bold text-[#7C9070] flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" /> {item.ubs}
                          </span>
                          <span className="text-xs text-[#4A3B3B]/50">• {item.date}</span>
                        </div>

                        <h3 className="text-lg font-bold text-[#4A3B3B]">
                          {item.name}, {item.age} anos ({item.babyAge})
                        </h3>

                        <p className="text-xs text-[#4A3B3B]/75">
                          <strong>Triagem Domiciliar por:</strong> {item.acs}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {item.symptoms.map((sym, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-xl bg-[#F9F4F4] text-[#A96461] text-[11px] font-semibold"
                            >
                              Alertas: {sym}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="w-full lg:w-auto shrink-0">
                        <button
                          onClick={() => handleAcceptReferral(item)}
                          className="w-full lg:w-auto px-6 py-3.5 rounded-2xl bg-[#7C9070] hover:bg-[#6a7c5f] text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
                        >
                          <UserCheck className="w-4 h-4" />
                          Assumir Caso & Vincular à Minha Agenda
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}