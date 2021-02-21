// vi.ts
const messages: Record<string, string> = {
    button_continue: "Tiếp tục",

    component_switchDark: "tối",
    component_switchLight: "sáng",

    continue_signInSuccess: "Đăng nhập thành công",
    continue_continuePrompt: "Tự động chuyển bạn đến <em>{continueLink}</em>!",
    continue_countdownToContinue: "Nếu không có gì xảy ra sau {second} giây, thì hãy nhấn \"Tiếp tục\"",

    error_emptyEmail: "Nhập email hoặc số điện thoại",
    error_emptyPassword: "Nhập mật khẩu",
    error_emptyVerificationCode: "Vui lòng nhập mã xác thực từ thiết bị {device} của bạn.",
    error_invalidRedirectLink: "Dường như <em>{continueLink}</em> không thuộc Kidsloop! Để an toàn, chúng tôi sẽ chuyển bạn đến <em>{defaultLink}</em>.",

    form_emailLabel: "Email hoặc điện thoại",
    form_passwordLabel: "Mật khẩu",
    form_verificationLabel: "Mã xác thực",

    locale_select: "Chọn ngôn ngữ",
    locale_tooltip: "Thay đổi ngôn ngữ",

    login_acceptPrivacyPolicy: "Tôi chấp nhận Chính sách bảo mật của Kidsloop",
    login_createAccount: "Tạo tài khoản",
    login_forgotPassword: "Quên mật khẩu",
    login_loginButton: "Đăng nhập",
    login_loginPrompt: "Đăng nhập",

    notFound_notFoundPrompt: "Oops! Liên kết bị hỏng",
    notFound_notFoundDescription: "Quay về trang chủ",
    notFound_homeButton: "Trang chủ",

    signup_signIn: "Đăng nhập lại thay vì đăng kí",
    signup_signUpNextButton: "Tiếp theo",
    signup_signUpPrompt: "Đăng ký",

    verify_backButton: "Quay lại",
    verify_verifyButton: "Gửi đi",
    verify_verifyPrompt: "Xác nhận tài khoản",

    privacy_helpLink: "Giúp đỡ",
    privacy_privacyLink: "Bảo mật",
    privacy_termsLink: "Điều khoản",
    
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