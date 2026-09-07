// Complete 12-Week (3-Month) Task Templates & Initial Intern Records for AVP FutureTech

export const initialInternTemplates = {
  'dom-ai-ml': [
    // Month 1: Core Machine Learning & Deep Learning Foundations
    { id: 'task-ai-01', week: 1, month: 1, title: 'Python for AI, NumPy, Pandas & Vectorized Math', description: 'Perform Exploratory Data Analysis (EDA) on a tabular healthcare dataset, compute statistical correlations, handle missing values, and produce 5 visual insights.', requiredDeliverables: 'Jupyter Notebook (.ipynb) + GitHub Repository Link' },
    { id: 'task-ai-02', week: 2, month: 1, title: 'Supervised Learning & Predictive Churn Modeling', description: 'Train and compare 4 algorithms (Logistic Regression, Random Forest, XGBoost, LightGBM). Optimize hyperparameters using Optuna.', requiredDeliverables: 'Model evaluation report + Saved model pickle/joblib' },
    { id: 'task-ai-03', week: 3, month: 1, title: 'Model Evaluation, Cross-Validation & Feature Selection', description: 'Implement 5-Fold Stratified Cross-Validation, analyze Confusion Matrix, Precision-Recall curves, and write ROC-AUC diagnostic report.', requiredDeliverables: 'Cross-validation analysis report + GitHub commit' },
    { id: 'task-ai-04', week: 4, month: 1, title: 'Deep Learning with PyTorch: CNN Image Classification', description: 'Build a convolutional neural network with data augmentation and transfer learning (ResNet-18) to classify medical X-ray scans with >92% accuracy.', requiredDeliverables: 'Training script + Streamlit Web App Demo Link' },

    // Month 2: Advanced Transformers, NLP & GenAI Agents
    { id: 'task-ai-05', week: 5, month: 2, title: 'Sequential Data, RNNs, LSTMs & Self-Attention', description: 'Implement a bidirectional LSTM with custom attention layers for time-series anomaly detection and stock price volatility forecasting.', requiredDeliverables: 'PyTorch model training script + Benchmark charts' },
    { id: 'task-ai-06', week: 6, month: 2, title: 'Modern Transformers & Hugging Face Pipeline Integration', description: 'Fine-tune a DistilBERT transformer for multi-class domain sentiment classification and export optimized ONNX weights.', requiredDeliverables: 'Fine-tuning script + Hugging Face Model Card / weights' },
    { id: 'task-ai-07', week: 7, month: 2, title: 'Retrieval-Augmented Generation (RAG) Architecture', description: 'Engineer an end-to-end RAG pipeline using ChromaDB vector database, sentence-transformers, and LangChain document loaders.', requiredDeliverables: 'Working RAG query engine + FastAPI test endpoint' },
    { id: 'task-ai-08', week: 8, month: 2, title: 'Autonomous Multi-Agent Systems with LangGraph', description: 'Design an autonomous multi-agent research workflow with memory persistence, web-search tools, and automated fact-checking.', requiredDeliverables: 'Agent orchestration graph + execution trace logs' },

    // Month 3: Production MLOps, Scalable Serving & Final Capstone
    { id: 'task-ai-09', week: 9, month: 3, title: 'Model Serving with FastAPI & Docker Containerization', description: 'Package PyTorch & LLM inference pipelines into high-throughput asynchronous REST APIs with Swagger documentation and Dockerfile.', requiredDeliverables: 'Dockerfile + docker-compose.yml + Postman Collection' },
    { id: 'task-ai-10', week: 10, month: 3, title: 'MLOps: Experiment Tracking with MLflow & CI/CD', description: 'Set up MLflow experiment tracking, automated model registry, and GitHub Actions workflow for automated unit test validation.', requiredDeliverables: 'MLflow tracking dashboard export + CI/CD YAML config' },
    { id: 'task-ai-11', week: 11, month: 3, title: 'Enterprise Production Capstone Engineering', description: 'Build and deploy a full-scale AI enterprise platform integrating vector search, LLM routing, latency caching, and frontend UI.', requiredDeliverables: 'Full-stack repository + Deployed cloud URL' },
    { id: 'task-ai-12', week: 12, month: 3, title: 'Final Project Defense, Code Audit & Portfolio Review', description: 'Submit comprehensive architectural whitepaper, video defense demo, and finalize public GitHub portfolio for verified LOR issuance.', requiredDeliverables: 'Live Demo URL + Project Video Defense + Final Documentation' }
  ],

  'dom-python-fullstack': [
    // Month 1: Frontend & Backend Foundations
    { id: 'task-py-01', week: 1, month: 1, title: 'Responsive Frontend with React 18 & Modern CSS', description: 'Develop an interactive e-commerce product catalog with dynamic category filters, shopping cart state management, and responsive layout.', requiredDeliverables: 'Vercel/Netlify Live URL + GitHub Repo' },
    { id: 'task-py-02', week: 2, month: 1, title: 'FastAPI Backend & PostgreSQL Database Architecture', description: 'Design normalized relational database schema, write async CRUD REST endpoints, implement Pydantic validation and SQLAlchemy ORM.', requiredDeliverables: 'Swagger /docs OpenAPI JSON + Postman Collection' },
    { id: 'task-py-03', week: 3, month: 1, title: 'Authentication, JWT & Role-Based Access Control (RBAC)', description: 'Build secure authentication system with bcrypt password hashing, access/refresh JWT tokens, and role-based route middleware.', requiredDeliverables: 'Authentication microservice repository + Test suite' },
    { id: 'task-py-04', week: 4, month: 1, title: 'Connecting React Client with Backend & State Management', description: 'Connect React frontend with FastAPI backend using Axios and React Query, with optimistic UI updates and toast notifications.', requiredDeliverables: 'Connected full-stack app repository + live demo' },

    // Month 2: Microservices, Redis Caching & Asynchronous Queues
    { id: 'task-py-05', week: 5, month: 2, title: 'Asynchronous Background Workers with Celery & Redis', description: 'Implement Celery distributed task queue backed by Redis for asynchronous email dispatch, report generation, and PDF exports.', requiredDeliverables: 'Celery worker configuration + trigger test script' },
    { id: 'task-py-06', week: 6, month: 2, title: 'Real-Time Bi-Directional WebSockets Engine', description: 'Create real-time live notification and collaborative chat feed using FastAPI WebSockets and React client listeners.', requiredDeliverables: 'WebSocket server & client code + latency benchmark' },
    { id: 'task-py-07', week: 7, month: 2, title: 'Testing Suite: PyTest, React Testing Library & Coverage', description: 'Write comprehensive integration and unit test suite achieving >80% code coverage across backend endpoints and frontend components.', requiredDeliverables: 'PyTest coverage report + Jest test execution logs' },
    { id: 'task-py-08', week: 8, month: 2, title: 'Performance Optimization, SQL Indexing & Redis Cache', description: 'Profile API endpoints, optimize N+1 SQL queries with eager loading, configure Redis multi-tier caching for sub-20ms responses.', requiredDeliverables: 'Benchmark comparison report before and after caching' },

    // Month 3: Dockerization, Cloud Deployment & Capstone SaaS
    { id: 'task-py-09', week: 9, month: 3, title: 'Multi-Stage Dockerization & Microservice Compose', description: 'Write production-ready multi-stage Dockerfiles for React frontend and FastAPI backend orchestrated via docker-compose.', requiredDeliverables: 'Dockerfile + docker-compose.yml with health checks' },
    { id: 'task-py-10', week: 10, month: 3, title: 'Automated CI/CD Pipeline with GitHub Actions', description: 'Configure automated CI/CD pipeline that runs linter, executes test suites, builds Docker images, and deploys to cloud host.', requiredDeliverables: 'GitHub Actions workflow .yml + deployment log' },
    { id: 'task-py-11', week: 11, month: 3, title: 'Enterprise Multi-Tenant SaaS Capstone Platform', description: 'Engineer a multi-tenant SaaS application with organization tenant isolation, Stripe billing mock, and admin telemetry metrics.', requiredDeliverables: 'Complete SaaS codebase repository + Cloud Live URL' },
    { id: 'task-py-12', week: 12, month: 3, title: 'Final Architectural Defense & Production Audit', description: 'Present end-to-end production architecture, security audit report, and live demonstration for verified LOR and ISO certification.', requiredDeliverables: 'Live Production URL + System Architecture PDF + Video Demo' }
  ],

  'dom-cyber': [
    // Month 1: Network Reconnaissance & Vulnerability Assessment
    { id: 'task-sec-01', week: 1, month: 1, title: 'Linux Administration, Networking Protocols & TCP/IP Deep Dive', description: 'Perform network topology discovery, port mapping, and protocol analysis using Nmap and Wireshark on a simulated lab subnet.', requiredDeliverables: 'Network discovery report + Nmap scan outputs (.xml/.txt)' },
    { id: 'task-sec-02', week: 2, month: 1, title: 'Reconnaissance & OSINT Threat Intelligence', description: 'Execute passive and active reconnaissance against a target perimeter using Shodan, WHOIS, DNS enumeration, and Harvester.', requiredDeliverables: 'Target perimeter reconnaissance dossier' },
    { id: 'task-sec-03', week: 3, month: 1, title: 'Web App Vulnerabilities: OWASP Top 10 Exploitation', description: 'Audit web applications for SQL Injection, XSS, CSRF, and Broken Object Level Authorization (BOLA) using Burp Suite.', requiredDeliverables: 'Burp Suite proof-of-concept exploit logs + Remediation notes' },
    { id: 'task-sec-04', week: 4, month: 1, title: 'Automated Vulnerability Scanning with Nikto & OWASP ZAP', description: 'Run automated vulnerability scans, eliminate false positives, and compile prioritized CVE risk matrix.', requiredDeliverables: 'Vulnerability assessment report with CVSS severity scoring' },

    // Month 2: Network Forensics, Hardening & SIEM Threat Hunting
    { id: 'task-sec-05', week: 5, month: 2, title: 'Network Traffic Analysis & PCAP Forensics with Wireshark', description: 'Analyze simulated DDoS and exfiltration PCAP captures, extract malicious payloads, and write Snort IDS detection rules.', requiredDeliverables: 'Forensic breakdown document + Custom Snort rule definitions' },
    { id: 'task-sec-06', week: 6, month: 2, title: 'Linux & Cloud System Hardening Baseline', description: 'Configure UFW firewalls, SSH key-only access, fail2ban brute-force defense, and CIS benchmark hardening audit.', requiredDeliverables: 'Hardening verification script output + configuration files' },
    { id: 'task-sec-07', week: 7, month: 2, title: 'SIEM Log Ingestion & Threat Hunting with Splunk', description: 'Ingest Apache/Nginx web logs and auth logs into Splunk, build SOC monitoring dashboard, and alert on brute-force triggers.', requiredDeliverables: 'Splunk dashboard XML export + SOC alert configuration' },
    { id: 'task-sec-08', week: 8, month: 2, title: 'Cryptography, SSL/TLS Cipher Hardening & PKI', description: 'Audit SSL/TLS cipher suites with testssl.sh, remediate weak ciphers, and implement automated Let’s Encrypt certificate renewal.', requiredDeliverables: 'testssl.sh audit report + Grade A+ verification certificate' },

    // Month 3: Red Team Exploits, Cloud Pentesting & Capstone Audit
    { id: 'task-sec-09', week: 9, month: 3, title: 'Automated Security Tooling with Python & Scapy', description: 'Develop custom Python security automation scripts for port knocking, custom packet injection, and banner grabbing.', requiredDeliverables: 'Python security script repository + unit test demonstrations' },
    { id: 'task-sec-10', week: 10, month: 3, title: 'Cloud Infrastructure Security Audit (AWS IAM & S3)', description: 'Perform security posture assessment on cloud IAM policies, S3 bucket permissions, and security groups using ScoutSuite / Prowler.', requiredDeliverables: 'Cloud security posture benchmark report + remediation actions' },
    { id: 'task-sec-11', week: 11, month: 3, title: 'Comprehensive Enterprise Penetration Testing Capstone', description: 'Conduct a simulated black-box penetration test against an enterprise staging network, demonstrating full kill-chain exploitation.', requiredDeliverables: 'Full-length penetration testing audit report with PoC exploits' },
    { id: 'task-sec-12', week: 12, month: 3, title: 'Remediation Roadmap Defense & Executive Security Review', description: 'Present executive remediation roadmap, patched code fixes, and vulnerability defense to senior security engineers.', requiredDeliverables: 'Executive Remediation Deck + Verified Security Portfolio + Video Demo' }
  ],

  'dom-ds': [
    // Month 1: Data Wrangling, SQL & Applied Statistics
    { id: 'task-ds-01', week: 1, month: 1, title: 'Advanced SQL Queries, Window Functions & CTEs', description: 'Write complex multi-table joins, subqueries, and window functions (RANK, NTILE, LAG/LEAD) on enterprise retail transactions.', requiredDeliverables: 'SQL query script (.sql) + Executed result tables' },
    { id: 'task-ds-02', week: 2, month: 1, title: 'Data Cleaning, Missing Value Imputation & Feature Engineering', description: 'Build an automated Python data sanitation pipeline for outliers, encoding categorical variables, and data type coercion.', requiredDeliverables: 'Jupyter cleaning pipeline notebook + clean dataset' },
    { id: 'task-ds-03', week: 3, month: 1, title: 'Applied Probability, Hypothesis Testing & A/B Experiments', description: 'Design A/B test framework, calculate minimum sample sizes, run Two-Sample T-Tests, and evaluate statistical significance.', requiredDeliverables: 'Statistical experiment analysis report (.pdf / .ipynb)' },
    { id: 'task-ds-04', week: 4, month: 1, title: 'Executive KPI Dashboarding with Power BI / Tableau', description: 'Design an interactive executive business intelligence dashboard featuring drill-downs, dynamic filters, and real-time KPI cards.', requiredDeliverables: 'PowerBI (.pbix) / Tableau workbook + Interactive screenshot deck' },

    // Month 2: Predictive Modeling, Time Series & Segmentation
    { id: 'task-ds-05', week: 5, month: 2, title: 'Time Series Forecasting & Seasonality Analysis', description: 'Build ARIMA and Prophet models for multi-quarter revenue and inventory demand forecasting with 90%+ confidence intervals.', requiredDeliverables: 'Forecasting notebook with backtesting evaluation' },
    { id: 'task-ds-06', week: 6, month: 2, title: 'Customer Segmentation using RFM & K-Means Clustering', description: 'Calculate Recency, Frequency, Monetary (RFM) scores and run K-Means / DBSCAN clustering to derive behavioral customer personas.', requiredDeliverables: 'Customer persona deck with visual cluster plots' },
    { id: 'task-ds-07', week: 7, month: 2, title: 'Cloud Data Warehousing with Snowflake / BigQuery', description: 'Set up cloud data warehouse staging tables, define schema partitioning, and optimize query latency for 10M+ rows.', requiredDeliverables: 'Data pipeline DDL scripts + Execution query profiles' },
    { id: 'task-ds-08', week: 8, month: 2, title: 'Automating Analytics Pipelines & Scheduled Dispatch', description: 'Automate weekly business reporting pipelines with Python, scheduling automated executive summary generation via cron.', requiredDeliverables: 'Automated reporting script + sample generated report' },

    // Month 3: Machine Learning for Decision Making & Capstone
    { id: 'task-ds-09', week: 9, month: 3, title: 'Customer Lifetime Value (LTV) & Churn Prediction Model', description: 'Train ensemble machine learning models to forecast 12-month customer lifetime value and detect high-risk churn indicators.', requiredDeliverables: 'Trained model notebook + Feature importance SHAP plots' },
    { id: 'task-ds-10', week: 10, month: 3, title: 'Data Storytelling & Executive Decision Framing', description: 'Translate complex statistical insights into clear business recommendations with executive presentation slides and ROI models.', requiredDeliverables: 'Executive presentation deck (.pdf) with strategic insights' },
    { id: 'task-ds-11', week: 11, month: 3, title: 'End-to-End Enterprise Data Science Capstone', description: 'Deliver a production data analytics solution encompassing raw data ingestion, automated ML scoring, and live dashboard.', requiredDeliverables: 'Full GitHub repository + Live Interactive Dashboard' },
    { id: 'task-ds-12', week: 12, month: 3, title: 'Final Portfolio Review, Documentation & Code Audit', description: 'Defend methodology, feature engineering logic, and business metrics to industry mentors for verified LOR issuance.', requiredDeliverables: 'Complete Data Science Portfolio + Video Defense + Documentation' }
  ],

  'dom-java-fullstack': [
    // Month 1: Java 21 Core, OOP & Spring Boot Foundations
    { id: 'task-jv-01', week: 1, month: 1, title: 'Java 21 Core: Streams, Lambdas, Concurrency & Collections', description: 'Build high-performance multi-threaded task runner and data processing pipelines using modern Java 21 Virtual Threads and Streams API.', requiredDeliverables: 'Maven project repository with JUnit unit tests' },
    { id: 'task-jv-02', week: 2, month: 1, title: 'Spring Boot 3 Core, Dependency Injection & Spring MVC', description: 'Architect modular Spring Boot 3 RESTful web services with layer separation (Controller, Service, Repository) and Bean validation.', requiredDeliverables: 'Spring Boot application repository + Swagger UI /openapi' },
    { id: 'task-jv-03', week: 3, month: 1, title: 'Data Persistence with Hibernate, JPA & MySQL Optimization', description: 'Design relational entities, composite keys, JPQL queries, and database transaction isolation levels with Hibernate ORM.', requiredDeliverables: 'Spring Data JPA project with Flyway database migrations' },
    { id: 'task-jv-04', week: 4, month: 1, title: 'Security Architecture with Spring Security 6 & JWT', description: 'Implement stateless authentication with Spring Security 6 filter chain, bcrypt password encoding, and role-based authorization.', requiredDeliverables: 'Secured authentication API repository + Postman collection' },

    // Month 2: Distributed Microservices, React Integration & Kafka
    { id: 'task-jv-05', week: 5, month: 2, title: 'Microservices Architecture & Spring Cloud Gateway', description: 'Decompose monolithic backend into distributed microservices with Spring Cloud Gateway routing and Eureka service discovery.', requiredDeliverables: 'Microservices cluster repository + Architecture diagram' },
    { id: 'task-jv-06', week: 6, month: 2, title: 'Connecting Modern React Client with Spring Boot Backend', description: 'Create responsive React web application consuming secured Spring REST APIs with Axios interceptors and global error handling.', requiredDeliverables: 'Full-stack repository + Live React client demo' },
    { id: 'task-jv-07', week: 7, month: 2, title: 'Event-Driven Streaming with Apache Kafka', description: 'Implement asynchronous producer-consumer order processing stream with Apache Kafka topics and resilient dead-letter queues.', requiredDeliverables: 'Kafka producer/consumer service code + message trace logs' },
    { id: 'task-jv-08', week: 8, month: 2, title: 'Automated Testing with JUnit 5, Mockito & Testcontainers', description: 'Write unit and integration test suite using JUnit 5, Mockito mocking framework, and Testcontainers for live MySQL testing.', requiredDeliverables: 'JaCoCo test coverage report (>80%) + execution logs' },

    // Month 3: Dockerization, Distributed Caching & Banking Capstone
    { id: 'task-jv-09', week: 9, month: 3, title: 'API Documentation with Swagger / OpenAPI & Rate Limiting', description: 'Document API endpoints with OpenAPI 3.0 and implement Bucket4j token bucket rate-limiting filters to prevent API abuse.', requiredDeliverables: 'OpenAPI specification document + rate-limit test script' },
    { id: 'task-jv-10', week: 10, month: 3, title: 'Dockerizing Java Microservices & Kubernetes Deployment', description: 'Write optimized multi-stage JRE Dockerfiles and Kubernetes deployment manifests (Deployment, Service, Ingress).', requiredDeliverables: 'Dockerfile + K8s YAML deployment manifests' },
    { id: 'task-jv-11', week: 11, month: 3, title: 'High-Throughput Distributed Banking Capstone Engine', description: 'Engineer an enterprise banking engine with ACID transaction isolation, Kafka ledger reconciliation, and React banking portal.', requiredDeliverables: 'Complete Banking Enterprise repo + Cloud Deployment URL' },
    { id: 'task-jv-12', week: 12, month: 3, title: 'Final Architectural Defense & Code Review Audit', description: 'Present distributed enterprise architecture, failover benchmarks, and live banking transactions for verified LOR issuance.', requiredDeliverables: 'Live Application URL + System Architecture PDF + Video Demo' }
  ],

  'dom-mobile-app': [
    // Month 1: Cross-Platform UI, Navigation & State Management
    { id: 'task-mob-01', week: 1, month: 1, title: 'Mobile UI Foundations & Responsive Design Systems', description: 'Build responsive multi-screen mobile UI components with custom themes, adaptive typography, and asset optimization.', requiredDeliverables: 'Flutter / React Native prototype repository + demo video' },
    { id: 'task-mob-02', week: 2, month: 1, title: 'Navigation Paradigms: Stack, Bottom Tabs & Drawer Routing', description: 'Implement nested routing architecture with deep-linking, modal dialogs, and transition animations.', requiredDeliverables: 'Navigation structure repository + APK/web build' },
    { id: 'task-mob-03', week: 3, month: 1, title: 'Global State Management & Local Storage (SQLite/Hive)', description: 'Architect state management with Redux Toolkit / Riverpod and persistent offline local cache with SQLite / Hive.', requiredDeliverables: 'State-managed mobile app codebase + unit tests' },
    { id: 'task-mob-04', week: 4, month: 1, title: 'REST API Integration, Error Boundaries & Pull-to-Refresh', description: 'Connect mobile client with REST APIs with token interceptors, cached query layers, and network error handling screens.', requiredDeliverables: 'Connected app repository + live API integration demo' },

    // Month 2: Native Device Hardware, Biometrics & Firebase Sync
    { id: 'task-mob-05', week: 5, month: 2, title: 'Native Device Hardware: Camera, Geolocation & GPS Tracking', description: 'Integrate native device sensors (Camera capture, GPS real-time location tracking, and local file storage permissions).', requiredDeliverables: 'Location-aware mobile app repository + recording demo' },
    { id: 'task-mob-06', week: 6, month: 2, title: 'Authentication with Firebase Auth & Biometric Fingerprint/FaceID', description: 'Implement secure authentication with Email/Password, OAuth social login, and native device Biometric FaceID/Fingerprint authentication.', requiredDeliverables: 'Secure biometric login flow code + test recording' },
    { id: 'task-mob-07', week: 7, month: 2, title: 'Real-Time Cloud Firestore Sync & Offline Replication', description: 'Build real-time data sync with Firebase Cloud Firestore with automatic offline delta caching and conflict resolution.', requiredDeliverables: 'Real-time sync mobile repository + live data stream demo' },
    { id: 'task-mob-08', week: 8, month: 2, title: 'Push Notifications with FCM & Background Sync Handlers', description: 'Set up Firebase Cloud Messaging (FCM) for targeted background push notifications, badge counters, and deep-link payload routing.', requiredDeliverables: 'FCM push notification integration code + test payload logs' },

    // Month 3: 60fps Micro-Animations, App Store Release & Capstone
    { id: 'task-mob-09', week: 9, month: 3, title: '60fps Micro-Interactions, Gestures & Physics Animations', description: 'Implement fluid custom gesture controls (swipe-to-dismiss, pinch-to-zoom) with 60fps hardware-accelerated animations.', requiredDeliverables: 'Animated mobile component repository + video showcase' },
    { id: 'task-mob-10', week: 10, month: 3, title: 'Automated Mobile Testing with Maestro / Detox & Jest', description: 'Write end-to-end user journey automated UI tests verifying authentication, navigation, and data submission.', requiredDeliverables: 'Maestro / Detox test scripts + automated execution report' },
    { id: 'task-mob-11', week: 11, month: 3, title: 'Production Capstone Real-Time Mobile Application', description: 'Engineer a production-ready health tracker / geolocation app with live sync, native integrations, and responsive UI.', requiredDeliverables: 'Full Mobile App Codebase + Standalone APK Build link' },
    { id: 'task-mob-12', week: 12, month: 3, title: 'App Store / Play Store Build Release & Mentor Defense', description: 'Generate release signed Android App Bundle (AAB/APK), configure store listings, and defend architecture to senior mentors.', requiredDeliverables: 'Signed Release APK link + Play Store Listing Asset Pack + Video Demo' }
  ]
};

