// Code snippets for different programming languages
const codeSnippets = {
    javascript: [
        {
            title: "Array Methods",
            code: `const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
const evenNumbers = numbers.filter(num => num % 2 === 0);`
        },
        {
            title: "Async Function",
            code: `async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}`
        },
        {
            title: "Class Definition",
            code: `class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    getInfo() {
        return \`\${this.name} (\${this.email})\`;
    }

    static createAdmin(name) {
        return new User(name, \`\${name.toLowerCase()}@admin.com\`);
    }
}`
        },
        {
            title: "Promise Chain",
            code: `function processUserData(userId) {
    return fetchUser(userId)
        .then(user => validateUser(user))
        .then(user => updateUserStatus(user))
        .then(user => saveUserData(user))
        .catch(error => handleError(error));
}`
        }
    ],
    python: [
        {
            title: "List Comprehension",
            code: `numbers = [1, 2, 3, 4, 5]
squares = [num ** 2 for num in numbers]
even_numbers = [num for num in numbers if num % 2 == 0]`
        },
        {
            title: "Class Definition",
            code: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hello, my name is {self.name} and I am {self.age} years old."`
        },
        {
            title: "Decorator Pattern",
            code: `def timer_decorator(func):
    def wrapper(*args, **kwargs):
        import time
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"Function {func.__name__} took {end - start} seconds")
        return result
    return wrapper

@timer_decorator
def slow_function():
    import time
    time.sleep(1)
    return "Done!"`
        },
        {
            title: "Context Manager",
            code: `class DatabaseConnection:
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.connection = None

    def __enter__(self):
        self.connection = connect(self.host, self.port)
        return self.connection

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.connection:
            self.connection.close()`
        }
    ],
    java: [
        {
            title: "Class with Interface",
            code: `public class Calculator implements MathOperations {
    @Override
    public double add(double a, double b) {
        return a + b;
    }

    @Override
    public double subtract(double a, double b) {
        return a - b;
    }

    @Override
    public double multiply(double a, double b) {
        return a * b;
    }
}`
        },
        {
            title: "Exception Handling",
            code: `public class FileProcessor {
    public void processFile(String filename) {
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = reader.readLine()) != null) {
                processLine(line);
            }
        } catch (IOException e) {
            logger.error("Error processing file: " + e.getMessage());
            throw new ProcessingException("Failed to process file", e);
        }
    }
}`
        },
        {
            title: "Lambda Expressions",
            code: `List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
names.stream()
    .filter(name -> name.length() > 4)
    .map(String::toUpperCase)
    .forEach(System.out::println);`
        }
    ],
    cpp: [
        {
            title: "Template Class",
            code: `template<typename T>
class Stack {
private:
    std::vector<T> elements;
public:
    void push(T const& element) {
        elements.push_back(element);
    }
    
    T pop() {
        if (elements.empty()) {
            throw std::out_of_range("Stack is empty");
        }
        T element = elements.back();
        elements.pop_back();
        return element;
    }
};`
        },
        {
            title: "Smart Pointers",
            code: `class Resource {
public:
    Resource() { std::cout << "Resource acquired\n"; }
    ~Resource() { std::cout << "Resource released\n"; }
};

void processResource() {
    std::unique_ptr<Resource> ptr = std::make_unique<Resource>();
    // Resource will be automatically released when ptr goes out of scope
}`
        },
        {
            title: "Move Semantics",
            code: `class String {
private:
    char* data;
    size_t size;
public:
    // Move constructor
    String(String&& other) noexcept 
        : data(other.data), size(other.size) {
        other.data = nullptr;
        other.size = 0;
    }
    
    // Move assignment operator
    String& operator=(String&& other) noexcept {
        if (this != &other) {
            delete[] data;
            data = other.data;
            size = other.size;
            other.data = nullptr;
            other.size = 0;
        }
        return *this;
    }
};`
        }
    ]
};

// Challenge management
class ChallengeManager {
    constructor() {
        this.currentChallenge = null;
        this.startTime = null;
        this.expectedText = '';
        this.userText = '';
    }

    startChallenge(language, difficulty = 'easy') {
        const snippets = codeSnippets[language];
        if (!snippets) return null;

        const randomSnippet = snippets[Math.floor(Math.random() * snippets.length)];
        this.currentChallenge = {
            language,
            title: randomSnippet.title,
            code: randomSnippet.code
        };
        this.expectedText = randomSnippet.code;
        this.startTime = Date.now();
        return this.currentChallenge;
    }

