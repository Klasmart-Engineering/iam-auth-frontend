// id.ts
const messages: Record<string, string> = {
    button_continue: "Lanjut",

    component_switchDark: "gelap",
    component_switchLight: "terang",

    continue_signInSuccess: "Berhasil Masuk",
    continue_continuePrompt: "Membawa Anda secara otomatis ke <em> {continueLink} </em>!",
    continue_countdownToContinue: "Jika tidak ada yang terjadi dalam {seconds} detik, klik \"Continue\".",

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

    selectProfile_title: "Pilih profil",
    selectProfile_tooltipBirthday: "Tambah ulang tahun",
    selectProfile_tooltipName: "Silakan perbarui profil",

    birthday_titleUpdate: "Silakan perbarui profil.",
    birthday_titleCreate: "Kapan ulang tahun pelajar?",
    birthday_prompt: "Tambah ulang tahun ke akun.",
    birthday_promptUpdate: "Tambah ulang tahun ke {account}.",
    birthday_promptCreate: "Kami akan menyesuaikan KidsLoop untuk Anda dan umur pelajar. Hanya Anda dan pelajar yang bisa melihat info ini.",
    birthday_datePickerHelper: "Bulan dan Tahun (opsional)",
    birthday_buttonSkip: "Lewati",
    birthday_buttonSave: "Simpan",
    birthday_buttonNext: "Lanjut",
    birthday_buttonBack: "Kembali",

    name_titleUpdate: "Silakan perbarui profil.",
    name_titleCreate: "Nama pelajar?",
    name_prompt: "Tambah {name} ke akun Anda.",
    name_promptUpdate: "Tambah {name} ke {account}.",
    name_promptCreate: "Tambah {name} sebagai pelajar.",
    name_promptEnd: "Kamu bisa mengubah informasi ini kapan saja.",
    name_name: "nama",
    name_username: "username",
    name_fieldGivenName: "Nama Pemberian",
    name_fieldFamilyName: "Nama Keluarga",
    name_fieldUsername: "Username",
    name_switchName: "Ganti ke Nama",
    name_switchUsername: "Ganti ke Username",
    name_buttonSave: "Simpan",
    name_buttonNext: "Lanjut",
    name_buttonBack: "Kembali",

    region_cantFind: "Can\'t find your country or region? Click here.",
    region_comingSoon: "Coming Soon",
    region_selectCountryRegion: "Select your country or region",
};
export default messages;