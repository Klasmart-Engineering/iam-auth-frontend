// ko.ts
const messages: Record<string, string> = {
    button_continue: "계속하기",

    component_switchDark: "어두운",
    component_switchLight: "밝은",

    continue_signInSuccess: "로그인 성공",
    continue_continuePrompt: "<em>{continueLink}</em>으로 이동합니다!",
    continue_countdownToContinue: "{seconds}초 안에 이동하지 않으면 '계속하기'를 눌러주세요. ",

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
    login_createAccount: "회원 가입하기",
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

    selectProfile_title: "프로필 선택하기",
    selectProfile_tooltipBirthday: "생일 추가하기",
    selectProfile_tooltipName: "프로필을 업데이트 하세요",

    birthday_titleUpdate: "프로필을 업데이트 하세요",
    birthday_titleCreate: "학생의 생일은 언제인가요?",
    birthday_prompt: "계정에 생일 추가하기",
    birthday_promptUpdate: "{account}에 생일 추가하기",
    birthday_promptCreate: "당신과 당신의 학생의 나이를 고려하여 KidsLoop을 맞춤설정 해드립니다. 당신과 당신의 학생만이 이 정보를 볼 수 있습니다.",
    birthday_datePickerHelper: "월과 연도 (선택적)",
    birthday_buttonSkip: "지나가기",
    birthday_buttonSave: "저장하기",
    birthday_buttonNext: "다음",
    birthday_buttonBack: "뒤로",

    name_titleUpdate: "프로필을 업데이트 하세요",
    name_titleCreate: "당신의 학생의 이름은 무엇인가요?",
    name_prompt: "계정에 {name} 추가하기",
    name_promptUpdate: "{name}에 {account}추가하기",
    name_promptCreate: "당신의 학생의 {name} 추가하기",
    name_promptEnd: "언제나 이 정보를 수정할 수 있습니다.",
    name_name: "이름",
    name_username: "사용자이름",
    name_fieldGivenName: "이름",
    name_fieldFamilyName: "성",
    name_fieldUsername: "사용자이름",
    name_switchName: "이름 바꾸기",
    name_switchUsername: "사용자 이름으로 바꾸기",
    name_buttonSave: "저장하기",
    name_buttonNext: "다음",
    name_buttonBack: "뒤로",

};

export default messages;