    checkProgress(userInput) {
        this.userText = userInput;
        const accuracy = this.calculateAccuracy();
        const wpm = this.calculateWPM();
        return { accuracy, wpm };
    }

    calculateAccuracy() {
        let correct = 0;
        const minLength = Math.min(this.expectedText.length, this.userText.length);
        
        for (let i = 0; i < minLength; i++) {
            if (this.expectedText[i] === this.userText[i]) {
                correct++;
            }
        }
        
        return (correct / this.expectedText.length) * 100;
    }

    calculateWPM() {
        const timeElapsed = (Date.now() - this.startTime) / 1000 / 60; // in minutes
        const words = this.userText.length / 5; // assuming 5 characters per word
        return Math.round(words / timeElapsed);
    }
}

// Leaderboard management
class LeaderboardManager {
    constructor() {
        this.leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || {};
    }

    addScore(username, language, score, wpm, accuracy) {
        if (!this.leaderboard[language]) {
            this.leaderboard[language] = [];
        }

        this.leaderboard[language].push({
            username,
            score,
            wpm,
            accuracy,
            timestamp: Date.now()
        });

        // Sort by score and keep top 10
        this.leaderboard[language].sort((a, b) => b.score - a.score);
        this.leaderboard[language] = this.leaderboard[language].slice(0, 10);

        localStorage.setItem('leaderboard', JSON.stringify(this.leaderboard));
    }

    getLeaderboard(language) {
        return this.leaderboard[language] || [];
    }
}

// AI Code Generation (placeholder for API integration)
class AICodeGenerator {
    async generateSnippet(language, difficulty) {
        // This would be replaced with actual API calls to an AI service
        return {
            title: "AI Generated Snippet",
            code: `// AI generated code would go here
// This is a placeholder for the actual AI integration`
        };
    }
}

// Initialize managers
const challengeManager = new ChallengeManager();
const leaderboardManager = new LeaderboardManager();
const aiGenerator = new AICodeGenerator();

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const uploadBtn = document.getElementById('upload-btn');
    const generateBtn = document.getElementById('generate-btn');
    const languageSelect = document.getElementById('language-select');

    startBtn.addEventListener('click', () => {
        const language = languageSelect.value;
        const challenge = challengeManager.startChallenge(language);
        if (challenge) {
            editor.setValue(challenge.code);
            editor.updateOptions({ readOnly: true });
        }
    });

    resetBtn.addEventListener('click', () => {
        editor.setValue('');
        editor.updateOptions({ readOnly: false });
        challengeManager.startTime = null;
    });

    uploadBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.js,.py,.java,.cpp';
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                editor.setValue(event.target.result);
            };
            reader.readAsText(file);
        };
        input.click();
    });

    generateBtn.addEventListener('click', async () => {
        const language = languageSelect.value;
        const snippet = await aiGenerator.generateSnippet(language, 'medium');
        editor.setValue(snippet.code);
    });
});

// --- Detailed Metrics Addon ---
const allKeys = 'ENIARLTOSUDYCGHPMKBWFVZXQJ'.split('');
let keyStats = {};
allKeys.forEach(k => keyStats[k] = {correct: 0, wrong: 0, lastSpeed: 0, topSpeed: 0});
let lastWpm = 0, lastAccuracy = 100, lastScore = 0;
let topSpeed = 0;
let learningRate = 0.1; // Example static value
let accuracyStreak = 0;
let minutesPracticed = 0, goalMinutes = 30;
let lastTypedKey = '';

function updateKeyProgress(currentKey) {
    const container = document.getElementById('key-progress');
    if (!container) return;
    container.innerHTML = '';
    allKeys.forEach(k => {
        let cls = 'key-box';
        if (k === currentKey) cls += ' key-current';
        else if (keyStats[k].correct > 0) cls += ' key-correct';
        else if (keyStats[k].wrong > 0) cls += ' key-wrong';
        container.innerHTML += `<span class="${cls}">${k}</span>`;
    });
    document.getElementById('current-key').textContent = currentKey || '';
}

function updateDelta(id, value) {
    const el = document.getElementById(id);
    if (!el) return;
    if (value > 0) {
        el.textContent = `(+${value.toFixed(1)})`;
        el.className = 'positive';
    } else if (value < 0) {
        el.textContent = `(${value.toFixed(1)})`;
        el.className = 'negative';
    } else {
        el.textContent = '';
        el.className = '';
    }
}

