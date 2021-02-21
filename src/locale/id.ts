// id.ts
const messages: Record<string, string> = {
    button_continue: "Lanjut",

    component_switchDark: "gelap",
    component_switchLight: "terang",

    continue_signInSuccess: "Berhasil Masuk",
    continue_continuePrompt: "Membawa Anda secara otomatis ke <em> {continueLink} </em>!",
    continue_countdownToContinue: "Jika tidak ada yang terjadi dalam {seconds} detik, klik \"Lanjut\".",

    error_emptyEmail: "Masukkan email atau nomor telepon",
    error_emptyPassword: "Masukkan kata sandi",
    error_emptyVerificationCode: "Harap masukkan kode verifikasi dari {device} Anda.",
    error_invalidRedirectLink: "Sepertinya <em> {continueLink} </em> bukan bagian dari KidsLoop! Demi keamanan Anda, kami akan membawa Anda ke <em> {defaultLink} </em>.",

    form_emailLabel: "Email atau Telepon",
    form_passwordLabel: "Kata Sandi",
    form_verificationLabel: "Kode Verifikasi",

    locale_select: "Pilih Bahasa",
    locale_tooltip: "Ganti Bahasa",

    login_acceptPrivacyPolicy: "Saya menyetujui Kebijakan Privasi KidsLoop",
    login_createAccount: "Buat sebuah akun",
    login_forgotPassword: "Tidak Ingat Kata Sandi?",
    login_loginButton: "Masuk",
    login_loginPrompt: "Masuk",

    notFound_notFoundPrompt: "Ups! Tautan rusak.",
    notFound_notFoundDescription: "Langsung ke beranda.",
    notFound_homeButton: "Beranda",

    signup_signIn: "Masuk Saja",
    signup_signUpNextButton: "Lanjut",
    signup_signUpPrompt: "Daftar",

    verify_backButton: "Sebelum",
    verify_verifyButton: "Kirimkan",
    verify_verifyPrompt: "Konfirmasi Akun",

    privacy_helpLink: "Bantuan",
    privacy_privacyLink: "Pribadi",
    privacy_termsLink: "Syarat",
    
    selectProfile_title: "Select a profile",
    selectProfile_tooltipBirthday: "Add your birthday",
    selectProfile_tooltipName: "Please update your profile",
    
    birthday_titleUpdate: "Please update your profile.",
    birthday_titleCreate: "What's your learner's birthday?",
    birthday_prompt: "Add a birthday to your account.",
    birthday_promptUpdate: "Add a birthday to {account}.",
    birthday_promptCreate: "We will customize KidsLoop for you and your learner's age. Only you and your learner can see this information.",
    birthday_datePickerHelper: "Month and Year (optional)",
    birthday_buttonSkip: "Skip",
    birthday_buttonSave: "Save",
    birthday_buttonNext: "Next",
    birthday_buttonBack: "Back",

    name_titleUpdate: "Please update your profile.",
    name_titleCreate: "Your learner's name?",
    name_prompt: "Add a {name} to your account.",
    name_promptUpdate: "Add a {name} to {account}.",
    name_promptCreate: "Add your learner's {name} for your learner.",
    name_promptEnd: "You may edit this information at any time.",
    name_name: "name",
    name_username: "username",
    name_fieldGivenName: "Given Name",
    name_fieldFamilyName: "Family Name",
    name_fieldUsername: "Username",
    name_switchName: "Switch to Name",
    name_switchUsername: "Switch to Username",
    name_buttonSave: "Save",
    name_buttonNext: "Next",
    name_buttonBack: "Back",
};
export default messages;