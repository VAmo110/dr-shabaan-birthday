<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ImageGallery from 'react-image-gallery';
import confetti from 'canvas-confetti';
import 'react-image-gallery/styles/css/image-gallery.css';
import './index.css';

const images = [
  { original: '/images/photo1.jpg', thumbnail: '/images/photo1.jpg' },
  { original: '/images/photo2.jpg', thumbnail: '/images/photo2.jpg' },
  { original: '/images/photo3.jpg', thumbnail: '/images/photo3.jpg' },
  { original: '/images/photo4.jpg', thumbnail: '/images/photo4.jpg' },
  { original: '/images/photo5.jpg', thumbnail: '/images/photo5.jpg' },
  { original: '/images/photo6.jpg', thumbnail: '/images/photo6.jpg' },
  { original: '/images/photo7.jpg', thumbnail: '/images/photo7.jpg' },
  { original: '/images/photo8.jpg', thumbnail: '/images/photo8.jpg' },
  { original: '/images/photo9.jpg', thumbnail: '/images/photo9.jpg' },
];

const Sparkles = () => {
  const sparkles = Array.from({ length: 20 }).map(() => ({
    id: Math.random(),
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute bg-purple-300 rounded-full"
          style={{
            width: sparkle.size,
            height: sparkle.size,
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        />
      ))}
    </div>
  );
};

const CountdownTimer = () => {
  const nextBirthday = new Date('2026-05-23');
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    const difference = nextBirthday - now;
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center text-white mt-8">
      <h3 className="text-2xl font-semibold">Until Dr. Shabaan's Next Birthday</h3>
      <div className="flex justify-center gap-4 mt-4 text-lg">
        <div>{timeLeft.days} Days</div>
        <div>{timeLeft.hours} Hours</div>
        <div>{timeLeft.minutes} Minutes</div>
        <div>{timeLeft.seconds} Seconds</div>
      </div>
    </div>
  );
};

