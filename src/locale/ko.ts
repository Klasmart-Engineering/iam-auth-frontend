// ko.ts
const messages: Record<string, string> = {
    button_continue: "계속하기",

    component_switchDark: "어두운",
    component_switchLight: "밝은",

    continue_signInSuccess: "로그인 성공",
    continue_continuePrompt: "<em>{continueLink}</em>으로 이동합니다!",
    continue_countdownToContinue: "{seconds}초 안에 아무일도 일어나지 않는다면, '계속하기'를 눌러주세요",

    error_emptyEmail: "이메일 또는 핸드폰 번호를 입력하세요",
    error_emptyPassword: "비밀번호를 입력하세요",
    error_emptyVerificationCode: "{device}으로 전송된 인증 코드를 입력하세요",
    error_invalidRedirectLink: "<em>{continueLink}</em>이 키즈룹의 일원이 아닌 것 같습니다. 안전을 위해 <em>{defaultLink}</em>으로 이동합니다 ",

    form_emailLabel: "이메일 또는 핸드폰 번호",
    form_passwordLabel: "비밀번호",
    form_verificationLabel: "인증코드",

    locale_select: "언어 선택",
    locale_tooltip: "언어 변경",

    login_acceptPrivacyPolicy: "키즈룹 개인 정보 보호 정책에 동의합니다",
    login_createAccount: "계정 생성하기",
    login_forgotPassword: "비밀번호 찾기",
    login_loginButton: "로그인",
    login_loginPrompt: "로그인",

    notFound_notFoundPrompt: "이런! 잘못된 링크입니다!",
    notFound_notFoundDescription: "집으로 데려다 줄게요",
    notFound_homeButton: "홈",

    signup_signIn: "기존 계정 로그인",
    signup_signUpNextButton: "다음",
    signup_signUpPrompt: "회원가입",

    verify_backButton: "뒤로",
    verify_verifyButton: "제출",
    verify_verifyPrompt: "계정 확인",

    privacy_helpLink: "고객센터",
    privacy_privacyLink: "개인 정보 보호",
    privacy_termsLink: "약관",

};

export default messages;