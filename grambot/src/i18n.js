import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          heading: "GramBot",
          subheading: "Your Voice. Your Village. Your Assistant.",
          schemes: "Government Schemes",
          services: "Government Services",
          prices: "Market Prices",
          askQuery1: "Ask your queries about available government schemes.",
          askQuery2: "Ask your queries about available government services.",
          submit: "Submit",
          back: "⬅ Back to Home",
          chatbotResponse: "Chatbot Response:",
            voiceAlert: "Voice recording feature coming soon!",
            ttsNotSupported: "Sorry, your browser does not support text-to-speech.",
            typeQuestion: "Type your question...",
            recordVoice: "Record your voice🎤",
            playVoice:"Play Voice🔊"

        }
      },
      hi: {
        translation: {
          heading: "ग्रामबॉट",
          subheading: "आपकी आवाज़. आपका गाँव. आपका सहायक.",
          schemes: "सरकारी योजनाएं",
          services: "सरकारी सेवाएं",
          prices: "बाज़ार मूल्य",
          askQuery1: "उपलब्ध सरकारी योजनाओं के बारे में अपने प्रश्न पूछें।",
        askQuery2: "उपलब्ध सरकारी सेवाएं के बारे में अपने प्रश्न पूछें।",
          submit: "प्रस्तुत करें",
          back: "⬅ मुख्य पृष्ठ पर जाएं",
          chatbotResponse: "चैटबॉट प्रतिक्रिया:",
            voiceAlert: "वॉयस रिकॉर्डिंग सुविधा जल्द ही आ रही है!",
ttsNotSupported: "माफ़ कीजिए, आपका ब्राउज़र टेक्स्ट-टू-स्पीच का समर्थन नहीं करता है।",
typeQuestion: "अपना प्रश्न टाइप करें...",
recordVoice: "अपनी आवाज़ रिकॉर्ड करें🎤",
playVoice:"आवाज़ चलायें🔊"
        }
      },
      kn: {
        translation: {
  heading: "ಗ್ರಾಮ್‌ಬಾಟ್",
  subheading: "ನಿಮ್ಮ ಧ್ವನಿ. ನಿಮ್ಮ ಗ್ರಾಮ. ನಿಮ್ಮ ಸಹಾಯಕ.",
  schemes: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
  services: "ಸರ್ಕಾರಿ ಸೇವೆಗಳು",
  prices: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು",
  askQuery1: "ಲಭ್ಯವಿರುವ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ.",
  askQuery2: "ಲಭ್ಯವಿರುವ ಸರ್ಕಾರಿ ಸೇವೆಗಳ ಬಗ್ಗೆ ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ.",
  submit: "ಸಲ್ಲಿಸು",
  back: "⬅ ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
  chatbotResponse: "ಚಾಟ್‌ಬಾಟ್ ಪ್ರತಿಕ್ರಿಯೆ:",
  voiceAlert: "ಧ್ವನಿ ದಾಖಲೆ ವೈಶಿಷ್ಟ್ಯವು ಶೀಘ್ರದಲ್ಲೇ ಬರುತ್ತಿದೆ!",
  ttsNotSupported: "ಕ್ಷಮಿಸಿ, ನಿಮ್ಮ ಬ್ರೌಸರ್ ಪಠ್ಯದಿಂದ ಧ್ವನಿಗೆ ಬೆಂಬಲ ನೀಡುವುದಿಲ್ಲ.",
  typeQuestion: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ನಮೂದಿಸಿ...",
  recordVoice: "ಧ್ವನಿಯನ್ನು ದಾಖಲಿಸಿ🎤",
  playVoice:"ಧ್ವನಿ ಪ್ಲೇ ಮಾಡಿ🔊"
}
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
