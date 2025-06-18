const botData = {
  "Cuál es tu experiencia como desarrollador?": {
    answer:
      "Soy un desarrollador web junior en continua formación, tanto academica como autodidacta. He realizado multiples proyectos y continuo formandome constantemente.",
    followup: ["Qué proyectos realizaste?", "Qué tecnologías usas?"],
  },

  "Qué proyectos realizaste?": {
    answer:
      "Tengo varios proyectos realizados, tanto para clientes Freelance como personales. Podes ver algunos de ellos sección de proyectos!",
    followup: ["Estás disponible para trabajar?"],
  },

  "Estás disponible para trabajar?": {
    answer:
      "Sí! Estoy buscando oportunidades como desarrollador junior. Podes contactarme a través del formulario de contacto o mis redes sociales.",
      followup: [""]
  },
};

let chatState = {
  isOpen: false,
  currentStep: "welcome",
  messagesCount: 0, // Inicializado correctamente
};

let chatButton, chatContainer, closeButton, chatMessages, questionsContainer;

// iniciar chatbot
function initChatbot() {
  chatButton = document.getElementById("chatbot-button");
  chatContainer = document.getElementById("chatbot-container");
  closeButton = document.getElementById("close-chat");
  chatMessages = document.getElementById("chat-messages");
  questionsContainer = document.getElementById("predefined-questions");

  chatButton.addEventListener("click", toggleChat);
  closeButton.addEventListener("click", closeChat);

  setTimeout(showToolTipHint, 3000);

  console.log("chatbot funcionando OK");
}

function toggleChat() {
  if (chatState.isOpen) {
    console.log("funcionando");
    closeChat();
  } else {
    openChat();
    console.log("funcionando openChat");
  }
}

function openChat() {
  chatState.isOpen = true;
  chatContainer.classList.remove("hidden");
  chatContainer.classList.add("visible");

  if (chatState.messagesCount === 0) {
    setTimeout(() => {
      showWelcomeMessage();
    }, 300);
  }

  console.log("Chat abierto");
}

function closeChat() {
  chatState.isOpen = false;
  chatContainer.classList.remove("visible");
  chatContainer.classList.add("hidden");

  console.log("chat cerrado");
}

function showWelcomeMessage() {
  const welcomeMessage =
    "Hola! 👋 Soy el asistente virtual de Nico 😁. Estoy aquí para responder cualquier pregunta que tengas sobre su experiencia como desarrollador. ¿Qué te gustaría saber?";

  addBotMessage(welcomeMessage);

  setTimeout(() => {
    showPredefinedQuestions();
  }, 1000);
}

function addBotMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", "bot"); // Corregido uso de messageDiv
  messageDiv.textContent = message; // Asegurarse de que el texto se asigna correctamente

  chatMessages.appendChild(messageDiv); // Añadir el mensaje al contenedor
  chatState.messagesCount++; // Incrementar el contador de mensajes

  scrollToBottom(); // Asegurarse de que el scroll se ajusta
}

function addUserMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", "user"); // Estilo para mensajes del usuario
  messageDiv.textContent = message;

  chatMessages.appendChild(messageDiv); // Añadir el mensaje al contenedor
  chatState.messagesCount++; // Incrementar el contador de mensajes

  scrollToBottom(); // Ajustar el scroll
}

function showPredefinedQuestions() {
  questionsContainer.innerHTML = "";

  Object.keys(botData).forEach((question) => {
    const questionButton = document.createElement("button");
    questionButton.classList.add("question-btn");
    questionButton.textContent = question;
    questionButton.addEventListener("click", () =>
      handleQuestionClick(question)
    );

    questionsContainer.appendChild(questionButton);
  });
}

function handleQuestionClick(question) {
  addUserMessage(question);

  questionsContainer.innerHTML = ""; // Corregido uso de innerHTML

  setTimeout(() => {
    const response = botData[question];
    addBotMessage(response.answer);

    if (response.followup && response.followup.length > 0) {
      setTimeout(() => {
        showFollowUpQuestions(response.followup);
      }, 1000);
    } else {
      setTimeout(() => {
        addBotMessage("Hay algo más que te gustaría saber?");
        showPredefinedQuestions();
      }, 1500);
    }
  }, 800);
}

function showFollowUpQuestions(followUpQuestions) {
  questionsContainer.innerHTML = "";

  followUpQuestions.forEach((question) => {
    if (botData[question]) {
      const questionButton = document.createElement("button");
      questionButton.classList.add("question-btn");
      questionButton.textContent = question;
      questionButton.addEventListener("click", () =>
        handleQuestionClick(question)
      );

      questionsContainer.appendChild(questionButton);
    }
  });

  const backButton = document.createElement("button");
  backButton.classList.add("question-btn");
  backButton.textContent = "🔙 Ver todas las preguntas";
  backButton.style.background = "black";
  backButton.addEventListener("click", () => {
    // Corregido evento
    addBotMessage("Perfecto! Acá tenés todas las preguntas disponibles:");
    showPredefinedQuestions(); // Corregido llamado a la función
  });

  questionsContainer.appendChild(backButton);
}

function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showToolTipHint() {
  const tooltip = chatButton.querySelector(".tooltip");
  if (tooltip && !chatState.isOpen) {
    tooltip.style.opacity = "1";
    setTimeout(() => {
      tooltip.style.opacity = "0";
    }, 3000);
  }
}

document.addEventListener("DOMContentLoaded", initChatbot);
