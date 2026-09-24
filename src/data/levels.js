export const LEVELS = [
  {
    id: 1,
    title: 'Nível 1 — Saída do trabalho',
    description: 'Você terminou o trabalho e precisa fazer um trajeto seguro até em casa.',
    map: '/assets/cenarios/rua1.png',
    mapPosition: 'center center',
    startPosition: { x: 50, y: 88 },
    events: [
      {
        id: 'faixa', x: 49, y: 70, icon: '🚶', title: 'Faixa de pedestres',
        description: 'Você se aproxima de uma faixa. Há pessoas esperando para atravessar.',
        question: 'Qual atitude deixa a travessia mais segura?',
        choices: [
          { text: 'Diminuir a velocidade e dar passagem ao pedestre.', correct: true, feedback: 'Boa! Respeitar a faixa ajuda a proteger quem está atravessando.', progress: 34 },
          { text: 'Acelerar para passar antes do pedestre.', correct: false, feedback: 'Essa atitude aumenta o risco de atropelamento.' },
          { text: 'Passar pela calçada para evitar a faixa.', correct: false, feedback: 'A calçada é destinada à circulação de pedestres.' }
        ]
      },
      {
        id: 'semaforo', x: 50, y: 48, icon: '🚦', title: 'Semáforo',
        description: 'O semáforo está vermelho para você. A rua parece vazia.',
        question: 'O que fazer?',
        choices: [
          { text: 'Parar e aguardar o sinal verde.', correct: true, feedback: 'Certo! A via vazia não muda a regra do semáforo.', progress: 33 },
          { text: 'Passar rapidamente porque não há carros.', correct: false, feedback: 'Avançar o sinal pode causar uma colisão inesperada.' },
          { text: 'Olhar para os lados e passar mesmo com o vermelho.', correct: false, feedback: 'A sinalização deve ser respeitada.' }
        ]
      },
      {
        id: 'ciclovia', x: 61, y: 26, icon: '🚲', title: 'Ciclovia',
        description: 'Uma ciclovia acompanha seu caminho. Um ciclista está se aproximando.',
        question: 'Como conviver com segurança nesse trecho?',
        choices: [
          { text: 'Respeitar o espaço do ciclista e evitar bloquear a ciclovia.', correct: true, feedback: 'Muito bem! Cada usuário precisa ter seu espaço respeitado.', progress: 33 },
          { text: 'Parar no meio da ciclovia por alguns segundos.', correct: false, feedback: 'Bloquear a ciclovia pode provocar uma colisão.' }
        ]
      }
    ],
    reward: { type: 'Roupa', name: 'Colete refletivo', icon: '🦺', description: 'Item desbloqueado por completar o primeiro trajeto com segurança.' }
  },
  {
    id: 2,
    title: 'Nível 2 — Mobilidade elétrica',
    description: 'Agora você encontra situações envolvendo moto e bicicleta elétrica.',
    map: '/assets/cenarios/rua2.png',
    mapPosition: 'center center',
    startPosition: { x: 50, y: 88 },
    events: [
      {
        id: 'capacete', x: 49, y: 70, icon: '🪖', title: 'Proteção',
        description: 'Você vai sair usando um veículo elétrico. Antes de seguir, precisa conferir seus equipamentos.',
        question: 'Qual atitude é mais segura antes de sair?',
        choices: [
          { text: 'Colocar capacete e conferir se o veículo está em boas condições.', correct: true, feedback: 'Certo! Preparação e equipamentos de proteção reduzem riscos.', progress: 34 },
          { text: 'Sair sem proteção porque o trajeto é curto.', correct: false, feedback: 'A distância não elimina os riscos do trânsito.' },
          { text: 'Começar a andar e verificar os equipamentos só depois.', correct: false, feedback: 'A verificação deve acontecer antes do deslocamento.' }
        ]
      },
      {
        id: 'velocidade', x: 50, y: 48, icon: '⚡', title: 'Velocidade',
        description: 'Você está em uma área com pedestres e outros veículos. É tentador acelerar.',
        question: 'Qual escolha demonstra condução responsável?',
        choices: [
          { text: 'Reduzir a velocidade e manter atenção ao redor.', correct: true, feedback: 'Perfeito! Velocidade compatível com o local dá mais tempo para reagir.', progress: 33 },
          { text: 'Acelerar para terminar o trajeto mais rápido.', correct: false, feedback: 'Acelerar em área movimentada aumenta o risco.' }
        ]
      },
      {
        id: 'cruzamento', x: 49, y: 26, icon: '🛵', title: 'Convivência no trânsito',
        description: 'Um carro está mudando de direção enquanto você se aproxima do cruzamento.',
        question: 'O que fazer?',
        choices: [
          { text: 'Reduzir, observar a sinalização e manter distância segura.', correct: true, feedback: 'Boa decisão! Atenção e distância ajudam a evitar conflitos.', progress: 33 },
          { text: 'Passar rapidamente pela frente do carro.', correct: false, feedback: 'Cruzar a trajetória de outro veículo sem segurança é arriscado.' }
        ]
      }
    ],
    reward: { type: 'Veículo', name: 'Carro urbano', icon: '🚗', image: '/assets/carros/direita.png', description: 'Um novo veículo foi desbloqueado para a coleção.' }
  },
  {
    id: 3,
    title: 'Nível 3 — Último trecho',
    description: 'O caminho final exige atenção redobrada para você conseguir chegar em casa.',
    map: '/assets/cenarios/rua1.png',
    mapPosition: 'bottom center',
    startPosition: { x: 50, y: 88 },
    events: [
      {
        id: 'atencao', x: 50, y: 71, icon: '👀', title: 'Atenção ao entorno',
        description: 'Há muitos elementos ao seu redor e um veículo pode surgir de uma rua lateral.',
        question: 'Como seguir com mais segurança?',
        choices: [
          { text: 'Diminuir a velocidade, observar os lados e antecipar possíveis riscos.', correct: true, feedback: 'Certo! Antecipar riscos ajuda a tomar decisões melhores.', progress: 34 },
          { text: 'Usar o celular enquanto continua o trajeto.', correct: false, feedback: 'Distrações diminuem sua percepção do trânsito.' },
          { text: 'Ignorar a movimentação porque você já conhece o caminho.', correct: false, feedback: 'Conhecer o caminho não elimina situações inesperadas.' }
        ]
      },
      {
        id: 'convivencia', x: 50, y: 49, icon: '↔️', title: 'Cruzamento',
        description: 'Você chega a um cruzamento com vários usuários da via.',
        question: 'Qual comportamento favorece a convivência segura?',
        choices: [
          { text: 'Respeitar a sinalização, manter atenção e ceder quando necessário.', correct: true, feedback: 'Muito bem! Segurança no trânsito depende da colaboração entre todos.', progress: 33 },
          { text: 'Entrar primeiro para garantir espaço.', correct: false, feedback: 'Disputar espaço aumenta a possibilidade de conflito.' }
        ]
      },
      {
        id: 'chegada', x: 50, y: 28, icon: '🏠', title: 'Última decisão',
        description: 'Você está perto de casa, mas percebe uma área movimentada à frente.',
        question: 'O que fazer antes de concluir o trajeto?',
        choices: [
          { text: 'Manter a calma, respeitar as regras e concluir o trajeto com segurança.', correct: true, feedback: 'Você chegou! Segurança vem antes da pressa.', progress: 33 },
          { text: 'Acelerar porque falta pouco para chegar.', correct: false, feedback: 'Os últimos metros também fazem parte do trajeto.' }
        ]
      }
    ],
    reward: { type: 'Final', name: 'Chave da Casa', icon: '🔑', description: 'Você completou os três níveis e concluiu o trajeto.' }
  }
];
