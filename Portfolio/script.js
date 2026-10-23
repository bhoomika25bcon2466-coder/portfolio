(function () {
  const yearEl = document.getElementById("year");
  const toggle = document.getElementById("theme-toggle");
  const navLinks = document.querySelectorAll(".site-nav a[href^='#']");
  const sections = document.querySelectorAll("main section[id]");
  const storageKey = "profile-theme";

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function applyTheme(theme) {
    const isDark = theme === "dark";
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    if (toggle) {
      toggle.setAttribute("aria-pressed", isDark ? "true" : "false");
      toggle.textContent = isDark ? "Light mode" : "Dark mode";
    }
  }

  const saved = localStorage.getItem(storageKey);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));

  if (toggle) {
    toggle.addEventListener("click", function () {
      const next =
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "light"
          : "dark";
      localStorage.setItem(storageKey, next);
      applyTheme(next);
    });
  }

  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }
          const id = entry.target.getAttribute("id");
          navLinks.forEach(function (link) {
            const isActive = link.getAttribute("href") === "#" + id;
            link.classList.toggle("is-active", isActive);
          });
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }
})();

// OpenWeather API Integration
const cityInput = document.getElementById("cityInput");
const weatherButton = document.getElementById("weatherButton");
const weatherResult = document.getElementById("weatherResult");

async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    weatherResult.textContent = "Please enter a city name.";
    return;
  }
  weatherResult.textContent = "Loading weather...";
  weatherButton.disabled = true;
  try {
    const weatherApiKey = "fdef5584feaa51e13c5f03ec50a69f16";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${weatherApiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      if (response.status === 404) throw new Error("City not found. Check the spelling.");
      if (response.status === 401) throw new Error("API key is invalid or not active yet.");
      if (response.status === 429) throw new Error("Too many requests. Please wait and retry.");
      throw new Error(`Weather service error (${response.status}).`);
    }
    weatherResult.textContent = `${data.name}: ${data.main.temp}°C, ${data.weather[0].description}. Humidity: ${data.main.humidity}%.`;
  } catch (error) {
    weatherResult.textContent = error instanceof TypeError
      ? "Network error. Check your internet connection."
      : error.message;
    console.error("Weather error:", error);
  } finally {
    weatherButton.disabled = false;
  }
}

if (weatherButton && cityInput) {
  weatherButton.addEventListener("click", getWeather);
  cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") getWeather();
  });
}

// Project Search and Filter Feature
const projectSearch = document.getElementById("projectSearch");
const projectsList = document.getElementById("projectsList");

if (projectSearch && projectsList) {
  const projectItems = projectsList.getElementsByTagName("li");

  projectSearch.addEventListener("input", function () {
    const searchTerm = projectSearch.value.toLowerCase().trim();

    Array.from(projectItems).forEach((item) => {
      const textContent = item.textContent.toLowerCase();
      const dataTags = item.getAttribute("data-tags") || "";

      if (textContent.includes(searchTerm) || dataTags.includes(searchTerm)) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  });
}

// Portfolio AI Chatbot Implementation
const chatInput = document.getElementById("chatInput");
const chatSendButton = document.getElementById("chatSendButton");
const chatMessages = document.getElementById("chatMessages");

async function handleChatSubmission() {
  const question = chatInput.value.trim();
  if (!question) return;

  appendMessage(question, "user-message");
  chatInput.value = "";
  chatSendButton.disabled = true;

  const loadingId = appendMessage("Thinking...", "bot-message loading");

  try {
    let responseText = "";
    const lowerQ = question.toLowerCase();

    if (lowerQ.includes("who are you") || lowerQ.includes("your name")) {
      responseText = "I am Bhoomika Thakwani, an undergraduate B.Tech CSE student in Computer Science and Engineering at JECRC University, Jaipur.";
    } else if (lowerQ.includes("skill") || lowerQ.includes("what can you do")) {
      responseText = "My core skills include Prompt Engineering, Data Analysis with Python, SQL, Power BI, Data Structures & Algorithms, Operating System Handling, and Database Management.";
    } else if (lowerQ.includes("project") || lowerQ.includes("completed")) {
      responseText = "I have completed 5 projects: Reading List App, Interactive Quiz Application, Python Bug Fixing with Cursor AI, Python Programs Collection, and Python Code Cleanup & Correction.";
    } else if (lowerQ.includes("python") || lowerQ.includes("program")) {
      responseText = "My Python programs collection includes factorial calculations, Fibonacci sequence generation, and structure-to-dictionary conversions executed using Google Colab.";
    } else if (lowerQ.includes("bug") || lowerQ.includes("corrected") || lowerQ.includes("buggy code")) {
      responseText = "In my Python Bug Fixing project with Cursor AI, logical errors in Python scripts were debugged and corrected, improving functional accuracy and execution reliability.";
    } else if (lowerQ.includes("reading list")) {
      responseText = "The Reading List App was developed using Bolt AI to help users organize, manage, and track their reading progress with a simple web interface.";
    } else if (lowerQ.includes("github") || lowerQ.includes("repo")) {
      responseText = "You can view my GitHub profile and repository code at: https://github.com/bhoomika25bcon2466-coder";
    } else {
      responseText = `Hello! As Bhoomika Thakwani, my portfolio focuses on B.Tech CSE coursework, Python, C++, and DSA. For "${question}", please explore my About section, Skills list, or search my Projects above!`;
    }

    removeMessage(loadingId);
    appendMessage(responseText, "bot-message");
  } catch (error) {
    removeMessage(loadingId);
    appendMessage("Error: Unable to connect to the chatbot service. Please check your network connection and try again.", "bot-message error");
    console.error("Chatbot API error:", error);
  } finally {
    chatSendButton.disabled = false;
  }
}

function appendMessage(text, className) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${className}`;
  msgDiv.textContent = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return msgDiv;
}

function removeMessage(msgElement) {
  if (msgElement && msgElement.parentNode) {
    msgElement.parentNode.removeChild(msgElement);
  }
}

if (chatSendButton && chatInput) {
  chatSendButton.addEventListener("click", handleChatSubmission);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleChatSubmission();
    }
  });
}