const Guestbook = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const [answers, setAnswers] = useState({
    y01: '', y02: '', y03: '', y04: '', y05: '', y06: '', y07: '', y08: '', y09: '', y10: ''
  });
  const [result, setResult] = useState('');

  const correctAnswers = {
    y01: 0.9000,
    y02: 0.8187,
    y03: 0.7466,
    y04: 0.6835,
    y05: 0.6290,
    y06: 0.5828,
    y07: 0.5447,
    y08: 0.5146,
    y09: 0.4922,
    y10: 0.4775
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now(), text: newMessage }]);
      setNewMessage('');
    }
  };

  const handleCheck = () => {
    const tolerance = 0.1;
    let isCorrect = true;

    for (let key in answers) {
      if (answers[key] !== '') {
        const userValue = parseFloat(answers[key]);
        const correctValue = correctAnswers[key];
        if (Math.abs(userValue - correctValue) > tolerance) {
          isCorrect = false;
          break;
        }
      }
    }

    if (isCorrect) {
      setResult(
        '🎉 Congratulations! Dr.Shaaban! You solved the equation correctly ,Thank you for your effort and we wish you a happy birthday ! 🎉 ' 
      );
    } else {
      setResult('Sorry, the solution is incorrect. Please try again or consult Dr. Shabaan! 😊');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnswers({ ...answers, [name]: value });
  };

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <h2 className="text-3xl font-bold text-white text-center mb-6">Guestbook</h2>
      <div className="backdrop-blur-md bg-white/10 p-6 rounded-lg shadow-lg">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Leave a birthday message!"
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Submit
        </button>
        <div className="mt-6 space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              className="p-4 bg-white/10 rounded-lg text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {msg.text}
            </motion.div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold text-white text-center mb-4">Differential Equation Challenge for Dr. Shabaan</h3>
          <p className="text-white mb-4">
            Solve the differential equation dy/dt = -2y + t with y(0) = 1 from t = 0 to t = 1 using Runge-Kutta 4th order method with step h = 0.1. Enter the values of y at each t step (0.1, 0.2, ..., 1.0):
          </p>
          <div className="space-y-4">
            {Object.keys(answers).map((key) => (
              <div key={key}>
                <label className="block text-white">y({key.replace('y0', '')})</label>
                <input
                  type="number"
                  name={key}
                  value={answers[key]}
                  onChange={handleInputChange}
                  placeholder={`Enter y(${key.replace('y0', '')})`}
                  className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  step="0.0001"
                />
              </div>
            ))}
            <button
              onClick={handleCheck}
              className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Check
            </button>
            {result && <p className="mt-4 text-center text-white">{result}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  useEffect(() => {
    fireConfetti();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 text-white overflow-hidden">
      <Sparkles />
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Happy Birthday Dr. Shabaan Ibrahim 🎉
          </h1>
          <p className="text-2xl md:text-3xl text-purple-300">
            The best professor in the world – truly a legend!
          </p>
        </motion.div>

        <motion.div
          className="mt-12 max-w-lg mx-auto backdrop-blur-md bg-white/10 p-8 rounded-lg shadow-lg text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-xl text-purple-200">
            From your biggest fans – your students 💜
          </p>
          <button
            onClick={fireConfetti}
            className="mt-6 bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition"
          >
            Celebrate!
          </button>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h2 className="text-3xl font-bold text-center mb-6">Memories with Dr. Shabaan</h2>
          <div className="max-w-4xl mx-auto">
            <ImageGallery items={images} showThumbnails={true} showFullscreenButton={true} showPlayButton={false} />
          </div>
        </motion.div>

        <CountdownTimer />

        <Guestbook />
      </div>
    </div>
  );
};

export default App;
=======
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ImageGallery from 'react-image-gallery';
import confetti from 'canvas-confetti';
import 'react-image-gallery/styles/css/image-gallery.css';
import './index.css';

const images = [
  { original: '/images/photo1.jpg', thumbnail: '/images/photo1.jpg' },
  { original: '/images/photo2.jpg', thumbnail: '/images/photo2.jpg' },
  { original: '/images/photo3.jpg', thumbnail: '/images/photo3.jpg' },
  { original: '/images/photo4.jpg', thumbnail: '/images/photo4.jpg' },
  { original: '/images/photo5.jpg', thumbnail: '/images/photo5.jpg' },
  { original: '/images/photo6.jpg', thumbnail: '/images/photo6.jpg' },
  { original: '/images/photo7.jpg', thumbnail: '/images/photo7.jpg' },
  { original: '/images/photo8.jpg', thumbnail: '/images/photo8.jpg' },
  { original: '/images/photo9.jpg', thumbnail: '/images/photo9.jpg' },
];

const Sparkles = () => {
  const sparkles = Array.from({ length: 20 }).map(() => ({
    id: Math.random(),
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute bg-purple-300 rounded-full"
          style={{
            width: sparkle.size,
            height: sparkle.size,
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        />
      ))}
    </div>
  );
};

const CountdownTimer = () => {
  const nextBirthday = new Date('2026-05-23');
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    const difference = nextBirthday - now;
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center text-white mt-8">
      <h3 className="text-2xl font-semibold">Until Dr. Shabaan's Next Birthday</h3>
      <div className="flex justify-center gap-4 mt-4 text-lg">
        <div>{timeLeft.days} Days</div>
        <div>{timeLeft.hours} Hours</div>
        <div>{timeLeft.minutes} Minutes</div>
        <div>{timeLeft.seconds} Seconds</div>
      </div>
    </div>
  );
};

const Guestbook = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const [answers, setAnswers] = useState({
    y01: '', y02: '', y03: '', y04: '', y05: '', y06: '', y07: '', y08: '', y09: '', y10: ''
  });
  const [result, setResult] = useState('');

  const correctAnswers = {
    y01: 0.9000,
    y02: 0.8187,
    y03: 0.7466,
    y04: 0.6835,
    y05: 0.6290,
    y06: 0.5828,
    y07: 0.5447,
    y08: 0.5146,
    y09: 0.4922,
    y10: 0.4775
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now(), text: newMessage }]);
      setNewMessage('');
    }
  };

  const handleCheck = () => {
    const tolerance = 0.1;
    let isCorrect = true;

    for (let key in answers) {
      if (answers[key] !== '') {
        const userValue = parseFloat(answers[key]);
        const correctValue = correctAnswers[key];
        if (Math.abs(userValue - correctValue) > tolerance) {
          isCorrect = false;
          break;
        }
      }
    }

    if (isCorrect) {
      setResult(
        '🎉 Congratulations! Dr.Shaaban! You solved the equation correctly ,Thank you for your effort and we wish you a happy birthday ! 🎉 ' 
      );
    } else {
      setResult('Sorry, the solution is incorrect. Please try again or consult Dr. Shabaan! 😊');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnswers({ ...answers, [name]: value });
  };

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <h2 className="text-3xl font-bold text-white text-center mb-6">Guestbook</h2>
      <div className="backdrop-blur-md bg-white/10 p-6 rounded-lg shadow-lg">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Leave a birthday message!"
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Submit
        </button>
        <div className="mt-6 space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              className="p-4 bg-white/10 rounded-lg text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {msg.text}
            </motion.div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold text-white text-center mb-4">Differential Equation Challenge for Dr. Shabaan</h3>
          <p className="text-white mb-4">
            Solve the differential equation dy/dt = -2y + t with y(0) = 1 from t = 0 to t = 1 using Runge-Kutta 4th order method with step h = 0.1. Enter the values of y at each t step (0.1, 0.2, ..., 1.0):
          </p>
          <div className="space-y-4">
            {Object.keys(answers).map((key) => (
              <div key={key}>
                <label className="block text-white">y({key.replace('y0', '')})</label>
                <input
                  type="number"
                  name={key}
                  value={answers[key]}
                  onChange={handleInputChange}
                  placeholder={`Enter y(${key.replace('y0', '')})`}
                  className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  step="0.0001"
                />
              </div>
            ))}
            <button
              onClick={handleCheck}
              className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Check
            </button>
            {result && <p className="mt-4 text-center text-white">{result}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  useEffect(() => {
    fireConfetti();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 text-white overflow-hidden">
      <Sparkles />
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Happy Birthday Dr. Shabaan Ibrahim 🎉
          </h1>
          <p className="text-2xl md:text-3xl text-purple-300">
            The best professor in the world – truly a legend!
          </p>
        </motion.div>

        <motion.div
          className="mt-12 max-w-lg mx-auto backdrop-blur-md bg-white/10 p-8 rounded-lg shadow-lg text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-xl text-purple-200">
            From your biggest fans – your students 💜
          </p>
          <button
            onClick={fireConfetti}
            className="mt-6 bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition"
          >
            Celebrate!
          </button>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h2 className="text-3xl font-bold text-center mb-6">Memories with Dr. Shabaan</h2>
          <div className="max-w-4xl mx-auto">
            <ImageGallery items={images} showThumbnails={true} showFullscreenButton={true} showPlayButton={false} />
          </div>
        </motion.div>

        <CountdownTimer />

        <Guestbook />
      </div>
    </div>
  );
};

export default App;
>>>>>>> 5327f6b3b6e8b57f65826a88d674e934c60c91b5
