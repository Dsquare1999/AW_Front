import AOS from 'aos';
import 'aos/dist/aos.css';

const initAOS = () => {
  AOS.init({
    // Options de configuration d'AOS
    duration: 800, // Durée de l'animation en ms
    easing: 'ease-in-out', // Type d'interpolation pour les animations
    once: true, // L'animation ne se répète qu'une seule fois
  });
};

export default initAOS;