function updateDailyGoal(minutesPracticed, goalMinutes) {
    document.getElementById('daily-goal').textContent = `${Math.round((minutesPracticed/goalMinutes)*100)}%/${goalMinutes} minutes`;
    document.getElementById('goal-progress').style.width = `${Math.min(100, (minutesPracticed/goalMinutes)*100)}%`;
}

function updateDetailedMetrics(wpm, accuracy, score, currentKey) {
    updateDelta('wpm-delta', wpm - lastWpm);
    updateDelta('accuracy-delta', accuracy - lastAccuracy);
    updateDelta('score-delta', score - lastScore);
    document.getElementById('last-speed').textContent = lastWpm.toFixed(1) + 'wpm';
    document.getElementById('top-speed').textContent = topSpeed.toFixed(1) + 'wpm';
    document.getElementById('learning-rate').textContent = `+${learningRate.toFixed(1)}wpm/lesson`;
    document.getElementById('accuracy-streak').textContent = accuracyStreak > 0 ? `${accuracyStreak} correct` : 'No accuracy streaks.';
    updateKeyProgress(currentKey);
    updateDailyGoal(minutesPracticed, goalMinutes);
    lastWpm = wpm;
    lastAccuracy = accuracy;
    lastScore = score;
}

// --- Integrate with typing events ---
document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
    let score = 0;
    let challengeActive = false;
    let challengeStartTime = null;
    let challengeInterval = null;
    let expectedText = '';
    let userInput = '';
    let correctKeystrokes = 0;
    let totalKeystrokes = 0;
    let currentKey = '';

    // Monaco editor integration
    require(['vs/editor/editor.main'], function() {
        // ... existing Monaco code ...
        // Add event listener for typing
        editor.onKeyDown(e => {
            if (!challengeActive) return;
            const key = e.browserEvent.key.toUpperCase();
            if (allKeys.includes(key)) {
                lastTypedKey = key;
                // Check if correct
                const pos = editor.getPosition();
                const model = editor.getModel();
                const idx = model.getOffsetAt(pos) - 1;
                if (expectedText[idx] && expectedText[idx].toUpperCase() === key) {
                    keyStats[key].correct++;
                    accuracyStreak++;
                    correctKeystrokes++;
                } else {
                    keyStats[key].wrong++;
                    accuracyStreak = 0;
                }
                totalKeystrokes++;
                // Update per-key speed
                const now = Date.now();
                const elapsed = (now - challengeStartTime) / 1000 / 60;
                const wpm = (totalKeystrokes / 5) / (elapsed || 1/60);
                keyStats[key].lastSpeed = wpm;
                if (wpm > keyStats[key].topSpeed) keyStats[key].topSpeed = wpm;
                if (wpm > topSpeed) topSpeed = wpm;
                // Update metrics
                const accuracy = (correctKeystrokes / totalKeystrokes) * 100 || 100;
                score = Math.round(correctKeystrokes * accuracy / 100);
                updateDetailedMetrics(wpm, accuracy, score, key);
            }
        });

        // Start challenge logic
        document.getElementById('start-btn').addEventListener('click', () => {
            const language = document.getElementById('language-select').value;
            const challenge = challengeManager.startChallenge(language);
            if (challenge) {
                editor.setValue(challenge.code);
                editor.updateOptions({ readOnly: false });
                expectedText = challenge.code;
                userInput = '';
                correctKeystrokes = 0;
                totalKeystrokes = 0;
                accuracyStreak = 0;
                challengeActive = true;
                challengeStartTime = Date.now();
                minutesPracticed = 0;
                topSpeed = 0;
                // Reset key stats
                allKeys.forEach(k => keyStats[k] = {correct: 0, wrong: 0, lastSpeed: 0, topSpeed: 0});
                updateDetailedMetrics(0, 100, 0, '');
                if (challengeInterval) clearInterval(challengeInterval);
                challengeInterval = setInterval(() => {
                    if (!challengeActive) return;
                    const now = Date.now();
                    minutesPracticed = (now - challengeStartTime) / 1000 / 60;
                    // Update metrics every second
                    const wpm = (totalKeystrokes / 5) / (minutesPracticed || 1/60);
                    const accuracy = (correctKeystrokes / totalKeystrokes) * 100 || 100;
                    score = Math.round(correctKeystrokes * accuracy / 100);
                    updateDetailedMetrics(wpm, accuracy, score, lastTypedKey);
                }, 1000);
            }
        });

        document.getElementById('reset-btn').addEventListener('click', () => {
            editor.setValue('');
            challengeActive = false;
            if (challengeInterval) clearInterval(challengeInterval);
            updateDetailedMetrics(0, 100, 0, '');
        });
    });
}); 
