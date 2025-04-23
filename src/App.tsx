import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Lock, BookOpen, ArrowRight, Shield as ShieldIcon, Building2, Banknote, Bell, Users, MessageSquare, Target, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingNav } from './components/ui/floating-navbar';
import GridBackgroundDemo from './components/ui/grid-background-demo';

interface RiskCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  impact: string;
  scenario?: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    hints?: string[];
  }[];
}

const riskCards: RiskCard[] = [
  {
    id: 'operational',
    title: 'Operational Disruption',
    description: 'Manage security operations during system outages and service disruptions',
    icon: <Building2 className="h-12 w-12 text-red-500" />,
    impact: 'Security Operations and Incident Response',
    scenario: 'As Security Operations Center (SOC) Lead, you discover that ransomware has encrypted critical security monitoring systems, incident response tools, and security logs. The attack has halted all security operations, affecting threat detection and incident response capabilities. You must quickly address the disruption while maintaining security posture and service continuity.',
    questions: [
      {
        question: 'What should be your first priority when security operations are disrupted?',
        options: [
          'Continue normal security monitoring',
          'Assess impact on active security incidents and critical systems',
          'Contact all stakeholders immediately',
          'Start system restoration'
        ],
        correctAnswer: 1,
        explanation: 'Assessing impact on active security incidents helps prioritize critical security obligations while understanding the scope of disruption.',
        hints: [
          'Consider security obligations',
          'Think about system impact'
        ]
      },
      {
        question: 'How should you prioritize security operations recovery?',
        options: [
          'Recover all systems simultaneously',
          'Start with non-critical security tools',
          'Prioritize based on security incident severity and system criticality',
          'Wait for complete investigation'
        ],
        correctAnswer: 2,
        explanation: 'Prioritizing based on security incident severity ensures critical security obligations are met first.',
        hints: [
          'Consider incident severity',
          'Think about system criticality'
        ]
      },
      {
        question: 'What communication channels should be used during the incident?',
        options: [
          'Regular email system',
          'Public announcement system',
          'Secure incident response communication channels',
          'Social media platforms'
        ],
        correctAnswer: 2,
        explanation: 'Secure incident response communication channels ensure confidentiality while maintaining necessary communications.',
        hints: [
          'Consider security protocols',
          'Think about confidentiality requirements'
        ]
      },
      {
        question: 'How should access to security systems be managed during the incident?',
        options: [
          'Maintain all access levels',
          'Revoke all access',
          'Implement strict access controls with monitoring',
          'Delegate access decisions'
        ],
        correctAnswer: 2,
        explanation: 'Strict access controls with monitoring help maintain security while enabling necessary incident response work.',
        hints: [
          'Consider security requirements',
          'Think about incident response needs'
        ]
      },
      {
        question: 'What documentation should be maintained for security purposes?',
        options: [
          'Only final resolution steps',
          'No documentation needed',
          'Comprehensive incident timeline and security impact assessment',
          'Only system logs'
        ],
        correctAnswer: 2,
        explanation: 'Comprehensive documentation helps track the incident and may be required for security investigations.',
        hints: [
          'Consider security requirements',
          'Think about incident investigation'
        ]
      }
    ]
  },
  {
    id: 'ransom',
    title: 'Ransom Pay',
    description: 'Handle ransom demands and security considerations',
    icon: <Banknote className="h-12 w-12 text-yellow-500" />,
    impact: 'Security Implications and Data Protection',
    scenario: 'The attackers have demanded a significant ransom payment in cryptocurrency to provide decryption keys for sensitive security data and system information. You must evaluate the ransom demand while considering security posture, system integrity, and regulatory requirements.',
    questions: [
      {
        question: 'What is your first step in evaluating the ransom demand?',
        options: [
          'Calculate payment amount',
          'Assess security obligations and regulatory requirements',
          'Prepare cryptocurrency wallet',
          'Contact attackers immediately'
        ],
        correctAnswer: 1,
        explanation: 'Assessing security obligations helps determine appropriate response while maintaining compliance.',
        hints: [
          'Consider regulatory requirements',
          'Think about security obligations'
        ]
      },
      {
        question: 'How should you document ransom-related decisions?',
        options: [
          'Screenshot ransom note only',
          'Ignore documentation',
          'Maintain comprehensive security decision records',
          'Only record payment details'
        ],
        correctAnswer: 2,
        explanation: 'Complete documentation protects the organization and may be required for security investigations.',
        hints: [
          'Consider security requirements',
          'Think about potential investigations'
        ]
      },
      {
        question: 'What factors should NOT primarily influence payment decision?',
        options: [
          'Security obligations',
          'Regulatory requirements',
          'Ransom amount alone',
          'System impact'
        ],
        correctAnswer: 2,
        explanation: 'The ransom amount alone should not drive the decision; consider all security and regulatory factors.',
        hints: [
          'Consider multiple factors',
          'Think about security implications'
        ]
      },
      {
        question: 'What security preparations are needed before any payment decision?',
        options: [
          'Just cryptocurrency setup',
          'Complete security and regulatory assessment',
          'Draft public statement',
          'Budget allocation only'
        ],
        correctAnswer: 1,
        explanation: 'A thorough security assessment helps make an informed payment decision.',
        hints: [
          'Consider regulatory requirements',
          'Think about security obligations'
        ]
      },
      {
        question: 'How should negotiations be handled?',
        options: [
          'Accept first demand',
          'Ignore all demands',
          'Follow established security procedures',
          'Make counter-offers'
        ],
        correctAnswer: 2,
        explanation: 'Following security procedures ensures compliance with regulations and protects system integrity.',
        hints: [
          'Consider security protocols',
          'Think about regulatory requirements'
        ]
      }
    ]
  },
  {
    id: 'financial',
    title: 'Financial Loss',
    description: 'Assessment and management of security costs and liabilities',
    icon: <AlertTriangle className="h-12 w-12 text-orange-500" />,
    impact: 'Security Costs and Liability Management',
    scenario: 'The ransomware incident has caused significant financial impact through security operations downtime, potential system damage, and regulatory penalties. You need to assess and manage these financial implications while maintaining security posture and system integrity.',
    questions: [
      {
        question: 'How should you assess the financial impact?',
        options: [
          'Only direct costs',
          'Wait until resolution',
          'Comprehensive security and financial analysis',
          'Basic damage estimate'
        ],
        correctAnswer: 2,
        explanation: 'A comprehensive analysis helps understand full financial and security implications.',
        hints: [
          'Consider all cost types',
          'Think about potential liabilities'
        ]
      },
      {
        question: 'What should be included in cost assessment?',
        options: [
          'Only system repairs',
          'Just overtime costs',
          'All direct costs, potential damages, and regulatory penalties',
          'Hardware costs only'
        ],
        correctAnswer: 2,
        explanation: 'Including all potential costs ensures accurate impact assessment.',
        hints: [
          'Consider potential damages',
          'Think about regulatory penalties'
        ]
      },
      {
        question: 'How should recovery spending be prioritized?',
        options: [
          'Lowest cost options',
          'Most expensive solutions',
          'Based on security obligations and system impact',
          'Equal distribution'
        ],
        correctAnswer: 2,
        explanation: 'Prioritizing based on security obligations ensures compliance and system protection.',
        hints: [
          'Consider security requirements',
          'Think about system impact'
        ]
      },
      {
        question: 'What financial documentation is crucial for security purposes?',
        options: [
          'Only invoices',
          'Just payment records',
          'Comprehensive financial impact and security cost documentation',
          'Basic expense tracking'
        ],
        correctAnswer: 2,
        explanation: 'Complete documentation helps track costs and may be required for security investigations.',
        hints: [
          'Consider security requirements',
          'Think about potential investigations'
        ]
      },
      {
        question: 'How should potential system damages be handled?',
        options: [
          'Ignore until formal assessment',
          'Proactively assess and document',
          'Wait for system complaints',
          'Assume no damages will occur'
        ],
        correctAnswer: 1,
        explanation: 'Proactive assessment helps prepare for potential damages and protect the organization.',
        hints: [
          'Consider system impact',
          'Think about security protection'
        ]
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical Recovery',
    description: 'System restoration and data recovery procedures',
    icon: <AlertTriangle className="h-12 w-12 text-orange-500" />,
    impact: 'System Restoration and Data Integrity',
    scenario: 'As Security Operations Lead, you must coordinate the technical recovery of affected security systems while ensuring data integrity and preventing re-infection. The recovery process must be carefully planned and executed to minimize security disruption and maintain system integrity.',
    questions: [
      {
        question: 'How should you approach system recovery?',
        options: [
          'Restore from the most recent backup',
          'Wait until the incident is over',
          'Follow a structured security recovery plan with validation steps',
          'Focus only on critical systems'
        ],
        correctAnswer: 2,
        explanation: 'A structured security recovery plan ensures systematic and validated restoration.',
        hints: [
          'Think about recovery procedures',
          'Consider validation requirements'
        ]
      },
      {
        question: 'What should be included in the technical recovery plan?',
        options: [
          'Only system restoration steps',
          'Just data recovery procedures',
          'Comprehensive security recovery procedures with validation and testing',
          'Only security updates'
        ],
        correctAnswer: 2,
        explanation: 'A complete security recovery plan ensures all aspects of system restoration are covered.',
        hints: [
          'Consider all recovery aspects',
          'Think about validation steps'
        ]
      },
      {
        question: 'How should you handle system monitoring during recovery?',
        options: [
          'Disable monitoring',
          'Continue normal monitoring',
          'Implement enhanced security monitoring with alerts',
          'Reduce monitoring to save resources'
        ],
        correctAnswer: 2,
        explanation: 'Enhanced security monitoring helps detect any issues during recovery.',
        hints: [
          'Consider system stability',
          'Think about early warning systems'
        ]
      },
      {
        question: 'What security measures should be implemented during recovery?',
        options: [
          'Only basic security',
          'Just network segmentation',
          'Comprehensive security controls and monitoring',
          'None until recovery is complete'
        ],
        correctAnswer: 2,
        explanation: 'Multiple security measures help prevent re-infection during recovery.',
        hints: [
          'Think about layered security',
          'Consider protection mechanisms'
        ]
      },
      {
        question: 'How should you communicate technical status to stakeholders?',
        options: [
          'Provide only positive information',
          'Share complete security status with recovery progress',
          'Delay communication until full recovery',
          'Delegate to the IT team'
        ],
        correctAnswer: 1,
        explanation: 'Sharing complete security status helps stakeholders understand the recovery progress.',
        hints: [
          'Consider stakeholder needs',
          'Think about transparency'
        ]
      }
    ]
  },
  {
    id: 'reputation',
    title: 'Reputation Damage',
    description: 'Manage security reputation and stakeholder trust',
    icon: <Users className="h-12 w-12 text-blue-500" />,
    impact: 'Stakeholder Trust and Security Standing',
    scenario: "The ransomware attack has compromised sensitive security information and disrupted security services. News of the incident is spreading, potentially damaging the security team's reputation and stakeholder trust. You must manage the situation while protecting system integrity and maintaining security posture.",
    questions: [
      {
        question: 'What should be your first communication priority?',
        options: [
          'Public statement to media',
          'Direct communication with affected stakeholders',
          'Internal staff announcement',
          'Social media update'
        ],
        correctAnswer: 1,
        explanation: 'Direct stakeholder communication maintains trust and fulfills security obligations.',
        hints: [
          'Consider stakeholder obligations',
          'Think about confidentiality'
        ]
      },
      {
        question: 'How should stakeholder concerns be addressed?',
        options: [
          'Generic responses',
          'Individual case-by-case assessment',
          'Standard template',
          'Defer to management'
        ],
        correctAnswer: 1,
        explanation: "Individual assessment ensures proper handling of each stakeholder's situation.",
        hints: [
          'Consider stakeholder impact',
          'Think about security obligations'
        ]
      },
      {
        question: 'What information should be included in stakeholder communications?',
        options: [
          'Full technical details',
          'Only necessary security information',
          'Complete incident report',
          'No information'
        ],
        correctAnswer: 1,
        explanation: 'Providing necessary security information maintains transparency while protecting interests.',
        hints: [
          'Consider security requirements',
          'Think about stakeholder needs'
        ]
      },
      {
        question: 'How should media inquiries be handled?',
        options: [
          'Full disclosure',
          'No comment',
          'Through security communications team',
          'Direct responses'
        ],
        correctAnswer: 2,
        explanation: 'Security communications team ensures consistent and appropriate messaging.',
        hints: [
          'Consider security implications',
          'Think about stakeholder confidentiality'
        ]
      },
      {
        question: 'What reputation recovery steps are most important?',
        options: [
          'Security campaign',
          'Demonstrating security compliance and system protection',
          'Price reductions',
          'Staff changes'
        ],
        correctAnswer: 1,
        explanation: 'Demonstrating compliance and protection rebuilds trust effectively.',
        hints: [
          'Consider security obligations',
          'Think about stakeholder trust'
        ]
      }
    ]
  },
  {
    id: 'regulatory',
    title: 'Regulatory Compliance',
    description: 'Ensure compliance with security and regulatory requirements',
    icon: <Shield className="h-12 w-12 text-green-500" />,
    impact: 'Security Compliance and Reporting',
    scenario: 'The ransomware attack has potentially compromised security data and affected security operations. You must ensure compliance with security regulations, reporting requirements, and system protection obligations while managing the incident.',
    questions: [
      {
        question: 'What is your first regulatory compliance step?',
        options: [
          'Wait for regulator inquiry',
          'Assess regulatory reporting requirements',
          'Contact all regulators',
          'Internal review only'
        ],
        correctAnswer: 1,
        explanation: 'Assessing requirements ensures timely and appropriate regulatory compliance.',
        hints: [
          'Consider reporting deadlines',
          'Think about regulatory obligations'
        ]
      },
      {
        question: 'How should regulatory documentation be prepared?',
        options: [
          'Basic summary',
          'Comprehensive security and technical documentation',
          'Informal notes',
          'Verbal report'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive documentation ensures proper regulatory compliance.',
        hints: [
          'Consider security requirements',
          'Think about documentation standards'
        ]
      },
      {
        question: 'What regulatory notifications are required?',
        options: [
          'All possible regulators',
          'Only mandatory notifications',
          'No notifications',
          'Selected regulators'
        ],
        correctAnswer: 1,
        explanation: 'Focusing on mandatory notifications ensures proper compliance.',
        hints: [
          'Consider security requirements',
          'Think about notification obligations'
        ]
      },
      {
        question: 'How should regulatory interactions be managed?',
        options: [
          'Direct communication',
          'Through security counsel',
          'Informal discussions',
          'Written responses only'
        ],
        correctAnswer: 1,
        explanation: 'Security counsel ensures proper handling of regulatory matters.',
        hints: [
          'Consider security implications',
          'Think about professional standards'
        ]
      },
      {
        question: 'What compliance monitoring should be implemented?',
        options: [
          'Basic checks',
          'Enhanced security and regulatory monitoring',
          'No changes needed',
          'External audit only'
        ],
        correctAnswer: 1,
        explanation: 'Enhanced monitoring helps maintain ongoing compliance.',
        hints: [
          'Consider regulatory requirements',
          'Think about continuous compliance'
        ]
      }
    ]
  },
  {
    id: 'data',
    title: 'Data Protection',
    description: 'Safeguard security data and system information',
    icon: <Lock className="h-12 w-12 text-purple-500" />,
    impact: 'System Privacy and Data Security',
    scenario: 'The ransomware attack has potentially compromised sensitive security data and system information. You must ensure the protection of security data and system assets while maintaining system integrity and regulatory compliance.',
    questions: [
      {
        question: 'What is your first data protection priority?',
        options: [
          'System restoration',
          'Assess data exposure and security implications',
          'Contact all stakeholders',
          'Public announcement'
        ],
        correctAnswer: 1,
        explanation: 'Assessing exposure helps determine necessary protective measures.',
        hints: [
          'Consider system confidentiality',
          'Think about security obligations'
        ]
      },
      {
        question: 'How should compromised data be handled?',
        options: [
          'Ignore if encrypted',
          'Comprehensive security assessment and notification',
          'Basic cleanup',
          'System reset'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive assessment ensures proper handling of compromised data.',
        hints: [
          'Consider security requirements',
          'Think about system impact'
        ]
      },
      {
        question: 'What data protection measures should be implemented?',
        options: [
          'Basic security',
          'Enhanced security data protection controls',
          'No changes needed',
          'External monitoring only'
        ],
        correctAnswer: 1,
        explanation: 'Enhanced controls help protect sensitive security information.',
        hints: [
          'Consider confidentiality requirements',
          'Think about data protection'
        ]
      },
      {
        question: 'How should data access be managed?',
        options: [
          'Open access',
          'Strict security need-to-know basis',
          'Department-level access',
          'No restrictions'
        ],
        correctAnswer: 1,
        explanation: 'Need-to-know basis maintains proper confidentiality.',
        hints: [
          'Consider security protocols',
          'Think about access controls'
        ]
      },
      {
        question: 'What documentation is needed for data protection?',
        options: [
          'Basic logs',
          'Comprehensive security data protection records',
          'No documentation',
          'System reports only'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive records support security compliance and protection.',
        hints: [
          'Consider security requirements',
          'Think about documentation needs'
        ]
      }
    ]
  },
  {
    id: 'recovery',
    title: 'Recovery Planning',
    description: 'Develop security recovery and continuity strategies',
    icon: <CheckCircle className="h-12 w-12 text-teal-500" />,
    impact: 'Security Service Continuity',
    scenario: 'Following the ransomware attack, you must develop and implement recovery plans that ensure the continuity of security services while maintaining system integrity and meeting regulatory requirements. The focus is on restoring critical security operations and protecting system interests.',
    questions: [
      {
        question: 'What should be the first recovery priority?',
        options: [
          'All systems',
          'Critical security operations and system services',
          'Non-essential services',
          'External systems'
        ],
        correctAnswer: 1,
        explanation: 'Focusing on critical operations ensures essential security services continue.',
        hints: [
          'Consider security obligations',
          'Think about system impact'
        ]
      },
      {
        question: 'How should recovery resources be allocated?',
        options: [
          'Equal distribution',
          'Based on security priorities and system impact',
          'First-come-first-served',
          'External priority'
        ],
        correctAnswer: 1,
        explanation: 'Priority-based allocation ensures critical security needs are met.',
        hints: [
          'Consider security requirements',
          'Think about system impact'
        ]
      },
      {
        question: 'What recovery documentation is essential?',
        options: [
          'Basic notes',
          'Comprehensive security recovery plans',
          'No documentation',
          'System logs only'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive plans ensure proper security service recovery.',
        hints: [
          'Consider security requirements',
          'Think about recovery needs'
        ]
      },
      {
        question: 'How should recovery progress be communicated?',
        options: [
          'Public updates',
          'Targeted security stakeholder communications',
          'No updates',
          'Social media'
        ],
        correctAnswer: 1,
        explanation: 'Targeted communications maintain stakeholder trust and security obligations.',
        hints: [
          'Consider stakeholder needs',
          'Think about confidentiality'
        ]
      },
      {
        question: 'What recovery validation is required?',
        options: [
          'Basic check',
          'Comprehensive security and operational validation',
          'No validation',
          'External audit only'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive validation ensures proper security service restoration.',
        hints: [
          'Consider security requirements',
          'Think about service quality'
        ]
      }
    ]
  }
];

function App() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [showResults, setShowResults] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const [hintCounts, setHintCounts] = useState<number[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [active, setActive] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check system preference or saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    // Update theme class and save preference
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleCardClick = (cardId: string) => {
    setSelectedCard(cardId);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setCorrectAnswers(0);
    setShowResults(false);
    setAnsweredQuestions([]);
    setHintCounts(new Array(riskCards.find(c => c.id === cardId)?.questions.length || 0).fill(0));
    setShowHint(false);
  };

  const handleHintClick = () => {
    const currentCard = riskCards.find(c => c.id === selectedCard);
    if (!currentCard || !currentCard.questions[currentQuestionIndex].hints) return;

    const newHintCounts = [...hintCounts];
    if (newHintCounts[currentQuestionIndex] < 2) {
      newHintCounts[currentQuestionIndex]++;
      setHintCounts(newHintCounts);
      setShowHint(true);
    }
  };

  const getQuestionScore = (questionIndex: number) => {
    const hintCount = hintCounts[questionIndex];
    if (hintCount === 0) return 5;
    if (hintCount === 1) return 3;
    return 2;
  };

  const calculateTotalScore = () => {
    return answeredQuestions.reduce((total, isCorrect, index) => {
      return total + (isCorrect ? getQuestionScore(index) : 0);
    }, 0);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    
    const currentCard = riskCards.find(c => c.id === selectedCard);
    if (currentCard) {
      const isCorrect = answerIndex === currentCard.questions[currentQuestionIndex].correctAnswer;
      const newAnsweredQuestions = [...answeredQuestions];
      newAnsweredQuestions[currentQuestionIndex] = isCorrect;
      setAnsweredQuestions(newAnsweredQuestions);

      if (isCorrect) {
        setCorrectAnswers(prev => prev + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    const currentCard = riskCards.find(c => c.id === selectedCard);
    if (currentCard && currentQuestionIndex < currentCard.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(null);
    }
  };

  const getPerformanceMessage = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage === 100) return "Excellent! You have a perfect understanding of operational disruption handling.";
    if (percentage >= 80) return "Great job! You have a strong grasp of the concepts with minor areas for improvement.";
    if (percentage >= 60) return "Good effort! Consider reviewing the areas where you made mistakes.";
    return "You might benefit from additional training on operational disruption procedures.";
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setCorrectAnswers(0);
    setShowResults(false);
    setAnsweredQuestions([]);
  };

  const navItems = [
    { name: "Home", link: "/", icon: <Shield className="h-4 w-4" /> },
    { name: "Assessments", link: "/assessments", icon: <BookOpen className="h-4 w-4" /> },
    { name: "Resources", link: "/resources", icon: <Lock className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen relative">
      <GridBackgroundDemo />
      <div className="relative z-10 min-h-screen bg-white/50 dark:bg-black/50">
        <FloatingNav navItems={navItems} isDark={isDark} toggleTheme={toggleTheme} />

        {/* Main Content */}
        <div className="pt-24">
          {/* Hero Section */}
          <header className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
              <div className="text-center">
                <Shield className="h-20 w-20 text-blue-500 dark:text-blue-600 mx-auto mb-8" />
                <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
                  Security - Ransomware Attack Scenario
                </h1>
                <p className="text-xl text-slate-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  The Security Operations Center (SOC) has detected a sophisticated ransomware attack targeting critical IT systems. 
                  Multiple endpoints are showing signs of encryption, and the attackers are demanding payment in cryptocurrency. 
                  As the IT Security Lead, you must coordinate the incident response while ensuring business continuity and data protection.
                </p>
              </div>
            </div>
          </header>

          {/* Risk Cards Grid */}
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white text-center mb-12">Risk Cards</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {riskCards.map((card) => (
                  <motion.div
                    key={card.id}
                    className={`bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                      selectedCard === card.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => handleCardClick(card.id)}
                    whileHover={{ y: -5 }}
                  >
                    <div>
                      {card.icon}
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{card.title}</h3>
                      <p className="text-slate-700 dark:text-gray-300">{card.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-gray-400">
                <ShieldIcon className="h-6 w-6" />
                <span>© 2025 Ransomware Protection. All rights reserved.</span>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Expanded Card View */}
      <AnimatePresence>
        {selectedCard && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl w-[75vw] max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {riskCards.find(c => c.id === selectedCard)?.title}
                    </h3>
                    <p className="text-red-600 dark:text-red-400 font-semibold">
                      Impact: {riskCards.find(c => c.id === selectedCard)?.impact}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                {!showResults && (
                  <div className="bg-slate-100 dark:bg-slate-700 p-6 rounded-lg mb-8">
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Scenario</h4>
                    <p className="text-slate-700 dark:text-gray-300">
                      {riskCards.find(c => c.id === selectedCard)?.scenario}
                    </p>
                  </div>
                )}

                {showResults ? (
                  <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-6">
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Assessment Report</h4>
                    <div className="mb-6">
                      <div className="bg-slate-200 dark:bg-slate-800 p-4 rounded-lg mb-4">
                        <h5 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Summarized Report</h5>
                        <p className="text-slate-700 dark:text-gray-300">
                          {`You have completed ${riskCards.find(c => c.id === selectedCard)?.title.toLowerCase()} management assessment. Your score is ${calculateTotalScore()}/25.${answeredQuestions.filter(isCorrect => !isCorrect).length > 0 ? ' Review the areas for improvement to strengthen your response strategy.' : ''}`}
                        </p>
                      </div>
                      <p className="text-xl text-slate-900 dark:text-white mb-4">
                        Score: {calculateTotalScore()} out of 25
                      </p>
                      
                      <>
                        <p className="text-lg text-green-600 dark:text-green-400 mb-4">
                          Assessment Complete
                        </p>
                        <div className="mb-4">
                          <p className="text-lg text-slate-900 dark:text-white mb-2">Performance Analysis:</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-slate-200 dark:bg-slate-600 p-4 rounded-lg">
                              <p className="font-semibold mb-2 text-slate-900 dark:text-white">Correct Answers:</p>
                              {answeredQuestions.map((isCorrect, index) => (
                                isCorrect && (
                                  <p key={index} className="text-green-600 dark:text-white">
                                    ✓ Question {index + 1}
                                  </p>
                                )
                              ))}
                            </div>
                            <div className="bg-slate-200 dark:bg-slate-600 p-4 rounded-lg">
                              <p className="font-semibold mb-2 text-slate-900 dark:text-white">Areas for Improvement:</p>
                              {answeredQuestions.map((isCorrect, index) => (
                                !isCorrect && (
                                  <div key={index} className="mb-2">
                                    <p className="text-red-600 dark:text-white">
                                      ✗ Question {index + 1}
                                    </p>
                                    <p className="text-slate-600 dark:text-white text-sm">
                                      {riskCards.find(c => c.id === selectedCard)?.questions[index].explanation}
                                    </p>
                                  </div>
                                )
                              ))}
                            </div>
                          </div>
                        </div>
                        {selectedCard !== riskCards[riskCards.length - 1].id ? (
                          <button
                            onClick={() => {
                              const currentIndex = riskCards.findIndex(c => c.id === selectedCard);
                              handleCardClick(riskCards[currentIndex + 1].id);
                            }}
                            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full"
                          >
                            Next Risk Card
                          </button>
                        ) : (
                          <button
                            onClick={() => setSelectedCard(null)}
                            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full"
                          >
                            Return to Main Page
                          </button>
                        )}
                      </>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-6">
                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-xl text-slate-900 dark:text-white">
                          Question {currentQuestionIndex + 1} of {riskCards.find(c => c.id === selectedCard)?.questions.length}
                        </h4>
                        <button
                          onClick={handleHintClick}
                          disabled={hintCounts[currentQuestionIndex] >= 2}
                          className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:opacity-50"
                        >
                          <span>💡</span>
                          <span>Hint ({2 - hintCounts[currentQuestionIndex]} left)</span>
                        </button>
                      </div>

                      {showHint && (
                        <div className="bg-blue-100/50 dark:bg-blue-900/50 p-4 rounded-lg mb-4 animate-fade-in">
                          <p className="text-blue-900 dark:text-blue-200 font-semibold">Hint:</p>
                          <p className="text-blue-900 dark:text-blue-200">
                            {riskCards.find(c => c.id === selectedCard)?.questions[currentQuestionIndex].hints?.[hintCounts[currentQuestionIndex] - 1]}
                          </p>
                        </div>
                      )}

                      <p className="text-slate-900 dark:text-gray-200">
                        {riskCards.find(c => c.id === selectedCard)?.questions[currentQuestionIndex].question}
                      </p>
                    </div>

                    <div className="space-y-4 mb-8">
                      {riskCards
                        .find(c => c.id === selectedCard)
                        ?.questions[currentQuestionIndex].options.map((option, index) => (
                          <button
                            key={index}
                            className={`w-full text-left p-4 rounded-lg transition-colors flex justify-between items-center ${
                              selectedAnswer === index
                                ? selectedAnswer === riskCards.find(c => c.id === selectedCard)?.questions[currentQuestionIndex].correctAnswer
                                  ? 'bg-green-600 text-white'
                                  : 'bg-red-600 text-white'
                                : 'bg-slate-200 dark:bg-slate-600 text-slate-900 dark:text-gray-200 hover:bg-slate-300 dark:hover:bg-slate-500'
                            }`}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={selectedAnswer !== null}
                          >
                            <span>{option}</span>
                            {selectedAnswer === index && (
                              selectedAnswer === riskCards.find(c => c.id === selectedCard)?.questions[currentQuestionIndex].correctAnswer
                                ? <CheckCircle className="h-6 w-6 text-white" />
                                : <XCircle className="h-6 w-6 text-white" />
                            )}
                          </button>
                        ))}
                    </div>

                    {selectedAnswer !== null && (
                      <div className="mb-6 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <p className="text-blue-900 dark:text-blue-100 font-semibold">Right Approach:</p>
                        <p className="text-blue-800 dark:text-blue-200">
                          {riskCards.find(c => c.id === selectedCard)?.questions[currentQuestionIndex].explanation}
                        </p>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <button
                        onClick={handlePrevQuestion}
                        disabled={currentQuestionIndex === 0}
                        className={`px-6 py-2 rounded-full ${
                          currentQuestionIndex === 0
                            ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-slate-600 dark:text-white'
                            : 'bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700 text-white'
                        }`}
                      >
                        Previous
                      </button>
                      <button
                        onClick={handleNextQuestion}
                        disabled={selectedAnswer === null}
                        className={`px-6 py-2 rounded-full ${
                          selectedAnswer === null
                            ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-slate-600 dark:text-white'
                            : 'bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700 text-white'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;