// Helper function to build 12-week task list for a chosen domain
export const generate12WeekTasksForDomain = (domainId = 'dom-ai-ml') => {
  const template = initialInternTemplates[domainId] || initialInternTemplates['dom-ai-ml'];
  return template.map((t) => ({
    taskId: t.id,
    week: t.week,
    month: t.month,
    title: t.title,
    description: t.description,
    requiredDeliverables: t.requiredDeliverables,
    status: 'Pending',
    submissionLink: '',
    notes: '',
    fileName: '',
    submittedAt: '',
    approvedAt: '',
    mentorFeedback: ''
  }));
};

// Initial Registered & Enrolled Students
export const initialStudents = [
  {
    id: 'AVP-2026-1001',
    name: 'Aarav Sharma',
    phone: '9876543210',
    email: 'aarav.sharma@example.com',
    password: 'password123',
    collegeYear: '3rd Year',
    branch: 'Computer Science & Engineering',
    registrationDate: '2026-08-20T10:30:00Z',
    testStatus: 'Completed',
    scoreData: {
      sectionA: 18,
      sectionB: 19,
      sectionC: 9,
      totalScore: 46,
      maxScore: 50,
      percentage: 92,
      violationsCount: 1,
      submittedAt: '2026-08-20T11:28:00Z'
    },
    feeTier: '699',
    feeStatus: 'Paid',
    chosenDomainId: 'dom-ai-ml',
    chosenDomainName: 'AI & Machine Learning',
    isEnrolled: true,
    internId: 'INT-2026-AI-1001',
    internBatch: 'Batch 2026-Q3 (Alpha)',
    internStartDate: '2026-09-01',
    internshipStatus: 'In Progress',
    certificateUnlocked: false,
    tasks: generate12WeekTasksForDomain('dom-ai-ml').map((t, idx) => {
      if (idx === 0) {
        return {
          ...t,
          status: 'Approved',
          submissionLink: 'https://github.com/aaravsharma/ai-eda-pipeline',
          notes: 'Completed EDA on 15,000 patient records with interactive Seaborn heatmaps.',
          submittedAt: '2026-08-22T14:15:00Z',
          approvedAt: '2026-08-23T10:00:00Z',
          mentorFeedback: 'Outstanding exploratory data analysis! Code is modular and PEP-8 compliant.'
        };
      }
      if (idx === 1) {
        return {
          ...t,
          status: 'Submitted',
          submissionLink: 'https://github.com/aaravsharma/churn-prediction-optuna',
          notes: 'Trained LightGBM with 89.4% ROC-AUC. Added Optuna tuning script.',
          submittedAt: '2026-08-25T16:40:00Z',
          mentorFeedback: ''
        };
      }
      return t;
    })
  },
  {
    id: 'AVP-2026-1002',
    name: 'Diya Patel',
    phone: '9123456780',
    email: 'diya.patel@example.com',
    password: 'password123',
    collegeYear: 'Final Year',
    branch: 'Information Technology',
    registrationDate: '2026-08-22T09:15:00Z',
    testStatus: 'Completed',
    scoreData: {
      sectionA: 14,
      sectionB: 15,
      sectionC: 7,
      totalScore: 36,
      maxScore: 50,
      percentage: 72,
      violationsCount: 0,
      submittedAt: '2026-08-22T10:10:00Z'
    },
    feeTier: '5999',
    feeStatus: 'Pending',
    chosenDomainId: 'dom-python-fullstack',
    chosenDomainName: 'Python Full Stack Development',
    isEnrolled: false,
    internId: '',
    internBatch: '',
    internStartDate: '',
    internshipStatus: 'Not Started',
    certificateUnlocked: false,
    tasks: []
  },
  {
    id: 'AVP-2026-1003',
    name: 'Siddharth Iyer',
    phone: '9988776655',
    email: 'siddharth.iyer@example.com',
    password: 'password123',
    collegeYear: '2nd Year',
    branch: 'Electronics & Communication',
    registrationDate: '2026-08-23T14:20:00Z',
    testStatus: 'Completed',
    scoreData: {
      sectionA: 19,
      sectionB: 18,
      sectionC: 8,
      totalScore: 45,
      maxScore: 50,
      percentage: 90,
      violationsCount: 0,
      submittedAt: '2026-08-23T15:18:00Z'
    },
    feeTier: '699',
    feeStatus: 'Paid',
    chosenDomainId: 'dom-cyber',
    chosenDomainName: 'Cybersecurity & Ethical Hacking',
    isEnrolled: true,
    internId: 'INT-2026-CY-1003',
    internBatch: 'Batch 2026-Q3 (Alpha)',
    internStartDate: '2026-09-01',
    internshipStatus: 'In Progress',
    certificateUnlocked: false,
    tasks: generate12WeekTasksForDomain('dom-cyber').map((t, idx) => {
      if (idx === 0) {
        return {
          ...t,
          status: 'Approved',
          submissionLink: 'https://github.com/siddharth-sec/network-topology-audit',
          notes: 'Nmap & Wireshark port scans with detailed vulnerability write-up.',
          submittedAt: '2026-08-24T12:00:00Z',
          approvedAt: '2026-08-24T18:30:00Z',
          mentorFeedback: 'Detailed analysis. Good attention to perimeter port scanning.'
        };
      }
      return t;
    })
  },
  {
    id: 'AVP-2026-1004',
    name: 'Rohan Kulkarni',
    phone: '9876501234',
    email: 'rohan.kulkarni@example.com',
    password: 'password123',
    collegeYear: '3rd Year',
    branch: 'Computer Engineering',
    registrationDate: '2026-08-24T11:00:00Z',
    testStatus: 'Completed',
    scoreData: {
      sectionA: 18,
      sectionB: 19,
      sectionC: 9,
      totalScore: 46,
      maxScore: 50,
      percentage: 92,
      violationsCount: 0,
      submittedAt: '2026-08-24T11:58:00Z'
    },
    feeTier: '699',
    feeStatus: 'Paid',
    chosenDomainId: 'dom-mobile-app',
    chosenDomainName: 'Mobile App Development',
    isEnrolled: true,
    internId: 'INT-2026-MO-1004',
    internBatch: 'Batch 2026-Q3 (Alpha)',
    internStartDate: '2026-09-01',
    internshipStatus: 'In Progress',
    certificateUnlocked: false,
    tasks: generate12WeekTasksForDomain('dom-mobile-app')
  }
];

export const initialAdmins = [
  {
    id: 'adm-01',
    name: 'Dr. Vikram Pradhan',
    email: 'admin@avpfuturetech.com',
    password: 'Admin@2026',
    role: 'superadmin',
    department: 'Academic Operations'
  },
  {
    id: 'adm-02',
    name: 'Priya Mukherjee',
    email: 'mentor@avpfuturetech.com',
    password: 'Mentor@2026',
    role: 'staffadmin',
    department: 'Software Engineering Mentorship'
  }
];
