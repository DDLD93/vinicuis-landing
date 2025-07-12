'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

type ChatStep = 'default' | 'handoff_name' | 'handoff_email' | 'handoff_inquiry' | 'handoff_department' | 'handoff_confirm';

const departments = [
  'Security and Logistics',
  'Corporate Services & Information Management',
  'Legal Department',
  'Finance, Budget and Accounting',
  'Project Management Office',
  'Business Development',
  'Human Resources',
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to Vinicius International. How can I assist you today?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatStep, setChatStep] = useState<ChatStep>('default');
  const [handoffData, setHandoffData] = useState<{ name?: string; email?: string; inquiry?: string; department?: string }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Guided prompts
  const quickReplies = [
    { label: 'Ask about services', value: 'services' },
    { label: 'Contact a department', value: 'department' },
    { label: 'Talk to a staff member', value: 'staff' },
    { label: 'Contact info', value: 'contact' },
  ];

  const predefinedResponses: { [key: string]: string } = {
    'hello': 'Hello! Welcome to Vinicius International. How can I help you today?',
    'hi': 'Hi there! How can I assist you with our services?',
    'services': 'We offer comprehensive services including:\n\n🔒 Security & Solitary Solutions\n🏗️ Construction (Saiha Constructions)\n🛣️ Road Construction\n🔧 Rehabilitation Projects\n🏢 Mega Construction\n🚗 Automobile Services\n🛡️ Armored Vehicles\n💎 Luxury Vehicles\n👔 Executive Vehicles\n🔧 Customized Cars\n🚙 General Automobiles\n✈️ Private Aviation\n🚀 Emerging Ventures\n🌾 Agro-Trade (Richfood Essentials)\n💊 Pharmaceutical Development\n⚽ Football Academy\n\nWhich service interests you?',
    'security': 'Our Security & Solitary Solutions include armored vehicles, security equipment, and special-purpose vehicles. We work closely with government agencies.',
    'construction': 'Saiha Constructions has delivered 5 plazas, 200+ housing units, 100+ kilometers of roads, hospitals, and police stations. We have a full technical team ready for your project.',
    'automobile': 'Our automobile services include:\n• General automobiles\n• Armored vehicles\n• Luxury vehicles\n• Executive vehicles\n• Customized cars\n\nWe provide comprehensive automotive solutions for all needs.',
    'aviation': 'Our Private Aviation services include VIP transport, charter operations, and aviation logistics support for business and government transportation needs.',
    'agro-trade': 'Richfood Essentials specializes in international agricultural trade with $3+ million in annual exports, strict quality control, and large-scale warehousing facilities.',
    'pharmaceutical': 'Our Pharmaceutical Development division focuses on essential medicine production to support Nigeria\'s healthcare sector with state-of-the-art facilities.',
    'football': 'Our Football Academy develops young talent through professional coaching programs, modern facilities, and comprehensive youth development initiatives.',
    'contact': 'You can reach us at:\n📧 info@vinicius.com\n📞 +234 703 546 9259 | +234 803 234 6067\n📍 13B Shettima Mongonu Crescent, Utako, Abuja, Nigeria',
    'about': 'Vinicius International is a proudly Nigerian conglomerate with over $80 million in assets. We drive national progress across security, construction, agro-trade, and aviation sectors.',
    'price': 'For pricing information, please contact our sales team at info@vinicius.com or call +234 70x xxx xxxx. We provide customized quotes based on your specific requirements.',
    'location': 'Our headquarters is located at 13B Shettima Mongonu Crescent, Utako, Abuja, Nigeria. We also have facilities in Kaduna and Niger states.',
    'department': 'Which department would you like to contact? (e.g., Security and Logistics, Legal Department, etc.)',
    'staff': 'Sure! I can connect you with a staff member. May I have your name?',
    'default': 'Thank you for your question. For detailed information, please contact us at info@vinicius.com or call +234 70x xxx xxxx. Our team will be happy to assist you!'
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (message.includes(key)) {
        return response;
      }
    }
    return predefinedResponses.default;
  };

  // Staff handoff flow
  const handleStaffHandoff = (input: string) => {
    if (chatStep === 'handoff_name') {
      setHandoffData((prev) => ({ ...prev, name: input }));
      setChatStep('handoff_email');
      botSay('Thanks! What is your email address?');
    } else if (chatStep === 'handoff_email') {
      setHandoffData((prev) => ({ ...prev, email: input }));
      setChatStep('handoff_inquiry');
      botSay('Please briefly describe your inquiry.');
    } else if (chatStep === 'handoff_inquiry') {
      setHandoffData((prev) => ({ ...prev, inquiry: input }));
      setChatStep('handoff_department');
      botSay('Which department would you like to reach?');
    } else if (chatStep === 'handoff_department') {
      setHandoffData((prev) => ({ ...prev, department: input }));
      setChatStep('handoff_confirm');
      botSay('Thank you! Your inquiry has been submitted. A staff member from the selected department will contact you soon.');
    }
  };

  const botSay = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text,
          isBot: true,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Staff handoff flow
    if (chatStep.startsWith('handoff')) {
      handleStaffHandoff(userMessage.text);
      return;
    }

    // Staff handoff trigger
    if (userMessage.text.toLowerCase().includes('staff') || userMessage.text.toLowerCase().includes('talk to')) {
      setChatStep('handoff_name');
      botSay('Sure! I can connect you with a staff member. May I have your name?');
      return;
    }

    setIsTyping(true);
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(userMessage.text),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Quick reply handler
  const handleQuickReply = (value: string) => {
    setInputValue(value);
    setTimeout(() => handleSendMessage(), 100);
  };

  // Department selection for handoff
  const handleDepartmentSelect = (dept: string) => {
    setInputValue(dept);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        title="Open chat"
        className={`fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 h-[32rem] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col animate-slide-up">
          {/* Header */}
          <div className="bg-red-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span className="font-semibold">Vinicius Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              title="Close chat"
              className="hover:bg-red-700 p-1 rounded transition-colors duration-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-red-600 text-white'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.isBot && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    {!message.isBot && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 max-w-xs px-3 py-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {chatStep === 'default' && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {quickReplies.map((qr) => (
                <button
                  key={qr.value}
                  onClick={() => handleQuickReply(qr.value)}
                  title={qr.label}
                  className="bg-gray-100 hover:bg-red-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium transition"
                >
                  {qr.label}
                </button>
              ))}
            </div>
          )}

          {/* Department selection for handoff */}
          {chatStep === 'handoff_department' && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => handleDepartmentSelect(dept)}
                  title={dept}
                  className="bg-gray-100 hover:bg-red-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium transition"
                >
                  {dept}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          {chatStep !== 'handoff_confirm' && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-sm"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  title="Send message"
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors duration-200"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}