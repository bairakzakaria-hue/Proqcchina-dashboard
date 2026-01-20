'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Language = 'en' | 'ar' | 'fr' | 'ru'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  dir: 'ltr' | 'rtl'
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation files
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Auth
    'auth.welcome': 'Welcome back! Please sign in to your account.',
    'auth.signIn': 'Sign In',
    'auth.signUp': 'Sign Up',
    'auth.signingIn': 'Signing in...',
    'auth.createAccount': 'Create your account to get started.',
    'auth.creatingAccount': 'Creating account...',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.name': 'Full Name',
    'auth.company': 'Company Name',
    'auth.rememberMe': 'Remember me',
    'auth.forgotPassword': 'Forgot password?',
    'auth.alreadyHaveAccount': "Already have an account?",
    'auth.dontHaveAccount': "Don't have an account?",
    'auth.demoAccess': 'Demo Access',
    'auth.demoAccessHint': 'Use the demo button to access the dashboard and CRM.',
    'auth.demoAdminButton': 'Enter Demo as Admin',
    'auth.terms': 'I agree to the Terms of Service and Privacy Policy',
    
    // Navigation
    'nav.about': 'About us',
    'nav.services': 'Our services',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.allServices': 'All Services',
    
    // Services
    'service.factoryAudit': 'Factory audit',
    'service.factoryAuditDescription': 'On-site audit covering quality systems and compliance',
    'service.preShipment': 'Pre-shipment inspection',
    'service.preShipmentDescription': 'Final inspection before dispatch to verify quantity and quality',
    'service.duringProduction': 'During production inspection',
    'service.duringProductionDescription': 'Mid-production check to catch issues early',
    'service.containerLoading': 'Container loading supervision',
    'service.containerLoadingDescription': 'Supervise loading to ensure correct quantities and secure stuffing',
    
    // Dashboard
    'dashboard.welcome': 'Welcome',
    'dashboard.startBooking': 'Start by booking one of our services right now',
    'dashboard.bookings': 'Your Bookings',
    'dashboard.invoices': 'Your Invoices',
    'dashboard.overview': 'Overview',
    'dashboard.bookingsPage': 'Bookings',
    'dashboard.reports': 'Reports',
    'dashboard.invoicesPage': 'Invoices',
    'dashboard.crm': 'CRM',
    'dashboard.search': 'Search booking, invoices...',
    'dashboard.newBooking': '+ New Booking',
    'dashboard.bookingGuidance': 'Booking Guidance',
    
    // Booking
    'booking.howToBook': 'How to Book a Service',
    'booking.step1': 'Select the service you need from the service cards',
    'booking.step2': 'Fill in the booking form with your requirements',
    'booking.step3': 'Review and confirm your booking details',
    'booking.step4': 'Submit your booking request',
    'booking.step5': 'Wait for the reports status to switch to completed',
    'booking.step6': 'Pay the service fee',
    'booking.step7': 'A download button will appear',
    'booking.step8': 'Download your report',
    'booking.availableServices': 'Available Services',
    'booking.bookNow': 'Book Now',
    'booking.bookService': 'Book {service} Service',
    'booking.companyName': 'Company Name',
    'booking.contactName': 'Contact Name',
    'booking.phone': 'Phone',
    'booking.whatsappNumber': 'WhatsApp Number',
    'booking.targetDate': 'Target Date',
    'booking.additionalNotes': 'Additional Notes',
    'booking.submit': 'Submit Booking',
    'booking.submitting': 'Submitting...',
    'booking.cancel': 'Cancel',
    'booking.submitted': 'Booking Submitted!',
    'booking.success': 'Your {service} booking request has been submitted successfully.',
    'booking.thankYouTitle': 'Thank you!',
    'booking.thankYouMessage': 'Thank you for choosing ProQCChina. Your {service} booking has been made successfully.',
    'booking.neverShowAgain': 'Never show again',
    
    // Tables
    'table.id': 'ID',
    'table.date': 'Date',
    'table.service': 'Service',
    'table.status': 'Status',
    'table.action': 'Action',
    'table.supplier': 'Supplier',
    'table.amount': 'Amount',
    'table.dueDate': 'Due Date',
    'table.description': 'Description',
    'table.viewDetails': 'View Details',
    'table.viewAll': 'View all',
    'table.latest': 'Latest',
    'table.noResults': 'No results found',
    
    // Status
    'status.paid': 'Paid',
    'status.due': 'Due',
    'status.pending': 'Pending',
    'status.cancelled': 'Cancelled',
    'status.completed': 'Completed',
    'status.ready': 'Ready',
    
    // Invoices
    'invoice.totalUnpaid': 'Total unpaid',
    'invoice.downloadAll': 'Download All',
    'invoice.pay': 'Pay',
    'invoice.noPaymentMethods': 'No payment methods are currently enabled.',
    
    // Reports
    'report.clientDashboard': 'Client Inspection Dashboard',
    'report.manage': 'Manage and track the status of your quality control and inspection projects.',
    'report.reportService': 'REPORT / SERVICE',
    'report.factoryLocation': 'FACTORY & LOCATION',
    'report.completed': 'COMPLETED',
    'report.paymentStatus': 'PAYMENT STATUS',
    'report.download': 'Download',
    'report.locked': 'Locked',
    
    // Support
    'support.needHelp': 'Need More Help?',
    'support.available': 'Our support team is available to assist you.',
    'support.contact': 'Contact Support',
    'support.email': 'Email Support',
    'support.whatsappChat': 'WhatsApp Live Chat',
    'support.scanToChat': 'Scan to chat on WhatsApp',
    'support.whatsappQrAlt': 'WhatsApp QR code',

    // CRM
    'crm.title': 'CRM Control Panel',
    'crm.subtitle': 'Manage bookings, leads, and admin access.',
    'crm.bookings': 'Bookings & Leads',
    'crm.users': 'Users & Roles',
    'crm.addBooking': 'Add Booking',
    'crm.addUser': 'Add User',
    'crm.clientName': 'Client Name',
    'crm.fullName': 'Full Name',
    'crm.service': 'Service',
    'crm.email': 'Email',
    'crm.company': 'Company',
    'crm.phone': 'Phone',
    'crm.noBookings': 'No bookings yet.',
    'crm.noUsers': 'No users yet.',
    'crm.roleClient': 'Client',
    'crm.roleCoAdmin': 'Co-admin',
    'crm.roleAdmin': 'Admin',
    'crm.deleteUser': 'Delete user',
    'crm.settings': 'Admin Settings',
    'crm.supportEmail': 'Support Email',
    'crm.supportWhatsApp': 'WhatsApp Support Number',
    'crm.paymentMethods': 'Payment Methods',
    'crm.accessDenied': 'Access restricted',
    'crm.accessDeniedHint': 'Please sign in as an admin or co-admin to view the CRM.',
    'crm.downloadReport': 'Download report',
    'crm.downloadLocked': 'Payment required before download.',
    
    // Settings
    'settings.profile': 'Profile Settings',
    'settings.save': 'Save Changes',
    'settings.saving': 'Saving...',
    'settings.currentPassword': 'Current Password',
    'settings.newPassword': 'New Password',
    'settings.confirmPassword': 'Confirm New Password',
    'settings.passwordMismatch': 'New passwords do not match',
    'settings.currentPasswordRequired': 'Current password is required to change your password',
    'settings.profilePhoto': 'Profile Photo',
    'settings.photoHint': 'JPG, PNG up to 5MB',
    'settings.name': 'Full Name',
    'settings.loginEmail': 'Login Email',
    'settings.additionalEmail': 'Additional Email',
    'settings.whatsappNumber': 'WhatsApp Number',
    'settings.whatsappNumberHint': 'Include country code',
    'settings.company': 'Company Name',
    'settings.changePassword': 'Change Password',
    'settings.darkMode': 'Dark Mode',
    'settings.darkModeHint': 'Apply dark mode across the app',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.close': 'Close',
    'common.all': 'All',
    'common.filter': 'Filter by Status:',
    'common.action': 'Action',
    'common.viewAll': 'View all',
    'common.viewBooking': 'View Booking',
    'common.latest': 'Latest',
    'common.latestBookings': 'Latest Booking',
    'common.latestInvoices': 'Latest Invoices',
    'common.paymentMethod': 'Payment Method',
    'common.paymentSuccess': 'Payment processed successfully!',
    'common.paymentNote': 'After payment is confirmed, the report will be available for download once it has been delivered.',
  },
  ar: {
    // Auth
    'auth.welcome': 'مرحباً بعودتك! يرجى تسجيل الدخول إلى حسابك.',
    'auth.signIn': 'تسجيل الدخول',
    'auth.signUp': 'إنشاء حساب',
    'auth.signingIn': 'جاري تسجيل الدخول...',
    'auth.createAccount': 'أنشئ حسابك للبدء.',
    'auth.creatingAccount': 'جاري إنشاء الحساب...',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.confirmPassword': 'تأكيد كلمة المرور',
    'auth.name': 'الاسم الكامل',
    'auth.company': 'اسم الشركة',
    'auth.rememberMe': 'تذكرني',
    'auth.forgotPassword': 'نسيت كلمة المرور؟',
    'auth.alreadyHaveAccount': 'لديك حساب بالفعل؟',
    'auth.dontHaveAccount': 'ليس لديك حساب؟',
    'auth.demoAccess': 'وضع العرض',
    'auth.demoAccessHint': 'استخدم زر العرض للوصول إلى لوحة التحكم وإدارة العملاء.',
    'auth.demoAdminButton': 'الدخول كمسؤول تجريبي',
    'auth.terms': 'أوافق على شروط الخدمة وسياسة الخصوصية',
    
    // Navigation
    'nav.about': 'من نحن',
    'nav.services': 'خدماتنا',
    'nav.blog': 'المدونة',
    'nav.contact': 'اتصل بنا',
    'nav.allServices': 'جميع الخدمات',
    
    // Services
    'service.factoryAudit': 'تدقيق المصنع',
    'service.factoryAuditDescription': 'تدقيق في الموقع يغطي أنظمة الجودة والامتثال',
    'service.preShipment': 'فحص ما قبل الشحن',
    'service.preShipmentDescription': 'فحص نهائي قبل الإرسال للتحقق من الكمية والجودة',
    'service.duringProduction': 'فحص أثناء الإنتاج',
    'service.duringProductionDescription': 'فحص في منتصف الإنتاج للكشف عن المشاكل مبكراً',
    'service.containerLoading': 'إشراف تحميل الحاوية',
    'service.containerLoadingDescription': 'الإشراف على التحميل لضمان الكميات الصحيحة والتعبئة الآمنة',
    
    // Dashboard
    'dashboard.welcome': 'مرحباً',
    'dashboard.startBooking': 'ابدأ بحجز إحدى خدماتنا الآن',
    'dashboard.bookings': 'حجوزاتك',
    'dashboard.invoices': 'فواتيرك',
    'dashboard.overview': 'نظرة عامة',
    'dashboard.bookingsPage': 'الحجوزات',
    'dashboard.reports': 'التقارير',
    'dashboard.invoicesPage': 'الفواتير',
    'dashboard.crm': 'إدارة العملاء',
    'dashboard.search': 'ابحث عن الحجوزات والفواتير...',
    'dashboard.newBooking': '+ حجز جديد',
    'dashboard.bookingGuidance': 'إرشادات الحجز',
    
    // Booking
    'booking.howToBook': 'كيفية حجز خدمة',
    'booking.step1': 'اختر الخدمة التي تحتاجها من بطاقات الخدمات',
    'booking.step2': 'املأ نموذج الحجز بمتطلباتك',
    'booking.step3': 'راجع وأكد تفاصيل حجزك',
    'booking.step4': 'أرسل طلب الحجز',
    'booking.step5': 'انتظر حتى يتغير حالة التقارير إلى مكتمل',
    'booking.step6': 'ادفع رسوم الخدمة',
    'booking.step7': 'ستظهر زر التحميل',
    'booking.step8': 'حمّل تقريرك',
    'booking.availableServices': 'الخدمات المتاحة',
    'booking.bookNow': 'احجز الآن',
    'booking.bookService': 'حجز خدمة {service}',
    'booking.companyName': 'اسم الشركة',
    'booking.contactName': 'اسم جهة الاتصال',
    'booking.phone': 'الهاتف',
    'booking.whatsappNumber': 'رقم واتساب',
    'booking.targetDate': 'التاريخ المستهدف',
    'booking.additionalNotes': 'ملاحظات إضافية',
    'booking.submit': 'إرسال الحجز',
    'booking.submitting': 'جاري الإرسال...',
    'booking.cancel': 'إلغاء',
    'booking.submitted': 'تم إرسال الحجز!',
    'booking.success': 'تم إرسال طلب حجز {service} بنجاح.',
    'booking.thankYouTitle': 'شكراً لك!',
    'booking.thankYouMessage': 'شكراً لاختيارك ProQCChina. تم إنشاء حجز {service} بنجاح.',
    'booking.neverShowAgain': 'عدم الإظهار مرة أخرى',
    
    // Tables
    'table.id': 'المعرف',
    'table.date': 'التاريخ',
    'table.service': 'الخدمة',
    'table.status': 'الحالة',
    'table.action': 'الإجراء',
    'table.supplier': 'المورد',
    'table.amount': 'المبلغ',
    'table.dueDate': 'تاريخ الاستحقاق',
    'table.description': 'الوصف',
    'table.viewDetails': 'عرض التفاصيل',
    'table.viewAll': 'عرض الكل',
    'table.latest': 'الأحدث',
    'table.noResults': 'لم يتم العثور على نتائج',
    
    // Status
    'status.paid': 'مدفوع',
    'status.due': 'مستحق',
    'status.pending': 'قيد الانتظار',
    'status.cancelled': 'ملغي',
    'status.completed': 'مكتمل',
    'status.ready': 'جاهز',
    
    // Invoices
    'invoice.totalUnpaid': 'إجمالي غير المدفوع',
    'invoice.downloadAll': 'تحميل الكل',
    'invoice.pay': 'دفع',
    'invoice.noPaymentMethods': 'لا توجد طرق دفع مفعّلة حالياً.',
    
    // Reports
    'report.clientDashboard': 'لوحة تحكم تفتيش العميل',
    'report.manage': 'إدارة وتتبع حالة مشاريع مراقبة الجودة والتفتيش الخاصة بك.',
    'report.reportService': 'التقرير / الخدمة',
    'report.factoryLocation': 'المصنع والموقع',
    'report.completed': 'مكتمل',
    'report.paymentStatus': 'حالة الدفع',
    'report.download': 'تحميل',
    'report.locked': 'مقفل',
    
    // Support
    'support.needHelp': 'تحتاج إلى مساعدة إضافية؟',
    'support.available': 'فريق الدعم لدينا متاح لمساعدتك.',
    'support.contact': 'اتصل بالدعم',
    'support.email': 'دعم البريد الإلكتروني',
    'support.whatsappChat': 'دردشة واتساب المباشرة',
    'support.scanToChat': 'امسح للانتقال إلى واتساب',
    'support.whatsappQrAlt': 'رمز QR لواتساب',

    // CRM
    'crm.title': 'لوحة إدارة العملاء',
    'crm.subtitle': 'إدارة الحجوزات والعملاء وصلاحيات الإدارة.',
    'crm.bookings': 'الحجوزات والعملاء',
    'crm.users': 'المستخدمون والأدوار',
    'crm.addBooking': 'إضافة حجز',
    'crm.addUser': 'إضافة مستخدم',
    'crm.clientName': 'اسم العميل',
    'crm.fullName': 'الاسم الكامل',
    'crm.service': 'الخدمة',
    'crm.email': 'البريد الإلكتروني',
    'crm.company': 'الشركة',
    'crm.phone': 'الهاتف',
    'crm.noBookings': 'لا توجد حجوزات بعد.',
    'crm.noUsers': 'لا يوجد مستخدمون بعد.',
    'crm.roleClient': 'عميل',
    'crm.roleCoAdmin': 'مشرف مساعد',
    'crm.roleAdmin': 'مشرف',
    'crm.deleteUser': 'حذف المستخدم',
    'crm.settings': 'إعدادات الإدارة',
    'crm.supportEmail': 'بريد الدعم',
    'crm.supportWhatsApp': 'رقم دعم واتساب',
    'crm.paymentMethods': 'طرق الدفع',
    'crm.accessDenied': 'صلاحيات غير كافية',
    'crm.accessDeniedHint': 'يرجى تسجيل الدخول كمشرف لعرض إدارة العملاء.',
    'crm.downloadReport': 'تحميل التقرير',
    'crm.downloadLocked': 'يجب الدفع قبل التحميل.',
    
    // Settings
    'settings.profile': 'إعدادات الملف الشخصي',
    'settings.save': 'حفظ التغييرات',
    'settings.saving': 'جاري الحفظ...',
    'settings.currentPassword': 'كلمة المرور الحالية',
    'settings.newPassword': 'كلمة المرور الجديدة',
    'settings.confirmPassword': 'تأكيد كلمة المرور الجديدة',
    'settings.passwordMismatch': 'كلمات المرور الجديدة غير متطابقة',
    'settings.currentPasswordRequired': 'كلمة المرور الحالية مطلوبة لتغيير كلمة المرور',
    'settings.profilePhoto': 'صورة الملف الشخصي',
    'settings.photoHint': 'JPG أو PNG حتى 5MB',
    'settings.name': 'الاسم الكامل',
    'settings.loginEmail': 'البريد الإلكتروني لتسجيل الدخول',
    'settings.additionalEmail': 'بريد إلكتروني إضافي',
    'settings.whatsappNumber': 'رقم واتساب',
    'settings.whatsappNumberHint': 'يرجى تضمين رمز الدولة',
    'settings.company': 'اسم الشركة',
    'settings.changePassword': 'تغيير كلمة المرور',
    'settings.darkMode': 'الوضع الداكن',
    'settings.darkModeHint': 'تطبيق الوضع الداكن على التطبيق',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.close': 'إغلاق',
    'common.all': 'الكل',
    'common.filter': 'تصفية حسب الحالة:',
    'common.action': 'الإجراء',
    'common.viewAll': 'عرض الكل',
    'common.viewBooking': 'عرض الحجز',
    'common.latest': 'الأحدث',
    'common.latestBookings': 'أحدث الحجوزات',
    'common.latestInvoices': 'أحدث الفواتير',
    'common.paymentMethod': 'طريقة الدفع',
    'common.paymentSuccess': 'تم معالجة الدفع بنجاح!',
    'common.paymentNote': 'بعد تأكيد الدفع، سيكون التقرير متاحاً للتحميل بمجرد تسليمه.',
  },
  fr: {
    // Auth
    'auth.welcome': 'Bon retour ! Veuillez vous connecter à votre compte.',
    'auth.signIn': 'Se connecter',
    'auth.signUp': "S'inscrire",
    'auth.signingIn': 'Connexion en cours...',
    'auth.createAccount': 'Créez votre compte pour commencer.',
    'auth.creatingAccount': 'Création du compte...',
    'auth.email': 'Adresse e-mail',
    'auth.password': 'Mot de passe',
    'auth.confirmPassword': 'Confirmer le mot de passe',
    'auth.name': 'Nom complet',
    'auth.company': 'Nom de l\'entreprise',
    'auth.rememberMe': 'Se souvenir de moi',
    'auth.forgotPassword': 'Mot de passe oublié ?',
    'auth.alreadyHaveAccount': 'Vous avez déjà un compte ?',
    'auth.dontHaveAccount': "Vous n'avez pas de compte ?",
    'auth.demoAccess': 'Mode démo',
    'auth.demoAccessHint': 'Utilisez le bouton démo pour accéder au tableau de bord et au CRM.',
    'auth.demoAdminButton': 'Entrer en démo admin',
    'auth.terms': 'J\'accepte les conditions d\'utilisation et la politique de confidentialité',
    
    // Navigation
    'nav.about': 'À propos',
    'nav.services': 'Nos services',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.allServices': 'Tous les services',
    
    // Services
    'service.factoryAudit': 'Audit d\'usine',
    'service.factoryAuditDescription': 'Audit sur site couvrant les systèmes de qualité et la conformité',
    'service.preShipment': 'Inspection avant expédition',
    'service.preShipmentDescription': 'Inspection finale avant l\'expédition pour vérifier la quantité et la qualité',
    'service.duringProduction': 'Inspection pendant la production',
    'service.duringProductionDescription': 'Contrôle en milieu de production pour détecter les problèmes tôt',
    'service.containerLoading': 'Supervision du chargement de conteneur',
    'service.containerLoadingDescription': 'Superviser le chargement pour garantir les quantités correctes et le remplissage sécurisé',
    
    // Dashboard
    'dashboard.welcome': 'Bienvenue',
    'dashboard.startBooking': 'Commencez par réserver l\'un de nos services maintenant',
    'dashboard.bookings': 'Vos réservations',
    'dashboard.invoices': 'Vos factures',
    'dashboard.overview': 'Vue d\'ensemble',
    'dashboard.bookingsPage': 'Réservations',
    'dashboard.reports': 'Rapports',
    'dashboard.invoicesPage': 'Factures',
    'dashboard.crm': 'CRM',
    'dashboard.search': 'Rechercher des réservations, factures...',
    'dashboard.newBooking': '+ Nouvelle réservation',
    'dashboard.bookingGuidance': 'Guide de réservation',
    
    // Booking
    'booking.howToBook': 'Comment réserver un service',
    'booking.step1': 'Sélectionnez le service dont vous avez besoin parmi les cartes de services',
    'booking.step2': 'Remplissez le formulaire de réservation avec vos exigences',
    'booking.step3': 'Examinez et confirmez les détails de votre réservation',
    'booking.step4': 'Soumettez votre demande de réservation',
    'booking.step5': 'Attendez que le statut des rapports passe à terminé',
    'booking.step6': 'Payez les frais de service',
    'booking.step7': 'Un bouton de téléchargement apparaîtra',
    'booking.step8': 'Téléchargez votre rapport',
    'booking.availableServices': 'Services disponibles',
    'booking.bookNow': 'Réserver maintenant',
    'booking.bookService': 'Réserver le service {service}',
    'booking.companyName': 'Nom de l\'entreprise',
    'booking.contactName': 'Nom du contact',
    'booking.phone': 'Téléphone',
    'booking.whatsappNumber': 'Numéro WhatsApp',
    'booking.targetDate': 'Date cible',
    'booking.additionalNotes': 'Notes supplémentaires',
    'booking.submit': 'Soumettre la réservation',
    'booking.submitting': 'Soumission...',
    'booking.cancel': 'Annuler',
    'booking.submitted': 'Réservation soumise !',
    'booking.success': 'Votre demande de réservation {service} a été soumise avec succès.',
    'booking.thankYouTitle': 'Merci !',
    'booking.thankYouMessage': 'Merci d\'avoir choisi ProQCChina. Votre réservation {service} a été effectuée avec succès.',
    'booking.neverShowAgain': 'Ne plus afficher',
    
    // Tables
    'table.id': 'ID',
    'table.date': 'Date',
    'table.service': 'Service',
    'table.status': 'Statut',
    'table.action': 'Action',
    'table.supplier': 'Fournisseur',
    'table.amount': 'Montant',
    'table.dueDate': 'Date d\'échéance',
    'table.description': 'Description',
    'table.viewDetails': 'Voir les détails',
    'table.viewAll': 'Voir tout',
    'table.latest': 'Dernier',
    'table.noResults': 'Aucun résultat trouvé',
    
    // Status
    'status.paid': 'Payé',
    'status.due': 'Dû',
    'status.pending': 'En attente',
    'status.cancelled': 'Annulé',
    'status.completed': 'Terminé',
    'status.ready': 'Prêt',
    
    // Invoices
    'invoice.totalUnpaid': 'Total impayé',
    'invoice.downloadAll': 'Tout télécharger',
    'invoice.pay': 'Payer',
    'invoice.noPaymentMethods': 'Aucune méthode de paiement n\'est activée.',
    
    // Reports
    'report.clientDashboard': 'Tableau de bord d\'inspection client',
    'report.manage': 'Gérez et suivez l\'état de vos projets de contrôle qualité et d\'inspection.',
    'report.reportService': 'RAPPORT / SERVICE',
    'report.factoryLocation': 'USINE ET EMPLACEMENT',
    'report.completed': 'TERMINÉ',
    'report.paymentStatus': 'STATUT DE PAIEMENT',
    'report.download': 'Télécharger',
    'report.locked': 'Verrouillé',
    
    // Support
    'support.needHelp': 'Besoin d\'aide supplémentaire ?',
    'support.available': 'Notre équipe de support est disponible pour vous aider.',
    'support.contact': 'Contacter le support',
    'support.email': 'Support par e-mail',
    'support.whatsappChat': 'Chat WhatsApp en direct',
    'support.scanToChat': 'Scannez pour discuter sur WhatsApp',
    'support.whatsappQrAlt': 'Code QR WhatsApp',

    // CRM
    'crm.title': 'Panneau CRM',
    'crm.subtitle': 'Gérez les réservations, les leads et l\'accès admin.',
    'crm.bookings': 'Réservations & leads',
    'crm.users': 'Utilisateurs & rôles',
    'crm.addBooking': 'Ajouter une réservation',
    'crm.addUser': 'Ajouter un utilisateur',
    'crm.clientName': 'Nom du client',
    'crm.fullName': 'Nom complet',
    'crm.service': 'Service',
    'crm.email': 'E-mail',
    'crm.company': 'Entreprise',
    'crm.phone': 'Téléphone',
    'crm.noBookings': 'Aucune réservation pour le moment.',
    'crm.noUsers': 'Aucun utilisateur pour le moment.',
    'crm.roleClient': 'Client',
    'crm.roleCoAdmin': 'Co-admin',
    'crm.roleAdmin': 'Admin',
    'crm.deleteUser': 'Supprimer l\'utilisateur',
    'crm.settings': 'Paramètres admin',
    'crm.supportEmail': 'E-mail support',
    'crm.supportWhatsApp': 'Numéro WhatsApp support',
    'crm.paymentMethods': 'Méthodes de paiement',
    'crm.accessDenied': 'Accès restreint',
    'crm.accessDeniedHint': 'Connectez-vous en tant qu\'admin ou co-admin pour voir le CRM.',
    'crm.downloadReport': 'Télécharger le rapport',
    'crm.downloadLocked': 'Paiement requis avant le téléchargement.',
    
    // Settings
    'settings.profile': 'Paramètres du profil',
    'settings.save': 'Enregistrer les modifications',
    'settings.saving': 'Enregistrement...',
    'settings.currentPassword': 'Mot de passe actuel',
    'settings.newPassword': 'Nouveau mot de passe',
    'settings.confirmPassword': 'Confirmer le nouveau mot de passe',
    'settings.passwordMismatch': 'Les nouveaux mots de passe ne correspondent pas',
    'settings.currentPasswordRequired': 'Le mot de passe actuel est requis pour le changer',
    'settings.profilePhoto': 'Photo de profil',
    'settings.photoHint': 'JPG, PNG jusqu\'à 5 Mo',
    'settings.name': 'Nom complet',
    'settings.loginEmail': 'E-mail de connexion',
    'settings.additionalEmail': 'E-mail supplémentaire',
    'settings.whatsappNumber': 'Numéro WhatsApp',
    'settings.whatsappNumberHint': 'Inclure l\'indicatif du pays',
    'settings.company': 'Nom de l\'entreprise',
    'settings.changePassword': 'Changer le mot de passe',
    'settings.darkMode': 'Mode sombre',
    'settings.darkModeHint': 'Appliquer le mode sombre dans l\'application',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Une erreur s\'est produite',
    'common.close': 'Fermer',
    'common.all': 'Tous',
    'common.filter': 'Filtrer par statut :',
    'common.action': 'Action',
    'common.viewAll': 'Voir tout',
    'common.viewBooking': 'Voir la réservation',
    'common.latest': 'Dernier',
    'common.latestBookings': 'Dernières réservations',
    'common.latestInvoices': 'Dernières factures',
    'common.paymentMethod': 'Méthode de paiement',
    'common.paymentSuccess': 'Paiement traité avec succès !',
    'common.paymentNote': 'Après confirmation du paiement, le rapport sera disponible au téléchargement une fois livré.',
  },
  ru: {
    // Auth
    'auth.welcome': 'С возвращением! Пожалуйста, войдите в свой аккаунт.',
    'auth.signIn': 'Войти',
    'auth.signUp': 'Зарегистрироваться',
    'auth.signingIn': 'Вход...',
    'auth.createAccount': 'Создайте аккаунт, чтобы начать.',
    'auth.creatingAccount': 'Создание аккаунта...',
    'auth.email': 'Адрес электронной почты',
    'auth.password': 'Пароль',
    'auth.confirmPassword': 'Подтвердите пароль',
    'auth.name': 'Полное имя',
    'auth.company': 'Название компании',
    'auth.rememberMe': 'Запомнить меня',
    'auth.forgotPassword': 'Забыли пароль?',
    'auth.alreadyHaveAccount': 'Уже есть аккаунт?',
    'auth.dontHaveAccount': 'Нет аккаунта?',
    'auth.demoAccess': 'Демо доступ',
    'auth.demoAccessHint': 'Используйте демо-кнопку для входа в дашборд и CRM.',
    'auth.demoAdminButton': 'Войти как демо-админ',
    'auth.terms': 'Я согласен с условиями использования и политикой конфиденциальности',
    
    // Navigation
    'nav.about': 'О нас',
    'nav.services': 'Наши услуги',
    'nav.blog': 'Блог',
    'nav.contact': 'Контакты',
    'nav.allServices': 'Все услуги',
    
    // Services
    'service.factoryAudit': 'Аудит завода',
    'service.factoryAuditDescription': 'Аудит на месте, охватывающий системы качества и соответствие требованиям',
    'service.preShipment': 'Предотгрузочная инспекция',
    'service.preShipmentDescription': 'Финальная инспекция перед отправкой для проверки количества и качества',
    'service.duringProduction': 'Инспекция во время производства',
    'service.duringProductionDescription': 'Проверка в середине производства для раннего выявления проблем',
    'service.containerLoading': 'Надзор за загрузкой контейнера',
    'service.containerLoadingDescription': 'Надзор за загрузкой для обеспечения правильных количеств и безопасной упаковки',
    
    // Dashboard
    'dashboard.welcome': 'Добро пожаловать',
    'dashboard.startBooking': 'Начните с бронирования одной из наших услуг прямо сейчас',
    'dashboard.bookings': 'Ваши бронирования',
    'dashboard.invoices': 'Ваши счета',
    'dashboard.overview': 'Обзор',
    'dashboard.bookingsPage': 'Бронирования',
    'dashboard.reports': 'Отчеты',
    'dashboard.invoicesPage': 'Счета',
    'dashboard.crm': 'CRM',
    'dashboard.search': 'Поиск бронирований, счетов...',
    'dashboard.newBooking': '+ Новое бронирование',
    'dashboard.bookingGuidance': 'Руководство по бронированию',
    
    // Booking
    'booking.howToBook': 'Как забронировать услугу',
    'booking.step1': 'Выберите нужную услугу из карточек услуг',
    'booking.step2': 'Заполните форму бронирования своими требованиями',
    'booking.step3': 'Проверьте и подтвердите детали бронирования',
    'booking.step4': 'Отправьте запрос на бронирование',
    'booking.step5': 'Дождитесь, пока статус отчетов изменится на завершено',
    'booking.step6': 'Оплатите стоимость услуги',
    'booking.step7': 'Появится кнопка загрузки',
    'booking.step8': 'Загрузите свой отчет',
    'booking.availableServices': 'Доступные услуги',
    'booking.bookNow': 'Забронировать сейчас',
    'booking.bookService': 'Забронировать услугу {service}',
    'booking.companyName': 'Название компании',
    'booking.contactName': 'Имя контакта',
    'booking.phone': 'Телефон',
    'booking.whatsappNumber': 'Номер WhatsApp',
    'booking.targetDate': 'Целевая дата',
    'booking.additionalNotes': 'Дополнительные примечания',
    'booking.submit': 'Отправить бронирование',
    'booking.submitting': 'Отправка...',
    'booking.cancel': 'Отмена',
    'booking.submitted': 'Бронирование отправлено!',
    'booking.success': 'Ваш запрос на бронирование {service} успешно отправлен.',
    'booking.thankYouTitle': 'Спасибо!',
    'booking.thankYouMessage': 'Спасибо, что выбрали ProQCChina. Ваше бронирование {service} успешно оформлено.',
    'booking.neverShowAgain': 'Больше не показывать',
    
    // Tables
    'table.id': 'ID',
    'table.date': 'Дата',
    'table.service': 'Услуга',
    'table.status': 'Статус',
    'table.action': 'Действие',
    'table.supplier': 'Поставщик',
    'table.amount': 'Сумма',
    'table.dueDate': 'Срок оплаты',
    'table.description': 'Описание',
    'table.viewDetails': 'Просмотр деталей',
    'table.viewAll': 'Просмотреть все',
    'table.latest': 'Последние',
    'table.noResults': 'Результаты не найдены',
    
    // Status
    'status.paid': 'Оплачено',
    'status.due': 'К оплате',
    'status.pending': 'В ожидании',
    'status.cancelled': 'Отменено',
    'status.completed': 'Завершено',
    'status.ready': 'Готово',
    
    // Invoices
    'invoice.totalUnpaid': 'Всего неоплачено',
    'invoice.downloadAll': 'Скачать все',
    'invoice.pay': 'Оплатить',
    'invoice.noPaymentMethods': 'Нет доступных способов оплаты.',
    
    // Reports
    'report.clientDashboard': 'Панель инспекции клиента',
    'report.manage': 'Управляйте и отслеживайте статус ваших проектов контроля качества и инспекции.',
    'report.reportService': 'ОТЧЕТ / УСЛУГА',
    'report.factoryLocation': 'ЗАВОД И МЕСТОПОЛОЖЕНИЕ',
    'report.completed': 'ЗАВЕРШЕНО',
    'report.paymentStatus': 'СТАТУС ОПЛАТЫ',
    'report.download': 'Скачать',
    'report.locked': 'Заблокировано',
    
    // Support
    'support.needHelp': 'Нужна дополнительная помощь?',
    'support.available': 'Наша команда поддержки готова помочь вам.',
    'support.contact': 'Связаться с поддержкой',
    'support.email': 'Поддержка по email',
    'support.whatsappChat': 'Живой чат WhatsApp',
    'support.scanToChat': 'Сканируйте для чата в WhatsApp',
    'support.whatsappQrAlt': 'QR-код WhatsApp',

    // CRM
    'crm.title': 'CRM панель',
    'crm.subtitle': 'Управляйте бронированиями, лидами и доступом админов.',
    'crm.bookings': 'Бронирования и лиды',
    'crm.users': 'Пользователи и роли',
    'crm.addBooking': 'Добавить бронирование',
    'crm.addUser': 'Добавить пользователя',
    'crm.clientName': 'Имя клиента',
    'crm.fullName': 'Полное имя',
    'crm.service': 'Услуга',
    'crm.email': 'Email',
    'crm.company': 'Компания',
    'crm.phone': 'Телефон',
    'crm.noBookings': 'Пока нет бронирований.',
    'crm.noUsers': 'Пока нет пользователей.',
    'crm.roleClient': 'Клиент',
    'crm.roleCoAdmin': 'Со-админ',
    'crm.roleAdmin': 'Админ',
    'crm.deleteUser': 'Удалить пользователя',
    'crm.settings': 'Настройки администратора',
    'crm.supportEmail': 'Email поддержки',
    'crm.supportWhatsApp': 'Номер WhatsApp поддержки',
    'crm.paymentMethods': 'Способы оплаты',
    'crm.accessDenied': 'Доступ ограничен',
    'crm.accessDeniedHint': 'Войдите как админ или со-админ, чтобы видеть CRM.',
    'crm.downloadReport': 'Скачать отчет',
    'crm.downloadLocked': 'Перед скачиванием требуется оплата.',
    
    // Settings
    'settings.profile': 'Настройки профиля',
    'settings.save': 'Сохранить изменения',
    'settings.saving': 'Сохранение...',
    'settings.currentPassword': 'Текущий пароль',
    'settings.newPassword': 'Новый пароль',
    'settings.confirmPassword': 'Подтвердите новый пароль',
    'settings.passwordMismatch': 'Новые пароли не совпадают',
    'settings.currentPasswordRequired': 'Для смены пароля нужен текущий пароль',
    'settings.profilePhoto': 'Фото профиля',
    'settings.photoHint': 'JPG, PNG до 5 МБ',
    'settings.name': 'Полное имя',
    'settings.loginEmail': 'Email для входа',
    'settings.additionalEmail': 'Дополнительный email',
    'settings.whatsappNumber': 'Номер WhatsApp',
    'settings.whatsappNumberHint': 'Укажите код страны',
    'settings.company': 'Название компании',
    'settings.changePassword': 'Сменить пароль',
    'settings.darkMode': 'Темная тема',
    'settings.darkModeHint': 'Применить темную тему по всему приложению',
    
    // Common
    'common.loading': 'Загрузка...',
    'common.error': 'Произошла ошибка',
    'common.close': 'Закрыть',
    'common.all': 'Все',
    'common.filter': 'Фильтр по статусу:',
    'common.action': 'Действие',
    'common.viewAll': 'Просмотреть все',
    'common.viewBooking': 'Просмотр бронирования',
    'common.latest': 'Последние',
    'common.latestBookings': 'Последние бронирования',
    'common.latestInvoices': 'Последние счета',
    'common.paymentMethod': 'Способ оплаты',
    'common.paymentSuccess': 'Платеж успешно обработан!',
    'common.paymentNote': 'После подтверждения платежа отчет будет доступен для загрузки после доставки.',
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize with a function to detect language on mount
  const [language, setLanguageState] = useState<Language>(() => {
    // Only run on client side
    if (typeof window === 'undefined') return 'en'
    
    // Check URL params first (for WordPress integration)
    const urlParams = new URLSearchParams(window.location.search)
    const langParam = urlParams.get('lang') || urlParams.get('language')
    
    // Check localStorage
    const savedLang = localStorage.getItem('proqcchina_language') as Language | null
    
    // Check WordPress cookie (if embedded)
    const wpLang = document.cookie.split('; ').find(row => row.startsWith('wp_lang='))?.split('=')[1] || null
    
    // Determine language priority: URL param > localStorage > WordPress cookie > browser > default
    let detectedLang: Language = 'en'
    
    if (langParam && ['en', 'ar', 'fr', 'ru'].includes(langParam)) {
      detectedLang = langParam as Language
    } else if (savedLang && ['en', 'ar', 'fr', 'ru'].includes(savedLang)) {
      detectedLang = savedLang
    } else if (wpLang) {
      // Map WordPress language codes to our codes
      const wpLangMap: Record<string, Language> = {
        'ar': 'ar',
        'fr_FR': 'fr',
        'ru_RU': 'ru',
        'en_US': 'en',
        'en': 'en',
      }
      detectedLang = wpLangMap[wpLang] || 'en'
    } else if (typeof navigator !== 'undefined') {
      // Browser language detection
      const browserLang = navigator.language.split('-')[0]
      if (['ar', 'fr', 'ru'].includes(browserLang)) {
        detectedLang = browserLang as Language
      }
    }
    
    return detectedLang
  })

  // Update HTML attributes when language changes
  useEffect(() => {
    if (typeof document !== 'undefined' && typeof window !== 'undefined') {
      document.documentElement.lang = language
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
      localStorage.setItem('proqcchina_language', language)
    }
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    
    // Update localStorage and DOM only on client
    if (typeof window !== 'undefined') {
      localStorage.setItem('proqcchina_language', lang)
      document.documentElement.lang = lang
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
      
      // Update URL
      const url = new URL(window.location.href)
      url.searchParams.set('lang', lang)
      window.history.replaceState({}, '', url.toString())
    }
  }

  const t = (key: string, params?: Record<string, string>): string => {
    let translation = translations[language][key] || translations['en'][key] || key
    
    // Replace parameters like {service}
    if (params) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(`{${param}}`, params[param])
      })
    }
    
    return translation
  }

  const dir = language === 'ar' ? 'rtl' : 'ltr'

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

